import graphics.GSurfaceSvg;
import graphics.GSurface;
import graphics.GPath;
import graphics.GItems;
import graphics.GCore;
import graphics.GSurfaceSvg;
import graphics.GSurfaceCanvas;

using tools.ObjectTools;
using graphics.GTools;

function main() {
	// testPair();
	utest.UTest.run([new TestA()]);
}

class TestA implements utest.ITest {
	public function new() {}

	function testPath() {
		final pos:GPath = 'M0 0L100 0 100 100 0 100';
		// final pos:GPath = "M59.6 137 Q55 122.4 53.2 111 Q51.6 101.4 51.6 88.6 Q51.6 84.2 51.8 79.8 Q52.6 60.8 59.6 44.9 Q66.6 29 80.6 20.6 Q81.6 20 83.2 20 Q84.6 20 85.6 21 Q96.8 32.2 102.8 49.6 Q108.8 67 108.8 84.8 Q108.8 105.4 100 125.2 Q91.6 145 76.4 160.2 Q75.2 161.4 75.6 163.4 Q75.6 163.4 83.6 195.4 Q84.2 198.6 87.6 198.2 Q90.8 197.8 93.8 197.8 Q105.4 197.8 114.8 202.4 Q124.2 207 130 214.4 Q135.8 221.8 138.9 230.7 Q142 239.6 142 249 Q142 266.2 132.4 280.1 Q122.8 294 109.4 298.4 Q106.6 299.4 107.2 302.6 Q112.2 326.2 112.4 342.4 Q112.4 348.6 111.6 354.6 Q110 368.4 99.6 378.8 Q89.2 389.2 74.8 389.2 Q57.2 389.2 45 378.6 Q32.8 368 32.8 350.8 Q32.8 342 39 335.6 Q45.2 329.2 53.6 329.2 Q62.2 329.2 68.1 335.3 Q74 341.4 74 349.8 Q74 357 69.2 362.4 Q64.4 368 57.6 368.6 Q55.2 368.8 54.4 371 Q53.6 373.2 56 375 Q63.2 380.6 73.6 380.6 Q85 380.6 93.3 372.4 Q101.6 364.2 103 353.8 Q104 346.6 104 339.4 Q104 323.8 99.2 304.8 Q98.4 301.4 94.8 301.8 Q86.8 302.8 80 302.8 Q50.4 302.8 30.2 284.2 Q10 265.6 10 233.6 Q10 223.8 12.3 214.3 Q14.6 204.8 17.5 197.9 Q20.4 191 26.5 181.9 Q32.6 172.8 36.3 168 Q40 163.2 48 153.7 Q56 144.2 59 140.4 Q60.2 139 59.6 137 M90.8 228.4 L103.8 287.4 Q104.4 290 107.4 290 Q108.2 290 108.8 289.8 Q117 286.4 122.4 276.6 Q127.8 266.8 127.8 257.2 Q127.8 243.2 119.6 233.6 Q111.2 223.8 94.4 223.8 Q93 223.8 91.9 224.9 Q90.8 226 90.8 227.4 Q90.6 228 90.8 228.4 M63.2 172.8 Q60 176.4 53.7 183.1 Q47.4 189.8 44.3 193.3 Q41.2 196.8 36.7 203.2 Q32.2 209.6 30 215 Q27.8 220.4 26.1 228.2 Q24.4 236 24.4 244.8 Q24.4 257 31.9 268.4 Q39.4 279.8 52.5 287 Q65.6 294.2 80.6 294.2 Q86 294.2 92.6 293.6 Q94.2 293.4 95.2 292.1 Q96.2 290.8 95.8 289.2 Q95.8 289.2 82.8 229.4 Q82.2 226.6 79 226.6 Q78.4 226.6 77.6 226.8 Q68.4 230.2 64.6 236.4 Q60.8 242.6 60.8 252 Q60.8 263 72.8 271 Q74.2 272 74.2 274 Q74.2 275.6 72.9 277 Q71.6 278.4 69.8 278.4 Q68.8 278.4 68 278 Q56.6 272 51.1 261.7 Q45.6 251.4 45.6 240 Q45.6 229 53.5 217.3 Q61.4 205.6 73.2 201.2 Q76.2 200 75.6 197 Q75.6 197 69.6 174.4 Q69.2 172.2 66.8 171.8 Q64.4 171.4 63.2 172.8 M96.8 56.4 Q95.2 51.2 91.4 51.2 Q90.2 51.2 89.2 51.8 Q76.4 59.4 68.9 73.2 Q61.4 87 61.4 102.4 Q61.4 112.4 65.6 127 Q66.2 129.2 68.6 129.6 Q70.6 129.8 72 128.2 Q72.6 127.4 77.7 121.1 Q82.8 114.8 84.4 112.7 Q86 110.6 89.8 104.7 Q93.6 98.8 95.1 94.9 Q96.6 91 98 85.2 Q99.4 79.4 99.4 73.6 Q99.4 65.2 96.8 56.4 Z";
		trace(pos);
		utest.Assert.isTrue(true);
		final surface = new GSurfaceSvg();
	}

