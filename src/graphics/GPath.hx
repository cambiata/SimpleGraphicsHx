package graphics;

import haxe.Exception;

using StringTools;
using tools.ArrayItems;

enum GPathSegment {
	M(x:Float, y:Float);
	L(x:Float, y:Float);
	C(x1:Float, y1:Float, x2:Float, y2:Float, x:Float, y:Float);
	// Q(x1:Float, y1:Float, x2:Float, y2:Float);
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
}

class GPathTools {
	static public function scale(path:GPath, scale:Float):GPath {
		return path.map(pitem -> {
			switch pitem {
				case M(x, y):
					M(x * scale, y * scale);
				case L(x, y):
					L(x * scale, y * scale);
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
				case C(x1, y1, x2, y2, x, y):
					C(x1 + mx, y1 + mx, x2 + mx, y2 + my, x + mx, y + my);
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
				case 'C':
					if (values.length != 6)
						throw new Exception('There should be 2 values for a C segment ($values)');
					C(values[0], values[1], values[2], values[3], values[4], values[5]);
				case 'Z' | 'z':
					throw new Exception('There should be 0 values for a Z segment ($values)');
					Z;
				default:
					trace(segment.charAt(0));
					null;
			}
			path.push(item);
		}
		return path;
	}
}
