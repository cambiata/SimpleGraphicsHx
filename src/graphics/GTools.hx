package graphics;

import haxe.Exception;
import graphics.GPath;
import graphics.GCore;
import graphics.GItems;

using Std;
using Math;
using tools.EnumTools;
using tools.ArrayItems;
using StringTools;
using graphics.GTools;

class GTools {
	static public function getBoundingRect(rects:Array<GRect>):GRect {
		var ret:GRect = rects.first();
		if (rects.length > 1)
			for (rect in rects) {
				ret = {
					x: ret.x.min(rect.x),
					y: ret.y.min(rect.y),
					w: ret.w.max(rect.w),
					h: ret.h.max(rect.h)
				};
			}
		return ret;
	}

	static public function getBoundingSize(rect:GRect):GSize {
		return {w: rect.w - rect.x, h: rect.h - rect.y};
	}

	static public function getColor(c:GColor):String {
		return switch c {
			default: c.getName().toLowerCase();
		}
	}
}
