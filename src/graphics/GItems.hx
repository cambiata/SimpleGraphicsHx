package graphics;

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
				case Line(x1, y1, x2, y2, s): GItem.Line(x1 + mx, y1 + mx, x2 + mx, y2 + my, s);
				case Rect(x, y, w, h, f, s): GItem.Rect(x + mx, y + mx, w, h, f, s);
				case Ellipse(x, y, w, h, f, s): GItem.Ellipse(x + mx, y + mx, w, h, f, s);
				case Path(path, f, s):
					return GItem.Path(path.move(mx, my), f, s);
				case Text(x, y, s, f, size, b, i):
					GItem.Text(x + mx, y + my, s, f, size, b, i);
			}
		});
		return newItems;
	}

	static public function getBoundingBox(items:GItems):GRect {
		var minX:Float = null;
		var minY:Float = null;
		var maxX:Float = null;
		var maxY:Float = null;

		for (item in items) {
			var ix:Float = null;
			var iy:Float = null;
			var ix2:Float = null;
			var iy2:Float = null;
			switch item {
				case Line(x1, y1, x2, y2, s):
					final halfStrokeWidth = switch s {
						case null: 0;
						case Stroke(c, w): w / 2;
						default: 0;
					}

					ix = x1.min(x2) - halfStrokeWidth;
					iy = y1.min(y2) - halfStrokeWidth;
					ix2 = x1.max(x2) + halfStrokeWidth;
					iy2 = y1.max(y2) + halfStrokeWidth;

				case Rect(x, y, w, h, f, s) | Ellipse(x, y, w, h, f, s):
					final halfStrokeWidth = switch s {
						case null: 0;
						case Stroke(c, w): w / 2;
						default: 0;
					}

					ix = x.min(x + w) - halfStrokeWidth;
					iy = y.min(x + h) - halfStrokeWidth;
					ix2 = x.max(x + w) + halfStrokeWidth;
					iy2 = y.max(y + h) + halfStrokeWidth;

				case Path(path, f, s):
					for (pitem in path) {
						switch pitem {
							case M(x, y) | L(x, y):
								ix = x;
								iy = y;
								ix2 = x;
								iy2 = y;
							case C(x1, y1, x2, y2, x, y):
								ix = x1.min(x2.min(x));
								iy = y1.min(y2.min(y));
								ix2 = x1.max(x2.max(x));
								iy2 = y1.max(y2.max(y));
							case Z:
						}
					}

				case Text(x, y, s, f, size, b, i):
					ix = x;
					iy = y; // - fontHeight...
					ix2 = x; // + stringWidth...
					iy2 = y; // + bewlow baseline height...
			}

			if (ix != null)
				minX = minX != null ? minX.min(ix) : ix;
			if (iy != null)
				minY = minY != null ? minY.min(iy) : iy;
			if (ix2 != null)
				maxX = maxX != null ? maxX.max(ix2) : ix2;
			if (iy2 != null)
				maxY = maxY != null ? maxY.max(iy2) : iy2;
		}
		return {
			x: minX,
			y: minY,
			w: maxX,
			h: maxY,
		};
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