	function xtestSizeRects() {
		var a = new GArea(0, 0, 0, 0);
		trace(a);
		a.embracePoint(0, 10);
		trace(a);
		a.inflate(2);
		trace(a);

		// final items:GItems = [
		// 	Line(0, 0, 100, 100, null),
		// 	// Line(-10, 0, 100, 100, null),
		// 	// 	//
		// 	// 	Rect(0, 0, 100, 100, null, null),
		// 	// 	Rect(100, 0, 100, 100, null, null),
		// 	// 	Rect(0, 100, 100, 100, null, null),
		// ];
		// trace(GItemsTools.getBoundingBox(items));

		// final pathItems:GItems = [
		// 	//
		// 	Path(GPath.fromString('M0 0L100 0L100 100L0 100  M100 0L200 0L200 100L100 100'), null, GStroke.Stroke(Blue, 10)),
		// ];
		// final pathItems:GItems = [
		// 	//
		// 	Rect(0, 0, 101, 100, GFill.Solid(Red), null),
		// 	Path(GPath.fromString('M0 0L100 0L100 100L0 100 '), GFill.Solid(Red), GStroke.Stroke(Blue, 0)),
		// ];
		// trace(GItemsTools.getBoundingBox(pathItems));
	}

	function xtestPathBoundingBox() {
		// var path:GPath = 'M100 0L200 0L200 100L100 100';
		var path:GPath = 'M-10 -10Q0 0 0 0L0 0 ';
		trace(path);
		var bb:GArea = path.getBoundingArea();
		trace(bb);
		var path2:GPath = path.move(10, 10);
		trace(path2);
		var bb2:GArea = path2.getBoundingArea();
		trace(bb2);
	}

	#if js
	function testLayer() {
		// final items:Array<GItem> = [
		// Ellipse(-50, -50, 100, 100, Solid(Yellow), None),
		// Line(0, 0, 100, -100, Stroke(Purple, 5)),
		// Rect(-100, -100, 100, 100, GFill.Solid(Red), GStroke.Stroke(Purple, 10)),
		// Rect(0, 0, 100, 100, GFill.Solid(Red), GStroke.Stroke(Blue, 10)),
		// Path(GPath.fromString('M0 0L30 0L30 30L0 30'), GFill.Solid(Black), GStroke.Stroke(Yellow, 1)),
		// ];

		final items:GItems = [
			//
			Ellipse(50, 50, 100, 100, GFill.Solid(Gray), GStroke.Stroke(Black, 1)),
			Path(GPath.fromString('M0 0L100 0L100 100L0 100L0 0 '), 0, 0, GFill.Solid(Red), GStroke.Stroke(Blue, 10)),
			// Path(GPath.fromString('M100 100L200 100L200 200L100 200L100 100 '), 0, 0, GFill.Solid(Yellow), GStroke.Stroke(Purple, 10)),
			Path(GPath.fromString('M0 0L100 0L100 100L0 100L0 0 '), 100, 100, GFill.Solid(Yellow), GStroke.Stroke(Purple, 10)),
			Text(0, 30, 'Hello, baby!', 'Arial', 36, false, false, Black),
		];
		// output
		outputToBrowser(items);
		utest.Assert.isTrue(true);
	}

	// helper functions -----------------------------------------------

	function outputToBrowser(items:GItems) {
		// render to svg
		final scale:Float = 2;

		final sSurface = new GSurfaceSvg(scale, scale);
		sSurface.addItems(items);
		final svg = sSurface.render();

		// render to canvas
		final cSurface = new GSurfaceCanvas(scale, scale);
		cSurface.addItems(items);
		final canvas = cSurface.render();

		//----------------------------------------------
		final outputEl = js.Browser.document.getElementById('output');
		final row = js.Browser.document.createDivElement();
		row.classList.add('row');
		row.appendChild(canvas);
		final svgDiv = js.Browser.document.createDivElement();
		svgDiv.innerHTML = svg.toString();
		row.appendChild(svgDiv);
		outputEl.appendChild(row);
	}
	#end
}
