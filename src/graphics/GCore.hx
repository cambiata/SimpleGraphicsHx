package graphics;

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
typedef GRect = {x:Float, y:Float, w:Float, h:Float}
