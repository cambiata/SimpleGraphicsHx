package graphics;

import graphics.GSurface;
import graphics.GCore;
import graphics.GTools;
import graphics.GItems;
import js.html.CanvasElement;

using graphics.GTools;
using tools.EnumTools;
using Std;

class GSurfaceCanvas extends GSurfaceBase implements ISurfaceRenderer<CanvasElement> {
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
