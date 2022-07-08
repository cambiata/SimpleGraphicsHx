import js.html.CanvasElement;
import js.html.Element;
import js.Browser;

using graphics.SimpleGraphics.GTools;
using tools.ObjectTools;

import graphics.SimpleGraphics;
import graphics.SimpleGraphics.GItem;

using tools.PairIterator;

function testPair() {
	final a = [{x: 3}, {x: 8}, {x: 11}];
	for (left => right in a.toPairIterator({x: 20})) {
		trace('left: $left, right: $right, x-difference: ${right.x - left.x}');
	}
}

function main() {
	// testPair();
	utest.UTest.run([new TestA()]);
}

class TestA implements utest.ITest {
	public function new() {}

	// function test1() {
	// 	final items:GItems = [
	// 		// Line(0, 0, 10, 5, null),
	// 		Line(-5, 0, 10, 5, null),
	// 		//
	// 	];
	// 	final bb:GRect = items.getBoundingBox();
	// 	trace(bb);
	// }

	function test1() {
		// output();
	}

	function testLayer() {
		final items = [
			Ellipse(-50, -50, 100, 100, Solid(Yellow), None),
			Line(0, 0, 100, -100, Stroke(Purple, 5)),
			Rect(-100, -100, 100, 100, GFill.Solid(Red), GStroke.Stroke(Blue, 10)),
			Rect(0, 0, 100, 100, GFill.Solid(Red), GStroke.Stroke(Blue, 10)),
		];

		final sSurface:SvgSurface = new SvgSurface();
		sSurface.addItems(items);
		final svg = sSurface.render();

		final cSurface = new CanvasSurface();
		cSurface.addItems(items);
		final canvas = cSurface.render();

		outputJs(svg, canvas);

		#if sys
		sys.io.File.saveContent('test.svg', svgString);
		#end
	}

	function outputJs(svgXml:Xml, canvas:CanvasElement) {
		final outputEl = js.Browser.document.getElementById('output');
		final row = Browser.document.createDivElement();
		row.classList.add('row');
		row.appendChild(canvas);
		final svgDiv = Browser.document.createDivElement();
		svgDiv.innerHTML = svgXml.toString();
		row.appendChild(svgDiv);
		outputEl.appendChild(row);
	}
}
