package graphics;

import js.html.Path2D;
import graphics.GSurface;
import graphics.GCore;

using graphics.GTools;
using tools.EnumTools;
using Std;

#if js
class GSurfaceCanvas extends GSurfaceBase implements ISurfaceRenderer<js.html.CanvasElement> {
	public function new(scalingShapes:Float = 1, scalingLines:Float = 1) {
		super();
		this.scalingShapes = scalingShapes;
		this.scalingLines = scalingLines;
	}

	public function render():js.html.CanvasElement {
		super.beforeRender();

		final canvas = js.Browser.document.createCanvasElement();
		canvas.setAttribute('width', boundingSize.w.string());
		canvas.setAttribute('height', boundingSize.h.string());
		canvas.style.width = boundingSize.w + 'px';
		canvas.style.height = boundingSize.h + 'px';

		final ctx = canvas.getContext2d();

		for (layer in layers) {
			final items = layer.extract(Layer(items, p, s, o, r) => items);
			final movedItems = items.move(-this.movePoint.x, -this.movePoint.y);
			var stroke:GStroke = null;
			var fill:GFill = null;
			var path2d:Path2D = null;
			for (item in movedItems) {
				switch item {
					case Line(x1, y1, x2, y2, s):
						stroke = s;
						fill = null;
						ctx.beginPath();
						ctx.moveTo(x1, y1);
						ctx.lineTo(x2, y2);
					case Rect(x, y, w, h, f, s):
						stroke = s;
						fill = f;
						ctx.beginPath();
						ctx.rect(x, y, w, h);
					case Ellipse(x, y, w, h, f, s):
						stroke = s;
						fill = f;
						ctx.beginPath();
						ctx.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, Math.PI / 4, 0, 2 * Math.PI);
					case Path(path, f, s):
						stroke = s;
						fill = f;
						ctx.beginPath();
						var pathString:String = path.toString();
						path2d = new Path2D(pathString);
					case Text(x, y, text, family, size, bold, italic, color):
						ctx.font = '${size}px $family';
						ctx.fillStyle = color.string();
						ctx.fillText(text, x, y);
					default:
				}

				switch fill {
					case null:
					case Solid(c):
						ctx.fillStyle = c.getColor();
						path2d == null ? ctx.fill() : ctx.fill(path2d);
					case None:
				}
				switch stroke {
					case null:
					case Stroke(c, width):
						if (width > 0) {
							ctx.strokeStyle = c.getColor();
							ctx.lineWidth = width;
							path2d == null ? ctx.stroke() : ctx.stroke(path2d);
						}
					case None:
				}
			}
		}
		return canvas;
	}
}
#end

#if !js
class GSurfaceCanvas extends GSurfaceBase implements ISurfaceRenderer<Void> {
	public function new() {
		super();
	}

	public function render():Void {}
}
#end
