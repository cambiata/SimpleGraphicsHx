package truetype;

import truetype.TrueTypeFont;
import graphics.GPath;

using Std;

@:access(truetype.TrueTypeFont)
class TrueTypeGPath extends TrueTypeBase implements ITrueTypeBase<GPath> {
	public function new(font:TrueTypeFont) {
		super(font);
	}

	override function moveTo(x:Float, y:Float):Void {
		this.glyphSegments.push(M(r3(x * this.scaleX + this.textX), r3(y * this.scaleY + this.textY)));
	}

	override function lineTo(x:Float, y:Float):Void {
		this.glyphSegments.push(L(r3(x * this.scaleX + this.textX), r3(y * this.scaleY + this.textY)));
	}

	override function quadraticCurveTo(px:Float, py:Float, x:Float, y:Float):Void {
		this.glyphSegments.push(Q(r3(px * this.scaleX + this.textX), r3(py * this.scaleY + this.textY), r3(x * this.scaleX + this.textX),
			r3(y * this.scaleY + this.textY)));
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

	public function drawChar(charCode:Int, textX:Float = 0, textY:Float = 0, textSize:Float = 20):GPath {
		this.glyphSegments = [];
		this.calcChar(charCode, textX, textY, textSize);
		return glyphSegments;
	}

	public function test(idx:Int) {
		trace('char idx: $idx');
		final glyph = this.font.readGlyph(idx);
		trace(glyph.string());
	}
}
