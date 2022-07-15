package graphics;

import haxe.Exception;
import graphics.GCore;

using StringTools;
using tools.ArrayItems;
using Math;

enum GPathSegment {
	M(x:Float, y:Float);
	L(x:Float, y:Float);
	Q(x1:Float, y1:Float, x2:Float, y2:Float);
	C(x1:Float, y1:Float, x2:Float, y2:Float, x:Float, y:Float);
	Z;
}

typedef GPathSegments = Array<GPathSegment>;

@:forward(iterator, map, push)
@:using(GPath.GPathTools)
abstract GPath(GPathSegments) to GPathSegments from GPathSegments {
	function new(path:GPathSegments) {
		this = path;
	}

	@:from static public function fromString(pathString:String):GPath {
		final path = GPathTools.getGPathFromString(pathString);
		return new GPath(path);
	}

	public function toSvgPath():String
		return GPathTools.toString(this);

	public function getBoundingbox():GArea
		return GPathTools.getBoundingArea(this);
}

class GPathTools {
	static public function getBoundingArea(path:GPath):GArea {
		var first:Array<Float> = switch path[0] {
			case M(x, y) | L(x, y): [x, y];
			case Q(x1, y1, x, y): [x1.min(x), y1.min(y)];
			case C(x1, y1, x2, y2, x, y): [x1.min(x2.min(x)), y1.min(y2.min(y))];
			case Z: null;
		}
		var minX:Float = first[0];
		var minY:Float = first[1];
		var maxX:Float = first[0];
		var maxY:Float = first[1];
		for (item in path) {
			switch item {
				case M(x, y) | L(x, y):
					minX = minX.min(x);
					minY = minY.min(y);
					maxX = maxX.max(x);
					maxY = maxY.max(y);
				case Q(x1, y1, x, y):
					minX = minX.min(x);
					minY = minY.min(y);
					maxX = maxX.max(x);
					maxY = maxY.max(y);
					minX = minX.min(x1);
					minY = minY.min(y1);
					maxX = maxX.max(x1);
					maxY = maxY.max(y1);
				case C(x1, y1, x2, y2, x, y):
					minX = minX.min(x);
					minY = minY.min(y);
					maxX = maxX.max(x);
					maxY = maxY.max(y);
					minX = minX.min(x1);
					minY = minY.min(y1);
					maxX = maxX.max(x1);
					maxY = maxY.max(y1);
					minX = minX.min(x2);
					minY = minY.min(y2);
					maxX = maxX.max(x2);
					maxY = maxY.max(y2);
				case Z:
			}
		}
		return new GArea(minX, minY, maxX, maxY);
	}

	static public function scale(path:GPath, scale:Float):GPath {
		return path.map(pitem -> {
			switch pitem {
				case M(x, y):
					M(x * scale, y * scale);
				case L(x, y):
					L(x * scale, y * scale);
				case Q(x1, y1, x, y):
					Q(x1 * scale, y1 * scale, x * scale, y * scale);
				case C(x1, y1, x2, y2, x, y):
					C(x1 * scale, y1 * scale, x2 * scale, y2 * scale, x * scale, y * scale);
				case Z: Z;
			}
		});
	}

	static public function move(path:GPath, mx:Float, my:Float):GPath {
		return path.map(pitem -> {
			switch pitem {
				case M(x, y):
					M(x + mx, y + my);
				case L(x, y):
					L(x + mx, y + my);
				case Q(x1, y1, x, y):
					Q(x1 + mx, y1 + my, x + mx, y + my);
				case C(x1, y1, x2, y2, x, y):
					C(x1 + mx, y1 + my, x2 + mx, y2 + my, x + mx, y + my);
				case Z: Z;
			}
		});
	}

	static public function getGPathFromString(pathString:String):GPath {
		final segments:Array<String> = [];
		for (c in pathString.split('')) {
			switch c {
				case 'M' | 'm' | 'L' | 'l' | 'C' | 'c' | 'Q' | 'q' | 'A' | 'a' | 'Z' | 'z':
					segments.push(c);
				default:
					var segmentsLast = segments.last();
					segments[segments.length - 1] = segmentsLast + c;
			}
		}
		final path:GPath = [];
		for (segment in segments) {
			var values = segment.trim().substr(1).replace(' ', ',').split(',').map(i -> Std.parseFloat(i));
			var item:GPathSegment = switch segment.charAt(0) {
				case 'M':
					if (values.length != 2)
						throw new Exception('There should be 2 values for a M segment ($values)');
					M(values[0], values[1]);
				case 'L':
					if (values.length != 2)
						throw new Exception('There should be 2 values for a L segment ($values)');
					L(values[0], values[1]);
				case 'Q':
					if (values.length != 4)
						throw new Exception('There should be 4 values for a Q segment ($values)');
					Q(values[0], values[1], values[2], values[3]);
				case 'C':
					if (values.length != 6)
						throw new Exception('There should be 6 values for a C segment ($values)');
					C(values[0], values[1], values[2], values[3], values[4], values[5]);
				case 'Z' | 'z':
					// trace(values);
					// throw new Exception('There should be 0 values for a Z segment ($values)');
					Z;
				default:
					trace(segment.charAt(0));
					null;
			}
			path.push(item);
		}
		return path;
	}

	static public function toString(path:GPath):String {
		var s = '';
		for (segment in path) {
			switch segment {
				case M(x, y):
					s += 'M$x $y';
				case L(x, y):
					s += 'L$x $y';
				case Q(x1, y1, x, y):
					s += 'Q$x1 $y1 $x $y';
				case C(x1, y1, x2, y2, x, y):
					s += 'C$x1 $y1 $x2 $y2 $x $y';
				case Z:
					s += 'Z';
			}
		}
		return s;
	}
}
