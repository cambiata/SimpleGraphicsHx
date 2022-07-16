package truetype;

import truetype.TrueType;
import graphics.GPath;

@:access(truetype.TrueTypeFont)
class TrueTypeGPath extends TrueTypeBase implements ITrueTypeBase<GPath> {
	public function new(font:TrueTypeFont) {
		super(font);
	}

	override function moveTo(x:Float, y:Float):Void {
		this.glyphSegments.push(M(round3(x * this.scaleX + this.textX), round3(y * this.scaleY + this.textY)));
	}

	override function lineTo(x:Float, y:Float):Void {
		this.glyphSegments.push(L(round3(x * this.scaleX + this.textX), round3(y * this.scaleY + this.textY)));
	}

	override function quadraticCurveTo(px:Float, py:Float, x:Float, y:Float):Void {
		this.glyphSegments.push(Q(round3(px * this.scaleX + this.textX), round3(py * this.scaleY + this.textY), round3(x * this.scaleX + this.textX),
			round3(y * this.scaleY + this.textY)));
	}

	override function z():Void {
		this.glyphSegments.push(Z);
	}

	var glyphSegments:GPath = [];

	public function drawText(text:String, textX:Float = 0, textY:Float = 0, textSize:Float = 20):GPath {
		this.glyphSegments = [];
		this.calcText(text, textX, textY, textSize);
		return glyphSegments;
	}
}
