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

/*
	enum GPoint {
	SPoint(x:Float, y:Float);
	APoint(v:Map<Float, {x:Float, y:Float}>);
	}
 */
typedef GPoint = {x:Float, y:Float};
typedef GSize = {w:Float, h:Float};
typedef GRectBase = {x:Float, y:Float, w:Float, h:Float}

@:using(GCore.GRectTools)
@:forward(x, y, w, h)
abstract GRect(GRectBase) from GRectBase to GRectBase {
	public function new(x:Float, y:Float, w:Float, h:Float) {
		this = {
			x: x,
			y: y,
			w: w,
			h: h
		};
	}
}

class GRectTools {
	static public function inflate(rect:GRect, x:Float, y:Float = null):GRect {
		if (y == null)
			y = x;
		return {
			x: rect.x - x,
			y: rect.y - y,
			w: rect.w + x,
			h: rect.h + y
		};
	}
}

typedef GAreaBase = {x:Float, y:Float, x2:Float, y2:Float};

@:forward(x, y, x2, y2)
abstract GArea(GAreaBase) from GAreaBase to GAreaBase {
	public function new(x:Float, y:Float, x2:Float, y2:Float) {
		if (x > x2) {
			final xt = x;
			x = x2;
			x2 = xt;
		}
		if (y > y2) {
			final yt = y;
			y = y2;
			y2 = yt;
		}

		this = {
			x: x,
			y: y,
			x2: x2,
			y2: y2
		};
	}

	public function embracePoint(x:Float, y:Float):GArea {
		if (x < this.x)
			this.x = x;
		if (y < this.y)
			this.y = y;
		if (x > this.x2)
			this.x2 = x;
		if (y > this.y2)
			this.y2 = y;
		return this;
	}

	public function embraceArea(a:GArea):GArea {
		if (a.x < this.x)
			this.x = a.x;
		if (a.y < this.y)
			this.y = a.y;
		if (a.x2 > this.x2)
			this.x2 = a.x2;
		if (a.y2 > this.y2)
			this.y2 = a.y2;
		return this;
	}

	public function getSize():GSize
		return {
			w: this.x2 - this.x,
			h: this.y2 - this.y
		};

	public function getXY():GPoint
		return {x: this.x, y: this.y};

	static public function combineAreas(areas:Array<GArea>):GArea {
		if (areas == null || areas.length == 0)
			return new GArea(0, 0, 0, 0);
		if (areas.length == 1)
			return areas[0];
		final combineArea = areas.shift();
		for (area in areas) {
			combineArea.embraceArea(area);
		}
		return combineArea;
	}

	public function inflate(x:Float, y:Float = null) {
		if (y == null)
			y = x;
		this.x -= x;
		this.y -= y;
		this.x2 += x;
		this.y2 += y;
		return this;
	}
}
