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

	function testLayer() {
		final svg:SvgSurface = new SvgSurface();
		svg.addItem(Rect(0, 0, 200, 100, null, null));
		svg.addItem(Ellipse(50, 0, 100, 100, Solid(Yellow), None));
		svg.addItem(Line(0, 0, 200, 100, Stroke(Purple, 5)));
		final svgString = svg.render();
		#if sys
		sys.io.File.saveContent('test.svg', svgString);
		#end
	}
}
