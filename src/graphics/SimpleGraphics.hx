package graphics;

import js.html.CanvasElement;
import haxe.ds.Map;

using Std;
using Math;
using SimpleGraphics.GTools;
using tools.EnumTools;
using tools.ArrayItems;

enum GItem {
	Line(x1:Float, y1:Float, x2:Float, y2:Float, s:GStroke);
	Rect(x:Float, y:Float, w:Float, h:Float, fill:GFill, stroke:GStroke);
	Ellipse(x:Float, y:Float, w:Float, h:Float, fill:GFill, stroke:GStroke);
	Path(p:GPath, fill:GFill, stroke:GStroke);
	Text(x:Float, y:Float, s:String, font:String, size:String, bold:Bool, italic:Bool);
}

typedef GItems = Array<GItem>;

enum GFill {
	None;
	Solid(c:GColor);
	// Gradient( ... );
}

enum GStroke {
	None;
	Stroke(c:GColor, width:Float);
}

enum GColor {
	RGBA(r:Int, g:Int, b:Int, a:Int);
	Red;
	Blue;
	Green;
	Yellow;
	Purple;
	Gray;
	White;
	Black;
}

enum GLayer {
	Layer(items:GItems, placement:GPoint, size:GPoint, opacity:GValue, rotation:GValue);
}

enum GValue {
	SValue(v:Float);
	AValue(v:Map<Float, Float>);
}

enum GPoint {
	SPoint(x:Float, y:Float);
	APoint(v:Map<Float, {x:Float, y:Float}>);
}

typedef GSize = {w:Float, h:Float};

enum GPathElement {
	M(x:Float, y:Float);
	L(x:Float, y:Float);
	C(x1:Float, y1:Float, x2:Float, y2:Float, x:Float, y:Float);
	Z;
}

typedef GPath = Array<GPathElement>;

interface GSurface {
	function addLayer(layer:GLayer):Void;
	function addItem(item:GItem):Void;
}

interface GSurfaceRenderer<T> extends GSurface {
	function render():T;
}

class GTools {
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

	static public function getBoundingRect(rects:Array<GRect>):GRect {
		var ret:GRect = rects.first();
		if (rects.length > 1)
			for (rect in rects) {
				ret = {
					x: ret.x.min(rect.x),
					y: ret.y.min(rect.y),
					w: ret.w.max(rect.w),
					h: ret.h.max(rect.h)
				};
			}
		return ret;
	}

	static public function getBoundingSize(rect:GRect):GSize {
		return {w: rect.w - rect.x, h: rect.h - rect.y};
	}

