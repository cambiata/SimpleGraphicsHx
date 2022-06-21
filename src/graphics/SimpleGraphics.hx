package graphics;

import haxe.ds.Map;

enum GItem {
	Line(x:Float, y:Float, s:GStroke);
	Rect(x:Float, y:Float, w:Float, h:Float, fill:GFill, stroke:GStroke);
	Ellipse(x:Float, y:Float, w:Float, h:Float, fill:GFill, stroke:GStroke);
	Path(p:GPath, fill:GFill, stroke:GStroke);
	Text(s:String, font:String, size:String, bold:Bool, italic:Bool);
}

typedef GItems = Array<GItem>;

enum GFill {
	None;
	Color(c:Color);
	// Gradient( ... );
}

enum GStroke {
	None;
	Line(c:Color, width:Float);
}

enum Color {
	RGBA(r:Int, g:Int, b:Int, a:Int);
}

enum GLayer {
	Layer(placement:GPoint, size:GPoint, opacity:GValue, rotation:GValue);
}

enum GValue {
	SValue(v:Float);
	AValue(v:Map<Float, Float>);
}

enum GPoint {
	SPoint(x:Float, y:Float);
	APoint(v:Map<Float, {x:Float, y:Float}>);
}

enum GPathElement {
	M(x:Float, y:Float);
	L(x:Float, y:Float);
	C(x1:Float, y1:Float, x2:Float, y2:Float, x:Float, y:Float);
	Z;
}

typedef GPath = Array<GPathElement>;

interface GSurface<T> {
	function addLayer(l:GLayer):Void;
	function addItem(i:GItem):Void;
	function render():T;
}


