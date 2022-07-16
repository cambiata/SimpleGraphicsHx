package graphics;

import graphics.GCore;
import graphics.GPath;
import graphics.GItems;
import haxe.exceptions.NotImplementedException;
#if js
import js.html.CanvasElement;
#end
import haxe.ds.Map;
import haxe.Exception;

using Std;
using Math;
using tools.EnumTools;
using tools.ArrayItems;
using StringTools;
using graphics.GTools;

interface ISurface {
	function addLayer(layer:GLayer):Void;
	function addItem(item:GItem):Void;
}

interface ISurfaceRenderer<T> extends ISurface {
	function render():T;
}

class GSurfaceBase {
	final layers:Array<GLayer> = [];
	var layerItems:GItems;

	public function new() {
		this.layerItems = [];
		this.layers = [Layer(layerItems, null, null, null, null)];
	}

	public function addLayer(layer:GLayer) {
		this.layers.push(layer);
		this.layerItems = layer.extract(Layer(items, p, s, o, r) => items);
	}

	public function addItem(item:GItem) {
		this.layerItems.push(item);
	}

	public function addItems(items:Array<GItem>) {
		for (item in items)
			this.layerItems.push(item);
	}

	var boundingArea:GArea = null;
	var boundingSize:GSize = null;
	var movePoint:GPoint = null;

	function beforeRender():Void {
		final layerAreas:Array<GArea> = this.layers.map(layer -> {
			// var layerStroke:GStroke = null;
			final items:GItems = switch layer {
				case Layer(items, p, s, o, r):
					items;
			}
			return items.getBoundingArea();
		});

		this.boundingArea = GArea.combineAreas(layerAreas);
		this.boundingSize = boundingArea.getSize();
		this.movePoint = boundingArea.getXY();
	}
}
