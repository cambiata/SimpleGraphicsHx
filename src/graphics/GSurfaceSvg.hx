package graphics;

import graphics.GSurface;
import graphics.GCore;
import graphics.GTools;
import graphics.GItems;

using graphics.GTools;
using tools.EnumTools;
using Std;

class GSurfaceSvg extends GSurfaceBase implements ISurfaceRenderer<Xml> {
	var svg:Xml;

	public function new(scalingShapes:Float = 1, scalingLines:Float = 1) {
		super();
		this.scalingShapes = scalingShapes;
		this.scalingLines = scalingLines;
	}

	public function render():Xml {
		super.beforeRender();

		this.svg = Xml.parse('<svg width="${this.boundingSize.w}" height="${this.boundingSize.h}" viewBox="0 0 ${this.boundingSize.w} ${this.boundingSize.h}"></svg>')
			.firstElement();

		for (layer in layers) {
			final eLayer = Xml.createElement('g');
			this.svg.addChild(eLayer);
			final items = layer.extract(Layer(items, p, s, o, r) => items);
			final movedItems = items.move(-this.movePoint.x, -this.movePoint.y);
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
							case null: style += ' stroke:none; ';
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
							case null: style += ' stroke:none; ';
							case Stroke(c, w): style += ' stroke: ${c.getColor()}; stroke-width: ${w.string()};';
							case None: style += ' stroke:none; ';
							default:
						}
						switch f {
							case null: style += ' fill:none; ';
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
							case null: style += ' stroke:none; ';
							case Stroke(c, w): style += ' stroke: ${c.getColor()}; stroke-width: ${w.string()};';
							case None: style += ' stroke:none; ';
							default:
						}
						switch f {
							case null: style += ' fill:none; ';
							case Solid(c): style += ' fill: ${c.getColor()};';
							case None: style += ' fill:none; ';
							default:
						}

						if (style != '')
							item.set('style', style);

						eLayer.addChild(item);
					case Path(path, f, s):
						final item = Xml.createElement('path');
						var style = '';
						switch s {
							case null: style += ' stroke:none; ';
							case Stroke(c, w): style += ' stroke: ${c.getColor()}; stroke-width: ${w.string()};';
							case None: style += ' stroke:none; ';
							default:
						}
						switch f {
							case null: style += ' fill:none; ';
							case Solid(c): style += ' fill: ${c.getColor()};';
							case None: style += ' fill:none; ';
							default:
						}

						if (style != '')
							item.set('style', style);
						var pathD = path.toString();
						item.set('d', pathD);

						eLayer.addChild(item);
					case Text(x, y, text, family, size, bold, italic, color):
						final sFontWeight = bold ? 'font-weight="bold"' : '';
						final sFontColor = color != null ? 'style="fill: $color"' : '';
						final sFontStyle = italic ? 'font-style="italic"' : '';
						var s = '<text x="$x" y="$y" font-size="$size" font-family="$family" $sFontWeight $sFontStyle $sFontColor>$text</text>';
						final item:Xml = Xml.parse(s);
						eLayer.addChild(item);

					default:
						trace('UNSUPPORDED ITEM: ' + item);
				}
			}
		}
		return this.svg;
	}
}
