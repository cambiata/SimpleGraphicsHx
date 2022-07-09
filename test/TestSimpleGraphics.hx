import js.html.CanvasElement;
import graphics.SimpleGraphics;
import graphics.SimpleGraphics.GItem;

using tools.ObjectTools;
using graphics.SimpleGraphics.GTools;

function main() {
	// testPair();
	utest.UTest.run([new TestA()]);
}

class TestA implements utest.ITest {
	public function new() {}

	function testLayer() {
		final items:Array<GItem> = [
			Ellipse(-50, -50, 100, 100, Solid(Yellow), None),
			Line(0, 0, 100, -100, Stroke(Purple, 5)),
			Rect(-100, -100, 100, 100, GFill.Solid(Red), GStroke.Stroke(Blue, 10)),
			Rect(0, 0, 100, 100, GFill.Solid(Red), GStroke.Stroke(Blue, 10)),
			// Path (svg path style for curved shapes, truetype glyphs etc)...
		];

		// render to svg
		final sSurface:SvgSurface = new SvgSurface();
		sSurface.addItems(items);
		final svg = sSurface.render();

		// render to canvas
		final cSurface = new CanvasSurface();
		cSurface.addItems(items);
		final canvas = cSurface.render();

		// output
		outputToBrowser(svg, canvas);

		utest.Assert.isTrue(true);
	}

	// helper functions -----------------------------------------------

	function outputToBrowser(svgXml:Xml, canvas:CanvasElement) {
		final outputEl = js.Browser.document.getElementById('output');
		final row = js.Browser.document.createDivElement();
		row.classList.add('row');
		row.appendChild(canvas);
		final svgDiv = js.Browser.document.createDivElement();
		svgDiv.innerHTML = svgXml.toString();
		row.appendChild(svgDiv);
		outputEl.appendChild(row);
	}
}
