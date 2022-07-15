package graphics;

import haxe.ds.GenericStack;
import graphics.GCore;

using tools.ArrayItems;
using Math;

enum GItem {
	Line(x1:Float, y1:Float, x2:Float, y2:Float, s:GStroke);
	Rect(x:Float, y:Float, w:Float, h:Float, fill:GFill, stroke:GStroke);
	Ellipse(x:Float, y:Float, w:Float, h:Float, fill:GFill, stroke:GStroke);
	Path(p:GPath, fill:GFill, stroke:GStroke);
	Text(x:Float, y:Float, s:String, font:String, size:Float, bold:Bool, italic:Bool);
}

@:using(graphics.GItems.GItemsTools)
typedef GItems = Array<GItem>;

class GItemsTools {
	static public function test(items:GItems):GItems
		return items;

	static public function move(items:GItems, mx:Float, my:Float):GItems {
		final newItems = items.map(item -> {
			return switch item {
				case Line(x1, y1, x2, y2, s): GItem.Line(x1 + mx, y1 + my, x2 + mx, y2 + my, s);
				case Rect(x, y, w, h, f, s): GItem.Rect(x + mx, y + my, w, h, f, s);
				case Ellipse(x, y, w, h, f, s): GItem.Ellipse(x + mx, y + my, w, h, f, s);
				case Path(path, f, s):
					return GItem.Path(path.move(mx, my), f, s);
				case Text(x, y, s, f, size, b, i):
					GItem.Text(x + mx, y + my, s, f, size, b, i);
			}
		});
		return newItems;
	}

	static public function getBoundingArea(items:GItems):GArea {
		function getItemArea(item:GItem):GArea {
			return switch item {
				case Line(x1, y1, x2, y2, s):
					new GArea(x1, y1, x2, y2);
				case Rect(x, y, w, h, f, s) | Ellipse(x, y, w, h, f, s):
					new GArea(x, y, w + x, y + h);
				case Path(path, f, s):
					path.getBoundingArea();
				default:
					null;
			}
		}
		function getItemHalfStrokeWidth(item:GItem):Float {
			final s:GStroke = switch item {
				case null: null;
				case Line(_, _, _, _, s): s;
				case Rect(_, _, _, _, _, s) | Ellipse(_, _, _, _, _, s): s;
				case Path(_, _, s): s;
				default: null;
			}
			return switch s {
				case null:
					0;
				case Stroke(c, w):
					w / 2;
				default:
					0;
			}
		}

		if (items == null || items.length == 0)
			return new GArea(0, 0, 0, 0);
		var a:GArea = getItemArea(items[0]);
		if (items.length == 1)
			return a.inflate(getItemHalfStrokeWidth(items[0]));

		for (idx => item in items) {
			final itemArea = idx == 0 ? a : getItemArea(item);
			itemArea.inflate(getItemHalfStrokeWidth(item));
			a.embraceArea(itemArea);
		}
		return a;
	}

	static public function scale(items:GItems, scaleShape:Float, scaleStroke:Float = null):GItems {
		if (scaleStroke == null)
			scaleStroke = scaleShape;

		function fStroke(s:GStroke):GStroke
			return switch s {
				case null: null;
				case None: None;
				case Stroke(c, w): Stroke(c, w * scaleStroke);
			}

		final newItems = items.map(item -> {
			return switch item {
				case Line(x1, y1, x2, y2, s):
					GItem.Line(x1 * scaleShape, y1 * scaleShape, x2 * scaleShape, y2 * scaleShape, fStroke(s));
				case Rect(x, y, w, h, f, s):
					GItem.Rect(x * scaleShape, y * scaleShape, w * scaleShape, h * scaleShape, f, fStroke(s));
				case Ellipse(x, y, w, h, f, s): GItem.Ellipse(x * scaleShape, y * scaleShape, w * scaleShape, h * scaleShape, f, s);
				case Path(path, f, s):
					return GItem.Path(path.scale(scaleShape), f, fStroke(s));
				case Text(x, y, s, f, size, b, i):
					GItem.Text(x * scaleShape, y * scaleShape, s, f, size * scaleShape, b, i);
			}
		});
		return newItems;
	}
}
