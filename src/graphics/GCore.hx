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
	Lightgray;
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

typedef GPoint = {x:Float, y:Float};
typedef GSize = {w:Float, h:Float};
typedef GRectsBase = Array<GRect>;

@:forward(iterator, push, keyValueIterator)
abstract GRects(GRectsBase) from GRectsBase {
	@:from static public function fromGRect(r:GRect):GRects {
		return [r];
	}

	public function overlapX(rightRects:GRects):Float {
		var overlap:Float = .0;
		for (rect in this) {
			for (rightRect in rightRects) {
				overlap = Math.max(overlap, rect.overlapX(rightRect));
			}
		}
		return overlap;
	}
}

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

	public function overlapX(right:GRect):Float {
		if ((right.y + right.h) <= this.y)
			return 0;
		if (right.y >= (this.y + this.h))
			return 0;
		return (this.x + this.w) - right.x;
	}
}

class GRectTools {
	static public function inflate(rect:GRect, x:Float, y:Float = null):GRect {
		if (y == null)
			y = x;
		rect.x -= x;
		rect.y -= y;
		rect.w = rect.w + x;
		rect.h = rect.w + x;
		return rect;
	}

	static public function move(rect:GRect, x:Null<Float>, y:Null<Float>):GRect {
		if (x == null)
			x = 0;
		if (y == null)
			y = 0;
		if (x == 0 && y == 0)
			return rect;
		rect.x = rect.x + x;
		rect.y = rect.y + y;
		return rect;
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

	public function scale(amount:Float) {
		if (amount == 1.0)
			return this;
		this.x *= amount;
		this.y *= amount;
		this.x2 *= amount;
		this.y2 *= amount;
		return this;
	}

	public function toRect():GRect {
		return new GRect(this.x, this.y, this.x2 - this.x, this.y2 - this.y);
	}
}