	static public function moveItems(items:GItems, mx:Float, my:Float):GItems {
		final newItems = items.map(item -> {
			return switch item {
				case Line(x1, y1, x2, y2, s): GItem.Line(x1 + mx, y1 + mx, x2 + mx, y2 + my, s);
				case Rect(x, y, w, h, f, s): GItem.Rect(x + mx, y + mx, w, h, f, s);
				case Ellipse(x, y, w, h, f, s): GItem.Ellipse(x + mx, y + mx, w, h, f, s);
				case Path(path, f, s):
					// Path([], f, s);
					final newPath:GPath = path.map(pitem -> {
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
					return GItem.Path(newPath, f, s);
				case Text(x, y, s, f, size, b, i):
					GItem.Text(x + mx, y + my, s, f, size, b, i);
			}
		});
		return newItems;
	}

	static public function getColor(c:GColor):String {
		return switch c {
			default: c.getName().toLowerCase();
		}
	}
}

typedef GRect = {x:Float, y:Float, w:Float, h:Float}

class BaseSurface {
	final layers:Array<GLayer> = [];
	var layerItems:GItems;

	public function new() {
		this.layerItems = [];
		this.layers = [Layer(layerItems, null, null, null, null)];
	}

	public function addLayer(layer:GLayer) {
		this.layers.push(layer);
		this.layerItems = layer.extract(Layer(items, p, s, o, r) => items);
	}

	public function addItem(item:GItem) {
		this.layerItems.push(item);
	}

	public function addItems(items:Array<GItem>) {
		for (item in items)
			this.layerItems.push(item);
	}
}

class SvgSurface extends BaseSurface implements GSurfaceRenderer<Xml> {
	var svg:Xml;

	public function new() {
		super();
	}

	public function render():Xml {
		final boundingRects:Array<GRect> = this.layers.map(layer -> {
			final items:GItems = switch layer {
				case Layer(items, p, s, o, r):
					items;
			}
			return items.getBoundingBox();
		});
		final boundingRect:GRect = GTools.getBoundingRect(boundingRects);
		final boundingSize = GTools.getBoundingSize(boundingRect);

		this.svg = Xml.parse('<svg width="${boundingSize.w}" height="${boundingSize.h}"></svg>').firstElement();

		for (layer in layers) {
			final eLayer = Xml.createElement('g');
			this.svg.addChild(eLayer);
			final items = layer.extract(Layer(items, p, s, o, r) => items);
			final movedItems = items.moveItems(-boundingRect.x, -boundingRect.y);

			for (item in movedItems) {
				switch item {
					case Line(x1, y1, x2, y2, s):
						final line = Xml.createElement('line');
						line.set('x1', x1.string());
						line.set('y1', y1.string());
						line.set('x2', x2.string());
						line.set('y2', y2.string());
						//
						var style = '';
						switch s {
							case null:
							case Stroke(c, w): style += 'stroke: ${c.getColor()}; stroke-width: ${w.string()};';
							case None: style += ' stroke:none; ';
							default:
						}
						if (style != '')
							line.set('style', style);

						eLayer.addChild(line);

					case Rect(x, y, w, h, f, s):
						final rect = Xml.createElement('rect');
						rect.set('x', x.string());
						rect.set('y', y.string());
						rect.set('width', w.string());
						rect.set('height', h.string());
						//
						var style = '';
						switch s {
							case null:
							case Stroke(c, w): style += ' stroke: ${c.getColor()}; stroke-width: ${w.string()};';
							case None: style += ' stroke:none; ';
							default:
						}
						switch f {
							case null:
							case Solid(c): style += ' fill: ${c.getColor()};';
							case None: style += ' fill:none; ';
							default:
						}

						if (style != '')
							rect.set('style', style);

						eLayer.addChild(rect);
					case Ellipse(x, y, w, h, f, s):
						final item = Xml.createElement('ellipse');
						item.set('cx', (x + w / 2).string());
						item.set('cy', (y + h / 2).string());
						item.set('rx', (w / 2).string());
						item.set('ry', (h / 2).string());
						//
						var style = '';
						switch s {
							case null:
							case Stroke(c, w): style += ' stroke: ${c.getColor()}; stroke-width: ${w.string()};';
							case None: style += ' stroke:none; ';
							default:
						}
						switch f {
							case null:
							case Solid(c): style += ' fill: ${c.getColor()};';
							case None: style += ' fill:none; ';
							default:
						}

						if (style != '')
							item.set('style', style);

						eLayer.addChild(item);
					default:
				}
			}
		}
		return this.svg;
	}
}

class CanvasSurface extends BaseSurface implements GSurfaceRenderer<CanvasElement> {
	public function new() {
		super();
	}

	public function render():CanvasElement {
		final boundingRects:Array<GRect> = this.layers.map(layer -> {
			// var layerStroke:GStroke = null;
			final items:GItems = switch layer {
				case Layer(items, p, s, o, r):
					items;
			}
			return items.getBoundingBox();
		});
		final boundingRect:GRect = GTools.getBoundingRect(boundingRects);
		final boundingSize = GTools.getBoundingSize(boundingRect);

		final canvas = js.Browser.document.createCanvasElement();
		canvas.setAttribute('width', boundingSize.w.string());
		canvas.setAttribute('height', boundingSize.h.string());
		canvas.style.width = boundingSize.w + 'px';
		canvas.style.height = boundingSize.h + 'px';

		final ctx = canvas.getContext2d();

		for (layer in layers) {
			// this.svg.addChild(eLayer);
			final items = layer.extract(Layer(items, p, s, o, r) => items);

			final movedItems = items.moveItems(-boundingRect.x, -boundingRect.y);
			for (item in movedItems) {
				switch item {
					case Line(x1, y1, x2, y2, s):
						ctx.beginPath();
						ctx.moveTo(x1, y1);
						ctx.lineTo(x2, y2);
						switch s {
							case null:
							case Stroke(c, w):
								ctx.strokeStyle = c.getColor();
								ctx.lineWidth = w;
								ctx.stroke();
							case None:
							default:
						}
					case Rect(x, y, w, h, f, s):
						ctx.beginPath();
						ctx.rect(x, y, w, h);
						switch f {
							case Solid(c):
								ctx.fillStyle = c.getColor();
								ctx.fill();
							case None:
						}
						switch s {
							case null:
							case Stroke(c, width):
								ctx.strokeStyle = c.getColor();
								ctx.lineWidth = width;
								ctx.stroke();
							case None:
						}

					case Ellipse(x, y, w, h, f, s):
						ctx.beginPath();
						ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, Math.PI / 4, 0, 2 * Math.PI);
						switch f {
							case Solid(c):
								trace(c.getColor());
								ctx.fillStyle = c.getColor();
								ctx.fill();
							case None:
						}
						switch s {
							case null:
							case Stroke(c, width):
								ctx.strokeStyle = c.getColor();
								ctx.lineWidth = width;
								ctx.stroke();
							case None:
						}

					default:
				}
			}
		}

		return canvas;
	}
}
