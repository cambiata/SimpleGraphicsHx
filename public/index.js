(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {},$_;
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	this.r = new RegExp(r,opt.split("u").join(""));
};
EReg.__name__ = "EReg";
EReg.prototype = {
	r: null
	,match: function(s) {
		if(this.r.global) {
			this.r.lastIndex = 0;
		}
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = "HxOverrides";
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) {
		return undefined;
	}
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(len == null) {
		len = s.length;
	} else if(len < 0) {
		if(pos == 0) {
			len = s.length + len;
		} else {
			return "";
		}
	}
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) {
		return false;
	}
	a.splice(i,1);
	return true;
};
HxOverrides.now = function() {
	return Date.now();
};
var Lambda = function() { };
Lambda.__name__ = "Lambda";
Lambda.array = function(it) {
	var a = [];
	var i = $getIterator(it);
	while(i.hasNext()) a.push(i.next());
	return a;
};
Lambda.has = function(it,elt) {
	var x = $getIterator(it);
	while(x.hasNext()) if(x.next() == elt) {
		return true;
	}
	return false;
};
Math.__name__ = "Math";
var Reflect = function() { };
Reflect.__name__ = "Reflect";
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( _g ) {
		return null;
	}
};
Reflect.getProperty = function(o,field) {
	var tmp;
	if(o == null) {
		return null;
	} else {
		var tmp1;
		if(o.__properties__) {
			tmp = o.__properties__["get_" + field];
			tmp1 = tmp;
		} else {
			tmp1 = false;
		}
		if(tmp1) {
			return o[tmp]();
		} else {
			return o[field];
		}
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) {
			a.push(f);
		}
		}
	}
	return a;
};
Reflect.isFunction = function(f) {
	if(typeof(f) == "function") {
		return !(f.__name__ || f.__ename__);
	} else {
		return false;
	}
};
Reflect.compare = function(a,b) {
	if(a == b) {
		return 0;
	} else if(a > b) {
		return 1;
	} else {
		return -1;
	}
};
Reflect.compareMethods = function(f1,f2) {
	if(f1 == f2) {
		return true;
	}
	if(!Reflect.isFunction(f1) || !Reflect.isFunction(f2)) {
		return false;
	}
	if(f1.scope == f2.scope && f1.method == f2.method) {
		return f1.method != null;
	} else {
		return false;
	}
};
Reflect.isObject = function(v) {
	if(v == null) {
		return false;
	}
	var t = typeof(v);
	if(!(t == "string" || t == "object" && v.__enum__ == null)) {
		if(t == "function") {
			return (v.__name__ || v.__ename__) != null;
		} else {
			return false;
		}
	} else {
		return true;
	}
};
var Std = function() { };
Std.__name__ = "Std";
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseInt = function(x) {
	if(x != null) {
		var _g = 0;
		var _g1 = x.length;
		while(_g < _g1) {
			var i = _g++;
			var c = x.charCodeAt(i);
			if(c <= 8 || c >= 14 && c != 32 && c != 45) {
				var nc = x.charCodeAt(i + 1);
				var v = parseInt(x,nc == 120 || nc == 88 ? 16 : 10);
				if(isNaN(v)) {
					return null;
				} else {
					return v;
				}
			}
		}
	}
	return null;
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = "StringBuf";
StringBuf.prototype = {
	b: null
	,__class__: StringBuf
};
var StringTools = function() { };
StringTools.__name__ = "StringTools";
StringTools.htmlEscape = function(s,quotes) {
	var buf_b = "";
	var _g_offset = 0;
	var _g_s = s;
	while(_g_offset < _g_s.length) {
		var s = _g_s;
		var index = _g_offset++;
		var c = s.charCodeAt(index);
		if(c >= 55296 && c <= 56319) {
			c = c - 55232 << 10 | s.charCodeAt(index + 1) & 1023;
		}
		var c1 = c;
		if(c1 >= 65536) {
			++_g_offset;
		}
		var code = c1;
		switch(code) {
		case 34:
			if(quotes) {
				buf_b += "&quot;";
			} else {
				buf_b += String.fromCodePoint(code);
			}
			break;
		case 38:
			buf_b += "&amp;";
			break;
		case 39:
			if(quotes) {
				buf_b += "&#039;";
			} else {
				buf_b += String.fromCodePoint(code);
			}
			break;
		case 60:
			buf_b += "&lt;";
			break;
		case 62:
			buf_b += "&gt;";
			break;
		default:
			buf_b += String.fromCodePoint(code);
		}
	}
	return buf_b;
};
StringTools.startsWith = function(s,start) {
	if(s.length >= start.length) {
		return s.lastIndexOf(start,0) == 0;
	} else {
		return false;
	}
};
StringTools.isSpace = function(s,pos) {
	var c = HxOverrides.cca(s,pos);
	if(!(c > 8 && c < 14)) {
		return c == 32;
	} else {
		return true;
	}
};
StringTools.ltrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,r)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,r,l - r);
	} else {
		return s;
	}
};
StringTools.rtrim = function(s) {
	var l = s.length;
	var r = 0;
	while(r < l && StringTools.isSpace(s,l - r - 1)) ++r;
	if(r > 0) {
		return HxOverrides.substr(s,0,l - r);
	} else {
		return s;
	}
};
StringTools.trim = function(s) {
	return StringTools.ltrim(StringTools.rtrim(s));
};
StringTools.replace = function(s,sub,by) {
	return s.split(sub).join(by);
};
var utest_ITest = function() { };
utest_ITest.__name__ = "utest.ITest";
utest_ITest.__isInterface__ = true;
var TestA = function() {
};
TestA.__name__ = "TestA";
TestA.__interfaces__ = [utest_ITest];
TestA.prototype = {
	testLayer: function() {
		var items = [graphics_GItem.Ellipse(-50,-50,100,100,graphics_GFill.Solid(graphics_GColor.Yellow),graphics_GStroke.None),graphics_GItem.Line(0,0,100,-100,graphics_GStroke.Stroke(graphics_GColor.Purple,5)),graphics_GItem.Rect(-100,-100,100,100,graphics_GFill.Solid(graphics_GColor.Red),graphics_GStroke.Stroke(graphics_GColor.Blue,10)),graphics_GItem.Rect(0,0,100,100,graphics_GFill.Solid(graphics_GColor.Red),graphics_GStroke.Stroke(graphics_GColor.Blue,10))];
		var sSurface = new graphics_SvgSurface();
		sSurface.addItems(items);
		var svg = sSurface.render();
		var cSurface = new graphics_CanvasSurface();
		cSurface.addItems(items);
		this.outputToBrowser(svg,cSurface.render());
		utest_Assert.isTrue(true,null,{ fileName : "test/TestSimpleGraphics.hx", lineNumber : 37, className : "TestA", methodName : "testLayer"});
	}
	,outputToBrowser: function(svgXml,canvas) {
		var outputEl = window.document.getElementById("output");
		var row = window.document.createElement("div");
		row.classList.add("row");
		row.appendChild(canvas);
		var svgDiv = window.document.createElement("div");
		svgDiv.innerHTML = haxe_xml_Printer.print(svgXml);
		row.appendChild(svgDiv);
		outputEl.appendChild(row);
	}
	,__initializeUtest__: function() {
		var _gthis = this;
		var init = { tests : [], dependencies : [], accessories : { }};
		init.tests.push({ name : "testLayer", dependencies : [], execute : function() {
			_gthis.testLayer();
			return utest_Async.getResolved();
		}});
		return init;
	}
	,__class__: TestA
};
function TestSimpleGraphics_main() {
	utest_UTest.run([new TestA()]);
}
var ValueType = $hxEnums["ValueType"] = { __ename__:"ValueType",__constructs__:null
	,TNull: {_hx_name:"TNull",_hx_index:0,__enum__:"ValueType",toString:$estr}
	,TInt: {_hx_name:"TInt",_hx_index:1,__enum__:"ValueType",toString:$estr}
	,TFloat: {_hx_name:"TFloat",_hx_index:2,__enum__:"ValueType",toString:$estr}
	,TBool: {_hx_name:"TBool",_hx_index:3,__enum__:"ValueType",toString:$estr}
	,TObject: {_hx_name:"TObject",_hx_index:4,__enum__:"ValueType",toString:$estr}
	,TFunction: {_hx_name:"TFunction",_hx_index:5,__enum__:"ValueType",toString:$estr}
	,TClass: ($_=function(c) { return {_hx_index:6,c:c,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TClass",$_.__params__ = ["c"],$_)
	,TEnum: ($_=function(e) { return {_hx_index:7,e:e,__enum__:"ValueType",toString:$estr}; },$_._hx_name="TEnum",$_.__params__ = ["e"],$_)
	,TUnknown: {_hx_name:"TUnknown",_hx_index:8,__enum__:"ValueType",toString:$estr}
};
ValueType.__constructs__ = [ValueType.TNull,ValueType.TInt,ValueType.TFloat,ValueType.TBool,ValueType.TObject,ValueType.TFunction,ValueType.TClass,ValueType.TEnum,ValueType.TUnknown];
var Type = function() { };
Type.__name__ = "Type";
Type.getEnum = function(o) {
	if(o == null) {
		return null;
	}
	return $hxEnums[o.__enum__];
};
Type.getInstanceFields = function(c) {
	var a = [];
	for(var i in c.prototype) a.push(i);
	HxOverrides.remove(a,"__class__");
	HxOverrides.remove(a,"__properties__");
	return a;
};
Type.typeof = function(v) {
	switch(typeof(v)) {
	case "boolean":
		return ValueType.TBool;
	case "function":
		if(v.__name__ || v.__ename__) {
			return ValueType.TObject;
		}
		return ValueType.TFunction;
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) {
			return ValueType.TInt;
		}
		return ValueType.TFloat;
	case "object":
		if(v == null) {
			return ValueType.TNull;
		}
		var e = v.__enum__;
		if(e != null) {
			return ValueType.TEnum($hxEnums[e]);
		}
		var c = js_Boot.getClass(v);
		if(c != null) {
			return ValueType.TClass(c);
		}
		return ValueType.TObject;
	case "string":
		return ValueType.TClass(String);
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
Type.enumParameters = function(e) {
	var enm = $hxEnums[e.__enum__];
	var params = enm.__constructs__[e._hx_index].__params__;
	if(params != null) {
		var _g = [];
		var _g1 = 0;
		while(_g1 < params.length) {
			var p = params[_g1];
			++_g1;
			_g.push(e[p]);
		}
		return _g;
	} else {
		return [];
	}
};
var XmlType = {};
XmlType.toString = function(this1) {
	switch(this1) {
	case 0:
		return "Element";
	case 1:
		return "PCData";
	case 2:
		return "CData";
	case 3:
		return "Comment";
	case 4:
		return "DocType";
	case 5:
		return "ProcessingInstruction";
	case 6:
		return "Document";
	}
};
var Xml = function(nodeType) {
	this.nodeType = nodeType;
	this.children = [];
	this.attributeMap = new haxe_ds_StringMap();
};
Xml.__name__ = "Xml";
Xml.parse = function(str) {
	return haxe_xml_Parser.parse(str);
};
Xml.createElement = function(name) {
	var xml = new Xml(Xml.Element);
	if(xml.nodeType != Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, expected Element but found " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeName = name;
	return xml;
};
Xml.createPCData = function(data) {
	var xml = new Xml(Xml.PCData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createCData = function(data) {
	var xml = new Xml(Xml.CData);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createComment = function(data) {
	var xml = new Xml(Xml.Comment);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createDocType = function(data) {
	var xml = new Xml(Xml.DocType);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createProcessingInstruction = function(data) {
	var xml = new Xml(Xml.ProcessingInstruction);
	if(xml.nodeType == Xml.Document || xml.nodeType == Xml.Element) {
		throw haxe_Exception.thrown("Bad node type, unexpected " + (xml.nodeType == null ? "null" : XmlType.toString(xml.nodeType)));
	}
	xml.nodeValue = data;
	return xml;
};
Xml.createDocument = function() {
	return new Xml(Xml.Document);
};
Xml.prototype = {
	nodeType: null
	,nodeName: null
	,nodeValue: null
	,parent: null
	,children: null
	,attributeMap: null
	,get: function(att) {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return this.attributeMap.h[att];
	}
	,set: function(att,value) {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		this.attributeMap.h[att] = value;
	}
	,exists: function(att) {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return Object.prototype.hasOwnProperty.call(this.attributeMap.h,att);
	}
	,attributes: function() {
		if(this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		return new haxe_ds__$StringMap_StringMapKeyIterator(this.attributeMap.h);
	}
	,firstElement: function() {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		var _g = 0;
		var _g1 = this.children;
		while(_g < _g1.length) {
			var child = _g1[_g];
			++_g;
			if(child.nodeType == Xml.Element) {
				return child;
			}
		}
		return null;
	}
	,addChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		if(x.parent != null) {
			x.parent.removeChild(x);
		}
		this.children.push(x);
		x.parent = this;
	}
	,removeChild: function(x) {
		if(this.nodeType != Xml.Document && this.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (this.nodeType == null ? "null" : XmlType.toString(this.nodeType)));
		}
		if(HxOverrides.remove(this.children,x)) {
			x.parent = null;
			return true;
		}
		return false;
	}
	,toString: function() {
		return haxe_xml_Printer.print(this);
	}
	,__class__: Xml
};
var graphics_GItem = $hxEnums["graphics.GItem"] = { __ename__:"graphics.GItem",__constructs__:null
	,Line: ($_=function(x1,y1,x2,y2,s) { return {_hx_index:0,x1:x1,y1:y1,x2:x2,y2:y2,s:s,__enum__:"graphics.GItem",toString:$estr}; },$_._hx_name="Line",$_.__params__ = ["x1","y1","x2","y2","s"],$_)
	,Rect: ($_=function(x,y,w,h,fill,stroke) { return {_hx_index:1,x:x,y:y,w:w,h:h,fill:fill,stroke:stroke,__enum__:"graphics.GItem",toString:$estr}; },$_._hx_name="Rect",$_.__params__ = ["x","y","w","h","fill","stroke"],$_)
	,Ellipse: ($_=function(x,y,w,h,fill,stroke) { return {_hx_index:2,x:x,y:y,w:w,h:h,fill:fill,stroke:stroke,__enum__:"graphics.GItem",toString:$estr}; },$_._hx_name="Ellipse",$_.__params__ = ["x","y","w","h","fill","stroke"],$_)
	,Path: ($_=function(p,fill,stroke) { return {_hx_index:3,p:p,fill:fill,stroke:stroke,__enum__:"graphics.GItem",toString:$estr}; },$_._hx_name="Path",$_.__params__ = ["p","fill","stroke"],$_)
	,Text: ($_=function(x,y,s,font,size,bold,italic) { return {_hx_index:4,x:x,y:y,s:s,font:font,size:size,bold:bold,italic:italic,__enum__:"graphics.GItem",toString:$estr}; },$_._hx_name="Text",$_.__params__ = ["x","y","s","font","size","bold","italic"],$_)
};
graphics_GItem.__constructs__ = [graphics_GItem.Line,graphics_GItem.Rect,graphics_GItem.Ellipse,graphics_GItem.Path,graphics_GItem.Text];
var graphics_GFill = $hxEnums["graphics.GFill"] = { __ename__:"graphics.GFill",__constructs__:null
	,None: {_hx_name:"None",_hx_index:0,__enum__:"graphics.GFill",toString:$estr}
	,Solid: ($_=function(c) { return {_hx_index:1,c:c,__enum__:"graphics.GFill",toString:$estr}; },$_._hx_name="Solid",$_.__params__ = ["c"],$_)
};
graphics_GFill.__constructs__ = [graphics_GFill.None,graphics_GFill.Solid];
var graphics_GStroke = $hxEnums["graphics.GStroke"] = { __ename__:"graphics.GStroke",__constructs__:null
	,None: {_hx_name:"None",_hx_index:0,__enum__:"graphics.GStroke",toString:$estr}
	,Stroke: ($_=function(c,width) { return {_hx_index:1,c:c,width:width,__enum__:"graphics.GStroke",toString:$estr}; },$_._hx_name="Stroke",$_.__params__ = ["c","width"],$_)
};
graphics_GStroke.__constructs__ = [graphics_GStroke.None,graphics_GStroke.Stroke];
var graphics_GColor = $hxEnums["graphics.GColor"] = { __ename__:"graphics.GColor",__constructs__:null
	,RGBA: ($_=function(r,g,b,a) { return {_hx_index:0,r:r,g:g,b:b,a:a,__enum__:"graphics.GColor",toString:$estr}; },$_._hx_name="RGBA",$_.__params__ = ["r","g","b","a"],$_)
	,Red: {_hx_name:"Red",_hx_index:1,__enum__:"graphics.GColor",toString:$estr}
	,Blue: {_hx_name:"Blue",_hx_index:2,__enum__:"graphics.GColor",toString:$estr}
	,Green: {_hx_name:"Green",_hx_index:3,__enum__:"graphics.GColor",toString:$estr}
	,Yellow: {_hx_name:"Yellow",_hx_index:4,__enum__:"graphics.GColor",toString:$estr}
	,Purple: {_hx_name:"Purple",_hx_index:5,__enum__:"graphics.GColor",toString:$estr}
	,Gray: {_hx_name:"Gray",_hx_index:6,__enum__:"graphics.GColor",toString:$estr}
	,White: {_hx_name:"White",_hx_index:7,__enum__:"graphics.GColor",toString:$estr}
	,Black: {_hx_name:"Black",_hx_index:8,__enum__:"graphics.GColor",toString:$estr}
};
graphics_GColor.__constructs__ = [graphics_GColor.RGBA,graphics_GColor.Red,graphics_GColor.Blue,graphics_GColor.Green,graphics_GColor.Yellow,graphics_GColor.Purple,graphics_GColor.Gray,graphics_GColor.White,graphics_GColor.Black];
var graphics_GLayer = $hxEnums["graphics.GLayer"] = { __ename__:"graphics.GLayer",__constructs__:null
	,Layer: ($_=function(items,placement,size,opacity,rotation) { return {_hx_index:0,items:items,placement:placement,size:size,opacity:opacity,rotation:rotation,__enum__:"graphics.GLayer",toString:$estr}; },$_._hx_name="Layer",$_.__params__ = ["items","placement","size","opacity","rotation"],$_)
};
graphics_GLayer.__constructs__ = [graphics_GLayer.Layer];
var graphics_GValue = $hxEnums["graphics.GValue"] = { __ename__:"graphics.GValue",__constructs__:null
	,SValue: ($_=function(v) { return {_hx_index:0,v:v,__enum__:"graphics.GValue",toString:$estr}; },$_._hx_name="SValue",$_.__params__ = ["v"],$_)
	,AValue: ($_=function(v) { return {_hx_index:1,v:v,__enum__:"graphics.GValue",toString:$estr}; },$_._hx_name="AValue",$_.__params__ = ["v"],$_)
};
graphics_GValue.__constructs__ = [graphics_GValue.SValue,graphics_GValue.AValue];
var graphics_GPoint = $hxEnums["graphics.GPoint"] = { __ename__:"graphics.GPoint",__constructs__:null
	,SPoint: ($_=function(x,y) { return {_hx_index:0,x:x,y:y,__enum__:"graphics.GPoint",toString:$estr}; },$_._hx_name="SPoint",$_.__params__ = ["x","y"],$_)
	,APoint: ($_=function(v) { return {_hx_index:1,v:v,__enum__:"graphics.GPoint",toString:$estr}; },$_._hx_name="APoint",$_.__params__ = ["v"],$_)
};
graphics_GPoint.__constructs__ = [graphics_GPoint.SPoint,graphics_GPoint.APoint];
var graphics_GPathElement = $hxEnums["graphics.GPathElement"] = { __ename__:"graphics.GPathElement",__constructs__:null
	,M: ($_=function(x,y) { return {_hx_index:0,x:x,y:y,__enum__:"graphics.GPathElement",toString:$estr}; },$_._hx_name="M",$_.__params__ = ["x","y"],$_)
	,L: ($_=function(x,y) { return {_hx_index:1,x:x,y:y,__enum__:"graphics.GPathElement",toString:$estr}; },$_._hx_name="L",$_.__params__ = ["x","y"],$_)
	,C: ($_=function(x1,y1,x2,y2,x,y) { return {_hx_index:2,x1:x1,y1:y1,x2:x2,y2:y2,x:x,y:y,__enum__:"graphics.GPathElement",toString:$estr}; },$_._hx_name="C",$_.__params__ = ["x1","y1","x2","y2","x","y"],$_)
	,Z: {_hx_name:"Z",_hx_index:3,__enum__:"graphics.GPathElement",toString:$estr}
};
graphics_GPathElement.__constructs__ = [graphics_GPathElement.M,graphics_GPathElement.L,graphics_GPathElement.C,graphics_GPathElement.Z];
var graphics_GSurface = function() { };
graphics_GSurface.__name__ = "graphics.GSurface";
graphics_GSurface.__isInterface__ = true;
graphics_GSurface.prototype = {
	addLayer: null
	,addItem: null
	,__class__: graphics_GSurface
};
var graphics_GSurfaceRenderer = function() { };
graphics_GSurfaceRenderer.__name__ = "graphics.GSurfaceRenderer";
graphics_GSurfaceRenderer.__isInterface__ = true;
graphics_GSurfaceRenderer.__interfaces__ = [graphics_GSurface];
graphics_GSurfaceRenderer.prototype = {
	render: null
	,__class__: graphics_GSurfaceRenderer
};
var graphics_GTools = function() { };
graphics_GTools.__name__ = "graphics.GTools";
graphics_GTools.getBoundingBox = function(items) {
	var minX = null;
	var minY = null;
	var maxX = null;
	var maxY = null;
	var _g = 0;
	while(_g < items.length) {
		var item = items[_g];
		++_g;
		var ix = null;
		var iy = null;
		var ix2 = null;
		var iy2 = null;
		switch(item._hx_index) {
		case 0:
			var _g1 = item.x1;
			var _g2 = item.y1;
			var _g3 = item.x2;
			var _g4 = item.y2;
			var _g5 = item.s;
			var halfStrokeWidth = _g5 == null ? 0 : _g5._hx_index == 1 ? _g5.width / 2 : 0;
			ix = Math.min(_g1,_g3) - halfStrokeWidth;
			iy = Math.min(_g2,_g4) - halfStrokeWidth;
			ix2 = Math.max(_g1,_g3) + halfStrokeWidth;
			iy2 = Math.max(_g2,_g4) + halfStrokeWidth;
			break;
		case 1:
			var _g6 = item.x;
			var _g7 = item.y;
			var _g8 = item.w;
			var _g9 = item.h;
			var _g10 = item.stroke;
			var halfStrokeWidth1 = _g10 == null ? 0 : _g10._hx_index == 1 ? _g10.width / 2 : 0;
			ix = Math.min(_g6,_g6 + _g8) - halfStrokeWidth1;
			iy = Math.min(_g7,_g6 + _g9) - halfStrokeWidth1;
			ix2 = Math.max(_g6,_g6 + _g8) + halfStrokeWidth1;
			iy2 = Math.max(_g7,_g7 + _g9) + halfStrokeWidth1;
			break;
		case 2:
			var _g11 = item.x;
			var _g12 = item.y;
			var _g13 = item.w;
			var _g14 = item.h;
			var _g15 = item.stroke;
			var halfStrokeWidth2 = _g15 == null ? 0 : _g15._hx_index == 1 ? _g15.width / 2 : 0;
			ix = Math.min(_g11,_g11 + _g13) - halfStrokeWidth2;
			iy = Math.min(_g12,_g11 + _g14) - halfStrokeWidth2;
			ix2 = Math.max(_g11,_g11 + _g13) + halfStrokeWidth2;
			iy2 = Math.max(_g12,_g12 + _g14) + halfStrokeWidth2;
			break;
		case 3:
			var _g16 = item.p;
			var _g17 = 0;
			while(_g17 < _g16.length) {
				var pitem = _g16[_g17];
				++_g17;
				switch(pitem._hx_index) {
				case 0:
					var _g18 = pitem.x;
					var _g19 = pitem.y;
					ix = _g18;
					iy = _g19;
					ix2 = _g18;
					iy2 = _g19;
					break;
				case 1:
					var _g20 = pitem.x;
					var _g21 = pitem.y;
					ix = _g20;
					iy = _g21;
					ix2 = _g20;
					iy2 = _g21;
					break;
				case 2:
					var _g22 = pitem.x1;
					var _g23 = pitem.y1;
					var _g24 = pitem.x2;
					var _g25 = pitem.y2;
					var _g26 = pitem.x;
					var _g27 = pitem.y;
					ix = Math.min(_g22,Math.min(_g24,_g26));
					iy = Math.min(_g23,Math.min(_g25,_g27));
					ix2 = Math.max(_g22,Math.max(_g24,_g26));
					iy2 = Math.max(_g23,Math.max(_g25,_g27));
					break;
				case 3:
					break;
				}
			}
			break;
		case 4:
			var _g28 = item.x;
			var _g29 = item.y;
			ix = _g28;
			iy = _g29;
			ix2 = _g28;
			iy2 = _g29;
			break;
		}
		if(ix != null) {
			minX = minX != null ? Math.min(minX,ix) : ix;
		}
		if(iy != null) {
			minY = minY != null ? Math.min(minY,iy) : iy;
		}
		if(ix2 != null) {
			maxX = maxX != null ? Math.max(maxX,ix2) : ix2;
		}
		if(iy2 != null) {
			maxY = maxY != null ? Math.max(maxY,iy2) : iy2;
		}
	}
	return { x : minX, y : minY, w : maxX, h : maxY};
};
graphics_GTools.getBoundingRect = function(rects) {
	var ret = rects[0];
	if(rects.length > 1) {
		var _g = 0;
		while(_g < rects.length) {
			var rect = rects[_g];
			++_g;
			ret = { x : Math.min(ret.x,rect.x), y : Math.min(ret.y,rect.y), w : Math.max(ret.w,rect.w), h : Math.max(ret.h,rect.h)};
		}
	}
	return ret;
};
graphics_GTools.getBoundingSize = function(rect) {
	return { w : rect.w - rect.x, h : rect.h - rect.y};
};
graphics_GTools.moveItems = function(items,mx,my) {
	var result = new Array(items.length);
	var _g = 0;
	var _g1 = items.length;
	while(_g < _g1) {
		var i = _g++;
		var item = items[i];
		var tmp;
		switch(item._hx_index) {
		case 0:
			tmp = graphics_GItem.Line(item.x1 + mx,item.y1 + mx,item.x2 + mx,item.y2 + my,item.s);
			break;
		case 1:
			tmp = graphics_GItem.Rect(item.x + mx,item.y + mx,item.w,item.h,item.fill,item.stroke);
			break;
		case 2:
			tmp = graphics_GItem.Ellipse(item.x + mx,item.y + mx,item.w,item.h,item.fill,item.stroke);
			break;
		case 3:
			var _g2 = item.p;
			var _g3 = item.fill;
			var _g4 = item.stroke;
			var result1 = new Array(_g2.length);
			var _g5 = 0;
			var _g11 = _g2.length;
			while(_g5 < _g11) {
				var i1 = _g5++;
				var pitem = _g2[i1];
				var tmp1;
				switch(pitem._hx_index) {
				case 0:
					tmp1 = graphics_GPathElement.M(pitem.x + mx,pitem.y + my);
					break;
				case 1:
					tmp1 = graphics_GPathElement.L(pitem.x + mx,pitem.y + my);
					break;
				case 2:
					tmp1 = graphics_GPathElement.C(pitem.x1 + mx,pitem.y1 + mx,pitem.x2 + mx,pitem.y2 + my,pitem.x + mx,pitem.y + my);
					break;
				case 3:
					tmp1 = graphics_GPathElement.Z;
					break;
				}
				result1[i1] = tmp1;
			}
			tmp = graphics_GItem.Path(result1,_g3,_g4);
			break;
		case 4:
			tmp = graphics_GItem.Text(item.x + mx,item.y + my,item.s,item.font,item.size,item.bold,item.italic);
			break;
		}
		result[i] = tmp;
	}
	return result;
};
graphics_GTools.getColor = function(c) {
	return $hxEnums[c.__enum__].__constructs__[c._hx_index]._hx_name.toLowerCase();
};
var graphics_BaseSurface = function() {
	this.layers = [];
	this.layerItems = [];
	this.layers = [graphics_GLayer.Layer(this.layerItems,null,null,null,null)];
};
graphics_BaseSurface.__name__ = "graphics.BaseSurface";
graphics_BaseSurface.prototype = {
	layers: null
	,layerItems: null
	,addLayer: function(layer) {
		this.layers.push(layer);
		this.layerItems = layer.items;
	}
	,addItem: function(item) {
		this.layerItems.push(item);
	}
	,addItems: function(items) {
		var _g = 0;
		while(_g < items.length) this.layerItems.push(items[_g++]);
	}
	,__class__: graphics_BaseSurface
};
var graphics_SvgSurface = function() {
	graphics_BaseSurface.call(this);
};
graphics_SvgSurface.__name__ = "graphics.SvgSurface";
graphics_SvgSurface.__interfaces__ = [graphics_GSurfaceRenderer];
graphics_SvgSurface.__super__ = graphics_BaseSurface;
graphics_SvgSurface.prototype = $extend(graphics_BaseSurface.prototype,{
	svg: null
	,render: function() {
		var _this = this.layers;
		var result = new Array(_this.length);
		var _g = 0;
		var _g1 = _this.length;
		while(_g < _g1) {
			var i = _g++;
			result[i] = graphics_GTools.getBoundingBox(_this[i].items);
		}
		var boundingRect = graphics_GTools.getBoundingRect(result);
		var boundingSize = graphics_GTools.getBoundingSize(boundingRect);
		this.svg = Xml.parse("<svg width=\"" + boundingSize.w + "\" height=\"" + boundingSize.h + "\"></svg>").firstElement();
		var _g = 0;
		var _g1 = this.layers;
		while(_g < _g1.length) {
			var layer = _g1[_g++];
			var eLayer = Xml.createElement("g");
			this.svg.addChild(eLayer);
			var movedItems = graphics_GTools.moveItems(layer.items,-boundingRect.x,-boundingRect.y);
			var _g2 = 0;
			while(_g2 < movedItems.length) {
				var item = movedItems[_g2];
				++_g2;
				switch(item._hx_index) {
				case 0:
					var _g3 = item.x1;
					var _g4 = item.y1;
					var _g5 = item.x2;
					var _g6 = item.y2;
					var _g7 = item.s;
					var line = Xml.createElement("line");
					line.set("x1",_g3 == null ? "null" : "" + _g3);
					line.set("y1",_g4 == null ? "null" : "" + _g4);
					line.set("x2",_g5 == null ? "null" : "" + _g5);
					line.set("y2",_g6 == null ? "null" : "" + _g6);
					var style = "";
					if(_g7 != null) {
						switch(_g7._hx_index) {
						case 0:
							style = " stroke:none; ";
							break;
						case 1:
							var _g8 = _g7.width;
							style = "" + ("stroke: " + graphics_GTools.getColor(_g7.c) + "; stroke-width: " + (_g8 == null ? "null" : "" + _g8) + ";");
							break;
						}
					}
					if(style != "") {
						line.set("style",style);
					}
					eLayer.addChild(line);
					break;
				case 1:
					var _g9 = item.x;
					var _g10 = item.y;
					var _g11 = item.w;
					var _g12 = item.h;
					var _g13 = item.fill;
					var _g14 = item.stroke;
					var rect = Xml.createElement("rect");
					rect.set("x",_g9 == null ? "null" : "" + _g9);
					rect.set("y",_g10 == null ? "null" : "" + _g10);
					rect.set("width",_g11 == null ? "null" : "" + _g11);
					rect.set("height",_g12 == null ? "null" : "" + _g12);
					var style1 = "";
					if(_g14 != null) {
						switch(_g14._hx_index) {
						case 0:
							style1 = " stroke:none; ";
							break;
						case 1:
							var _g15 = _g14.width;
							style1 = "" + (" stroke: " + graphics_GTools.getColor(_g14.c) + "; stroke-width: " + (_g15 == null ? "null" : "" + _g15) + ";");
							break;
						}
					}
					if(_g13 != null) {
						switch(_g13._hx_index) {
						case 0:
							style1 += " fill:none; ";
							break;
						case 1:
							style1 += " fill: " + graphics_GTools.getColor(_g13.c) + ";";
							break;
						}
					}
					if(style1 != "") {
						rect.set("style",style1);
					}
					eLayer.addChild(rect);
					break;
				case 2:
					var _g16 = item.w;
					var _g17 = item.h;
					var _g18 = item.fill;
					var _g19 = item.stroke;
					var item1 = Xml.createElement("ellipse");
					item1.set("cx",Std.string(item.x + _g16 / 2));
					item1.set("cy",Std.string(item.y + _g17 / 2));
					item1.set("rx",Std.string(_g16 / 2));
					item1.set("ry",Std.string(_g17 / 2));
					var style2 = "";
					if(_g19 != null) {
						switch(_g19._hx_index) {
						case 0:
							style2 = " stroke:none; ";
							break;
						case 1:
							var _g20 = _g19.width;
							style2 = "" + (" stroke: " + graphics_GTools.getColor(_g19.c) + "; stroke-width: " + (_g20 == null ? "null" : "" + _g20) + ";");
							break;
						}
					}
					if(_g18 != null) {
						switch(_g18._hx_index) {
						case 0:
							style2 += " fill:none; ";
							break;
						case 1:
							style2 += " fill: " + graphics_GTools.getColor(_g18.c) + ";";
							break;
						}
					}
					if(style2 != "") {
						item1.set("style",style2);
					}
					eLayer.addChild(item1);
					break;
				default:
				}
			}
		}
		return this.svg;
	}
	,__class__: graphics_SvgSurface
});
var graphics_CanvasSurface = function() {
	graphics_BaseSurface.call(this);
};
graphics_CanvasSurface.__name__ = "graphics.CanvasSurface";
graphics_CanvasSurface.__interfaces__ = [graphics_GSurfaceRenderer];
graphics_CanvasSurface.__super__ = graphics_BaseSurface;
graphics_CanvasSurface.prototype = $extend(graphics_BaseSurface.prototype,{
	render: function() {
		var _this = this.layers;
		var result = new Array(_this.length);
		var _g = 0;
		var _g1 = _this.length;
		while(_g < _g1) {
			var i = _g++;
			result[i] = graphics_GTools.getBoundingBox(_this[i].items);
		}
		var boundingRect = graphics_GTools.getBoundingRect(result);
		var boundingSize = graphics_GTools.getBoundingSize(boundingRect);
		var canvas = window.document.createElement("canvas");
		canvas.setAttribute("width",boundingSize.w == null ? "null" : "" + boundingSize.w);
		canvas.setAttribute("height",boundingSize.h == null ? "null" : "" + boundingSize.h);
		canvas.style.width = boundingSize.w + "px";
		canvas.style.height = boundingSize.h + "px";
		var ctx = canvas.getContext("2d",null);
		var _g = 0;
		var _g1 = this.layers;
		while(_g < _g1.length) {
			var movedItems = graphics_GTools.moveItems(_g1[_g++].items,-boundingRect.x,-boundingRect.y);
			var _g2 = 0;
			while(_g2 < movedItems.length) {
				var item = movedItems[_g2];
				++_g2;
				switch(item._hx_index) {
				case 0:
					var _g3 = item.s;
					ctx.beginPath();
					ctx.moveTo(item.x1,item.y1);
					ctx.lineTo(item.x2,item.y2);
					if(_g3 != null) {
						switch(_g3._hx_index) {
						case 0:
							break;
						case 1:
							ctx.strokeStyle = graphics_GTools.getColor(_g3.c);
							ctx.lineWidth = _g3.width;
							ctx.stroke();
							break;
						}
					}
					break;
				case 1:
					var _g4 = item.fill;
					var _g5 = item.stroke;
					ctx.beginPath();
					ctx.rect(item.x,item.y,item.w,item.h);
					switch(_g4._hx_index) {
					case 0:
						break;
					case 1:
						ctx.fillStyle = graphics_GTools.getColor(_g4.c);
						ctx.fill();
						break;
					}
					if(_g5 != null) {
						switch(_g5._hx_index) {
						case 0:
							break;
						case 1:
							ctx.strokeStyle = graphics_GTools.getColor(_g5.c);
							ctx.lineWidth = _g5.width;
							ctx.stroke();
							break;
						}
					}
					break;
				case 2:
					var _g6 = item.w;
					var _g7 = item.h;
					var _g8 = item.fill;
					var _g9 = item.stroke;
					ctx.beginPath();
					ctx.ellipse(item.x + _g6 / 2,item.y + _g7 / 2,_g6 / 2,_g7 / 2,Math.PI / 4,0,2 * Math.PI);
					switch(_g8._hx_index) {
					case 0:
						break;
					case 1:
						var _g10 = _g8.c;
						haxe_Log.trace(graphics_GTools.getColor(_g10),{ fileName : "src/graphics/SimpleGraphics.hx", lineNumber : 408, className : "graphics.CanvasSurface", methodName : "render"});
						ctx.fillStyle = graphics_GTools.getColor(_g10);
						ctx.fill();
						break;
					}
					if(_g9 != null) {
						switch(_g9._hx_index) {
						case 0:
							break;
						case 1:
							ctx.strokeStyle = graphics_GTools.getColor(_g9.c);
							ctx.lineWidth = _g9.width;
							ctx.stroke();
							break;
						}
					}
					break;
				default:
				}
			}
		}
		return canvas;
	}
	,__class__: graphics_CanvasSurface
});
var haxe_StackItem = $hxEnums["haxe.StackItem"] = { __ename__:"haxe.StackItem",__constructs__:null
	,CFunction: {_hx_name:"CFunction",_hx_index:0,__enum__:"haxe.StackItem",toString:$estr}
	,Module: ($_=function(m) { return {_hx_index:1,m:m,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Module",$_.__params__ = ["m"],$_)
	,FilePos: ($_=function(s,file,line,column) { return {_hx_index:2,s:s,file:file,line:line,column:column,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="FilePos",$_.__params__ = ["s","file","line","column"],$_)
	,Method: ($_=function(classname,method) { return {_hx_index:3,classname:classname,method:method,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="Method",$_.__params__ = ["classname","method"],$_)
	,LocalFunction: ($_=function(v) { return {_hx_index:4,v:v,__enum__:"haxe.StackItem",toString:$estr}; },$_._hx_name="LocalFunction",$_.__params__ = ["v"],$_)
};
haxe_StackItem.__constructs__ = [haxe_StackItem.CFunction,haxe_StackItem.Module,haxe_StackItem.FilePos,haxe_StackItem.Method,haxe_StackItem.LocalFunction];
var haxe_CallStack = {};
haxe_CallStack.callStack = function() {
	return haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.callStack());
};
haxe_CallStack.exceptionStack = function(fullStack) {
	if(fullStack == null) {
		fullStack = false;
	}
	var eStack = haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.exceptionStack());
	return fullStack ? eStack : haxe_CallStack.subtract(eStack,haxe_CallStack.callStack());
};
haxe_CallStack.toString = function(stack) {
	var b = new StringBuf();
	var _g = 0;
	var _g1 = stack;
	while(_g < _g1.length) {
		var s = _g1[_g++];
		b.b += "\nCalled from ";
		haxe_CallStack.itemToString(b,s);
	}
	return b.b;
};
haxe_CallStack.subtract = function(this1,stack) {
	var startIndex = -1;
	var i = -1;
	while(++i < this1.length) {
		var _g = 0;
		var _g1 = stack.length;
		while(_g < _g1) if(haxe_CallStack.equalItems(this1[i],stack[_g++])) {
			if(startIndex < 0) {
				startIndex = i;
			}
			++i;
			if(i >= this1.length) {
				break;
			}
		} else {
			startIndex = -1;
		}
		if(startIndex >= 0) {
			break;
		}
	}
	if(startIndex >= 0) {
		return this1.slice(0,startIndex);
	} else {
		return this1;
	}
};
haxe_CallStack.equalItems = function(item1,item2) {
	if(item1 == null) {
		if(item2 == null) {
			return true;
		} else {
			return false;
		}
	} else {
		switch(item1._hx_index) {
		case 0:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 0) {
				return true;
			} else {
				return false;
			}
			break;
		case 1:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 1) {
				return item1.m == item2.m;
			} else {
				return false;
			}
			break;
		case 2:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 2) {
				if(item1.file == item2.file && item1.line == item2.line && item1.column == item2.column) {
					return haxe_CallStack.equalItems(item1.s,item2.s);
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		case 3:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 3) {
				if(item1.classname == item2.classname) {
					return item1.method == item2.method;
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		case 4:
			if(item2 == null) {
				return false;
			} else if(item2._hx_index == 4) {
				return item1.v == item2.v;
			} else {
				return false;
			}
			break;
		}
	}
};
haxe_CallStack.itemToString = function(b,s) {
	switch(s._hx_index) {
	case 0:
		b.b += "a C function";
		break;
	case 1:
		var _g = s.m;
		b.b = (b.b += "module ") + (_g == null ? "null" : "" + _g);
		break;
	case 2:
		var _g = s.s;
		var _g1 = s.file;
		var _g2 = s.line;
		var _g3 = s.column;
		if(_g != null) {
			haxe_CallStack.itemToString(b,_g);
			b.b += " (";
		}
		b.b = (b.b += _g1 == null ? "null" : "" + _g1) + " line ";
		b.b += _g2 == null ? "null" : "" + _g2;
		if(_g3 != null) {
			b.b = (b.b += " column ") + (_g3 == null ? "null" : "" + _g3);
		}
		if(_g != null) {
			b.b += ")";
		}
		break;
	case 3:
		var _g = s.classname;
		var _g1 = s.method;
		b.b = (b.b += Std.string(_g == null ? "<unknown>" : _g)) + ".";
		b.b += _g1 == null ? "null" : "" + _g1;
		break;
	case 4:
		var _g = s.v;
		b.b = (b.b += "local function #") + (_g == null ? "null" : "" + _g);
		break;
	}
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = "haxe.IMap";
haxe_IMap.__isInterface__ = true;
haxe_IMap.prototype = {
	get: null
	,keys: null
	,__class__: haxe_IMap
};
var haxe_Exception = function(message,previous,native) {
	Error.call(this,message);
	this.message = message;
	this.__previousException = previous;
	this.__nativeException = native != null ? native : this;
	this.__skipStack = 0;
	var old = Error.prepareStackTrace;
	Error.prepareStackTrace = function(e) { return e.stack; }
	if(((native) instanceof Error)) {
		this.stack = native.stack;
	} else {
		var e = null;
		if(Error.captureStackTrace) {
			Error.captureStackTrace(this,haxe_Exception);
			e = this;
		} else {
			e = new Error();
			if(typeof(e.stack) == "undefined") {
				try { throw e; } catch(_) {}
				this.__skipStack++;
			}
		}
		this.stack = e.stack;
	}
	Error.prepareStackTrace = old;
};
haxe_Exception.__name__ = "haxe.Exception";
haxe_Exception.caught = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value;
	} else if(((value) instanceof Error)) {
		return new haxe_Exception(value.message,null,value);
	} else {
		return new haxe_ValueException(value,null,value);
	}
};
haxe_Exception.thrown = function(value) {
	if(((value) instanceof haxe_Exception)) {
		return value.get_native();
	} else if(((value) instanceof Error)) {
		return value;
	} else {
		var e = new haxe_ValueException(value);
		e.__skipStack++;
		return e;
	}
};
haxe_Exception.__super__ = Error;
haxe_Exception.prototype = $extend(Error.prototype,{
	__skipStack: null
	,__nativeException: null
	,__previousException: null
	,unwrap: function() {
		return this.__nativeException;
	}
	,__shiftStack: function() {
		this.__skipStack++;
	}
	,get_native: function() {
		return this.__nativeException;
	}
	,get_stack: function() {
		var _g = this.__exceptionStack;
		if(_g == null) {
			var value = haxe_NativeStackTrace.toHaxe(haxe_NativeStackTrace.normalize(this.stack),this.__skipStack);
			this.setProperty("__exceptionStack",value);
			return value;
		} else {
			return _g;
		}
	}
	,setProperty: function(name,value) {
		try {
			Object.defineProperty(this,name,{ value : value});
		} catch( _g ) {
			this[name] = value;
		}
	}
	,__class__: haxe_Exception
	,__properties__: {get_native:"get_native",get_stack:"get_stack"}
});
var haxe_Log = function() { };
haxe_Log.__name__ = "haxe.Log";
haxe_Log.formatOutput = function(v,infos) {
	var str = Std.string(v);
	if(infos == null) {
		return str;
	}
	var pstr = infos.fileName + ":" + infos.lineNumber;
	if(infos.customParams != null) {
		var _g = 0;
		var _g1 = infos.customParams;
		while(_g < _g1.length) str += ", " + Std.string(_g1[_g++]);
	}
	return pstr + ": " + str;
};
haxe_Log.trace = function(v,infos) {
	var str = haxe_Log.formatOutput(v,infos);
	if(typeof(console) != "undefined" && console.log != null) {
		console.log(str);
	}
};
var haxe_NativeStackTrace = function() { };
haxe_NativeStackTrace.__name__ = "haxe.NativeStackTrace";
haxe_NativeStackTrace.saveStack = function(e) {
	haxe_NativeStackTrace.lastError = e;
};
haxe_NativeStackTrace.callStack = function() {
	var e = new Error("");
	var stack = haxe_NativeStackTrace.tryHaxeStack(e);
	if(typeof(stack) == "undefined") {
		try {
			throw e;
		} catch( _g ) {
		}
		stack = e.stack;
	}
	return haxe_NativeStackTrace.normalize(stack,2);
};
haxe_NativeStackTrace.exceptionStack = function() {
	return haxe_NativeStackTrace.normalize(haxe_NativeStackTrace.tryHaxeStack(haxe_NativeStackTrace.lastError));
};
haxe_NativeStackTrace.toHaxe = function(s,skip) {
	if(skip == null) {
		skip = 0;
	}
	if(s == null) {
		return [];
	} else if(typeof(s) == "string") {
		var stack = s.split("\n");
		if(stack[0] == "Error") {
			stack.shift();
		}
		var m = [];
		var _g = 0;
		var _g1 = stack.length;
		while(_g < _g1) {
			var i = _g++;
			if(skip > i) {
				continue;
			}
			var line = stack[i];
			var matched = line.match(/^    at ([A-Za-z0-9_. ]+) \(([^)]+):([0-9]+):([0-9]+)\)$/);
			if(matched != null) {
				var path = matched[1].split(".");
				if(path[0] == "$hxClasses") {
					path.shift();
				}
				var meth = path.pop();
				var file = matched[2];
				var line1 = Std.parseInt(matched[3]);
				var column = Std.parseInt(matched[4]);
				m.push(haxe_StackItem.FilePos(meth == "Anonymous function" ? haxe_StackItem.LocalFunction() : meth == "Global code" ? null : haxe_StackItem.Method(path.join("."),meth),file,line1,column));
			} else {
				m.push(haxe_StackItem.Module(StringTools.trim(line)));
			}
		}
		return m;
	} else if(skip > 0 && Array.isArray(s)) {
		return s.slice(skip);
	} else {
		return s;
	}
};
haxe_NativeStackTrace.tryHaxeStack = function(e) {
	if(e == null) {
		return [];
	}
	var oldValue = Error.prepareStackTrace;
	Error.prepareStackTrace = haxe_NativeStackTrace.prepareHxStackTrace;
	Error.prepareStackTrace = oldValue;
	return e.stack;
};
haxe_NativeStackTrace.prepareHxStackTrace = function(e,callsites) {
	var stack = [];
	var _g = 0;
	while(_g < callsites.length) {
		var site = callsites[_g];
		++_g;
		if(haxe_NativeStackTrace.wrapCallSite != null) {
			site = haxe_NativeStackTrace.wrapCallSite(site);
		}
		var method = null;
		var fullName = site.getFunctionName();
		if(fullName != null) {
			var idx = fullName.lastIndexOf(".");
			if(idx >= 0) {
				method = haxe_StackItem.Method(fullName.substring(0,idx),fullName.substring(idx + 1));
			} else {
				method = haxe_StackItem.Method(null,fullName);
			}
		}
		var fileName = site.getFileName();
		var fileAddr = fileName == null ? -1 : fileName.indexOf("file:");
		if(haxe_NativeStackTrace.wrapCallSite != null && fileAddr > 0) {
			fileName = fileName.substring(fileAddr + 6);
		}
		stack.push(haxe_StackItem.FilePos(method,fileName,site.getLineNumber(),site.getColumnNumber()));
	}
	return stack;
};
haxe_NativeStackTrace.normalize = function(stack,skipItems) {
	if(skipItems == null) {
		skipItems = 0;
	}
	if(Array.isArray(stack) && skipItems > 0) {
		return stack.slice(skipItems);
	} else if(typeof(stack) == "string") {
		switch(stack.substring(0,6)) {
		case "Error\n":case "Error:":
			++skipItems;
			break;
		default:
		}
		return haxe_NativeStackTrace.skipLines(stack,skipItems);
	} else {
		return stack;
	}
};
haxe_NativeStackTrace.skipLines = function(stack,skip,pos) {
	if(pos == null) {
		pos = 0;
	}
	while(true) if(skip > 0) {
		pos = stack.indexOf("\n",pos);
		if(pos < 0) {
			return "";
		} else {
			skip = --skip;
			pos += 1;
			continue;
		}
	} else {
		return stack.substring(pos);
	}
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = "haxe.Timer";
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	id: null
	,stop: function() {
		if(this.id == null) {
			return;
		}
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
	,__class__: haxe_Timer
};
var haxe_ValueException = function(value,previous,native) {
	haxe_Exception.call(this,String(value),previous,native);
	this.value = value;
	this.__skipStack++;
};
haxe_ValueException.__name__ = "haxe.ValueException";
haxe_ValueException.__super__ = haxe_Exception;
haxe_ValueException.prototype = $extend(haxe_Exception.prototype,{
	value: null
	,unwrap: function() {
		return this.value;
	}
	,__class__: haxe_ValueException
});
var haxe_ds_List = function() {
	this.length = 0;
};
haxe_ds_List.__name__ = "haxe.ds.List";
haxe_ds_List.prototype = {
	h: null
	,q: null
	,length: null
	,add: function(item) {
		var x = new haxe_ds__$List_ListNode(item,null);
		if(this.h == null) {
			this.h = x;
		} else {
			this.q.next = x;
		}
		this.q = x;
		this.length++;
	}
	,remove: function(v) {
		var prev = null;
		var l = this.h;
		while(l != null) {
			if(l.item == v) {
				if(prev == null) {
					this.h = l.next;
				} else {
					prev.next = l.next;
				}
				if(this.q == l) {
					this.q = prev;
				}
				this.length--;
				return true;
			}
			prev = l;
			l = l.next;
		}
		return false;
	}
	,iterator: function() {
		return new haxe_ds__$List_ListIterator(this.h);
	}
	,__class__: haxe_ds_List
};
var haxe_ds__$List_ListNode = function(item,next) {
	this.item = item;
	this.next = next;
};
haxe_ds__$List_ListNode.__name__ = "haxe.ds._List.ListNode";
haxe_ds__$List_ListNode.prototype = {
	item: null
	,next: null
	,__class__: haxe_ds__$List_ListNode
};
var haxe_ds__$List_ListIterator = function(head) {
	this.head = head;
};
haxe_ds__$List_ListIterator.__name__ = "haxe.ds._List.ListIterator";
haxe_ds__$List_ListIterator.prototype = {
	head: null
	,hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		var val = this.head.item;
		this.head = this.head.next;
		return val;
	}
	,__class__: haxe_ds__$List_ListIterator
};
var haxe_ds_StringMap = function() {
	this.h = Object.create(null);
};
haxe_ds_StringMap.__name__ = "haxe.ds.StringMap";
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	h: null
	,get: function(key) {
		return this.h[key];
	}
	,keys: function() {
		return new haxe_ds__$StringMap_StringMapKeyIterator(this.h);
	}
	,__class__: haxe_ds_StringMap
};
var haxe_ds__$StringMap_StringMapKeyIterator = function(h) {
	this.h = h;
	this.keys = Object.keys(h);
	this.length = this.keys.length;
	this.current = 0;
};
haxe_ds__$StringMap_StringMapKeyIterator.__name__ = "haxe.ds._StringMap.StringMapKeyIterator";
haxe_ds__$StringMap_StringMapKeyIterator.prototype = {
	h: null
	,keys: null
	,length: null
	,current: null
	,hasNext: function() {
		return this.current < this.length;
	}
	,next: function() {
		return this.keys[this.current++];
	}
	,__class__: haxe_ds__$StringMap_StringMapKeyIterator
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	this.b.bufferValue = data;
	data.hxBytes = this;
	data.bytes = this.b;
};
haxe_io_Bytes.__name__ = "haxe.io.Bytes";
haxe_io_Bytes.prototype = {
	length: null
	,b: null
	,__class__: haxe_io_Bytes
};
var haxe_iterators_ArrayIterator = function(array) {
	this.current = 0;
	this.array = array;
};
haxe_iterators_ArrayIterator.__name__ = "haxe.iterators.ArrayIterator";
haxe_iterators_ArrayIterator.prototype = {
	array: null
	,current: null
	,hasNext: function() {
		return this.current < this.array.length;
	}
	,next: function() {
		return this.array[this.current++];
	}
	,__class__: haxe_iterators_ArrayIterator
};
var haxe_rtti_Meta = function() { };
haxe_rtti_Meta.__name__ = "haxe.rtti.Meta";
haxe_rtti_Meta.getMeta = function(t) {
	return t.__meta__;
};
haxe_rtti_Meta.getFields = function(t) {
	var meta = haxe_rtti_Meta.getMeta(t);
	if(meta == null || meta.fields == null) {
		return { };
	} else {
		return meta.fields;
	}
};
var haxe_xml_XmlParserException = function(message,xml,position) {
	this.xml = xml;
	this.message = message;
	this.position = position;
	this.lineNumber = 1;
	this.positionAtLine = 0;
	var _g = 0;
	while(_g < position) {
		var c = xml.charCodeAt(_g++);
		if(c == 10) {
			this.lineNumber++;
			this.positionAtLine = 0;
		} else if(c != 13) {
			this.positionAtLine++;
		}
	}
};
haxe_xml_XmlParserException.__name__ = "haxe.xml.XmlParserException";
haxe_xml_XmlParserException.prototype = {
	message: null
	,lineNumber: null
	,positionAtLine: null
	,position: null
	,xml: null
	,toString: function() {
		var c = js_Boot.getClass(this);
		return c.__name__ + ": " + this.message + " at line " + this.lineNumber + " char " + this.positionAtLine;
	}
	,__class__: haxe_xml_XmlParserException
};
var haxe_xml_Parser = function() { };
haxe_xml_Parser.__name__ = "haxe.xml.Parser";
haxe_xml_Parser.parse = function(str,strict) {
	if(strict == null) {
		strict = false;
	}
	var doc = Xml.createDocument();
	haxe_xml_Parser.doParse(str,strict,0,doc);
	return doc;
};
haxe_xml_Parser.doParse = function(str,strict,p,parent) {
	if(p == null) {
		p = 0;
	}
	var xml = null;
	var state = 1;
	var next = 1;
	var aname = null;
	var start = 0;
	var nsubs = 0;
	var nbrackets = 0;
	var buf = new StringBuf();
	var escapeNext = 1;
	var attrValQuote = -1;
	while(p < str.length) {
		var c = str.charCodeAt(p);
		switch(state) {
		case 0:
			switch(c) {
			case 9:case 10:case 13:case 32:
				break;
			default:
				state = next;
				continue;
			}
			break;
		case 1:
			if(c == 60) {
				state = 0;
				next = 2;
			} else {
				start = p;
				state = 13;
				continue;
			}
			break;
		case 2:
			switch(c) {
			case 33:
				if(str.charCodeAt(p + 1) == 91) {
					p += 2;
					if(HxOverrides.substr(str,p,6).toUpperCase() != "CDATA[") {
						throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected <![CDATA[",str,p));
					}
					p += 5;
					state = 17;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) == 68 || str.charCodeAt(p + 1) == 100) {
					if(HxOverrides.substr(str,p + 2,6).toUpperCase() != "OCTYPE") {
						throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected <!DOCTYPE",str,p));
					}
					p += 8;
					state = 16;
					start = p + 1;
				} else if(str.charCodeAt(p + 1) != 45 || str.charCodeAt(p + 2) != 45) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected <!--",str,p));
				} else {
					p += 2;
					state = 15;
					start = p + 1;
				}
				break;
			case 47:
				if(parent == null) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected node name",str,p));
				}
				start = p + 1;
				state = 0;
				next = 10;
				break;
			case 63:
				state = 14;
				start = p;
				break;
			default:
				state = 3;
				start = p;
				continue;
			}
			break;
		case 3:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(p == start) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected node name",str,p));
				}
				xml = Xml.createElement(HxOverrides.substr(str,start,p - start));
				parent.addChild(xml);
				++nsubs;
				state = 0;
				next = 4;
				continue;
			}
			break;
		case 4:
			switch(c) {
			case 47:
				state = 11;
				break;
			case 62:
				state = 9;
				break;
			default:
				state = 5;
				start = p;
				continue;
			}
			break;
		case 5:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected attribute name",str,p));
				}
				aname = HxOverrides.substr(str,start,p - start);
				if(xml.exists(aname)) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Duplicate attribute [" + aname + "]",str,p));
				}
				state = 0;
				next = 6;
				continue;
			}
			break;
		case 6:
			if(c == 61) {
				state = 0;
				next = 7;
			} else {
				throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected =",str,p));
			}
			break;
		case 7:
			switch(c) {
			case 34:case 39:
				buf = new StringBuf();
				state = 8;
				start = p + 1;
				attrValQuote = c;
				break;
			default:
				throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected \"",str,p));
			}
			break;
		case 8:
			switch(c) {
			case 38:
				var len = p - start;
				buf.b += len == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len);
				state = 18;
				escapeNext = 8;
				start = p + 1;
				break;
			case 60:case 62:
				if(strict) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Invalid unescaped " + String.fromCodePoint(c) + " in attribute value",str,p));
				} else if(c == attrValQuote) {
					var len1 = p - start;
					buf.b += len1 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len1);
					var val = buf.b;
					buf = new StringBuf();
					xml.set(aname,val);
					state = 0;
					next = 4;
				}
				break;
			default:
				if(c == attrValQuote) {
					var len2 = p - start;
					buf.b += len2 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len2);
					var val1 = buf.b;
					buf = new StringBuf();
					xml.set(aname,val1);
					state = 0;
					next = 4;
				}
			}
			break;
		case 9:
			p = haxe_xml_Parser.doParse(str,strict,p,xml);
			start = p;
			state = 1;
			break;
		case 10:
			if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45)) {
				if(start == p) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected node name",str,p));
				}
				var v = HxOverrides.substr(str,start,p - start);
				if(parent == null || parent.nodeType != 0) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Unexpected </" + v + ">, tag is not open",str,p));
				}
				if(parent.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element but found " + (parent.nodeType == null ? "null" : XmlType.toString(parent.nodeType)));
				}
				if(v != parent.nodeName) {
					if(parent.nodeType != Xml.Element) {
						throw haxe_Exception.thrown("Bad node type, expected Element but found " + (parent.nodeType == null ? "null" : XmlType.toString(parent.nodeType)));
					}
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected </" + parent.nodeName + ">",str,p));
				}
				state = 0;
				next = 12;
				continue;
			}
			break;
		case 11:
			if(c == 62) {
				state = 1;
			} else {
				throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected >",str,p));
			}
			break;
		case 12:
			if(c == 62) {
				if(nsubs == 0) {
					parent.addChild(Xml.createPCData(""));
				}
				return p;
			} else {
				throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Expected >",str,p));
			}
			break;
		case 13:
			if(c == 60) {
				var len3 = p - start;
				buf.b += len3 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len3);
				var child = Xml.createPCData(buf.b);
				buf = new StringBuf();
				parent.addChild(child);
				++nsubs;
				state = 0;
				next = 2;
			} else if(c == 38) {
				var len4 = p - start;
				buf.b += len4 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len4);
				state = 18;
				escapeNext = 13;
				start = p + 1;
			}
			break;
		case 14:
			if(c == 63 && str.charCodeAt(p + 1) == 62) {
				++p;
				parent.addChild(Xml.createProcessingInstruction(HxOverrides.substr(str,start + 1,p - start - 2)));
				++nsubs;
				state = 1;
			}
			break;
		case 15:
			if(c == 45 && str.charCodeAt(p + 1) == 45 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createComment(HxOverrides.substr(str,start,p - start)));
				++nsubs;
				p += 2;
				state = 1;
			}
			break;
		case 16:
			if(c == 91) {
				++nbrackets;
			} else if(c == 93) {
				--nbrackets;
			} else if(c == 62 && nbrackets == 0) {
				parent.addChild(Xml.createDocType(HxOverrides.substr(str,start,p - start)));
				++nsubs;
				state = 1;
			}
			break;
		case 17:
			if(c == 93 && str.charCodeAt(p + 1) == 93 && str.charCodeAt(p + 2) == 62) {
				parent.addChild(Xml.createCData(HxOverrides.substr(str,start,p - start)));
				++nsubs;
				p += 2;
				state = 1;
			}
			break;
		case 18:
			if(c == 59) {
				var s = HxOverrides.substr(str,start,p - start);
				if(s.charCodeAt(0) == 35) {
					var c1 = s.charCodeAt(1) == 120 ? Std.parseInt("0" + HxOverrides.substr(s,1,s.length - 1)) : Std.parseInt(HxOverrides.substr(s,1,s.length - 1));
					buf.b += String.fromCodePoint(c1);
				} else if(!Object.prototype.hasOwnProperty.call(haxe_xml_Parser.escapes.h,s)) {
					if(strict) {
						throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Undefined entity: " + s,str,p));
					}
					buf.b += Std.string("&" + s + ";");
				} else {
					buf.b += Std.string(haxe_xml_Parser.escapes.h[s]);
				}
				start = p + 1;
				state = escapeNext;
			} else if(!(c >= 97 && c <= 122 || c >= 65 && c <= 90 || c >= 48 && c <= 57 || c == 58 || c == 46 || c == 95 || c == 45) && c != 35) {
				if(strict) {
					throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Invalid character in entity: " + String.fromCodePoint(c),str,p));
				}
				buf.b += String.fromCodePoint(38);
				var len5 = p - start;
				buf.b += len5 == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len5);
				--p;
				start = p + 1;
				state = escapeNext;
			}
			break;
		}
		++p;
	}
	if(state == 1) {
		start = p;
		state = 13;
	}
	if(state == 13) {
		if(parent.nodeType == 0) {
			if(parent.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element but found " + (parent.nodeType == null ? "null" : XmlType.toString(parent.nodeType)));
			}
			throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Unclosed node <" + parent.nodeName + ">",str,p));
		}
		if(p != start || nsubs == 0) {
			var len = p - start;
			buf.b += len == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len);
			parent.addChild(Xml.createPCData(buf.b));
			++nsubs;
		}
		return p;
	}
	if(!strict && state == 18 && escapeNext == 13) {
		buf.b += String.fromCodePoint(38);
		var len = p - start;
		buf.b += len == null ? HxOverrides.substr(str,start,null) : HxOverrides.substr(str,start,len);
		parent.addChild(Xml.createPCData(buf.b));
		++nsubs;
		return p;
	}
	throw haxe_Exception.thrown(new haxe_xml_XmlParserException("Unexpected end",str,p));
};
var haxe_xml_Printer = function(pretty) {
	this.output = new StringBuf();
	this.pretty = pretty;
};
haxe_xml_Printer.__name__ = "haxe.xml.Printer";
haxe_xml_Printer.print = function(xml,pretty) {
	if(pretty == null) {
		pretty = false;
	}
	var printer = new haxe_xml_Printer(pretty);
	printer.writeNode(xml,"");
	return printer.output.b;
};
haxe_xml_Printer.prototype = {
	output: null
	,pretty: null
	,writeNode: function(value,tabs) {
		switch(value.nodeType) {
		case 0:
			this.output.b += Std.string(tabs + "<");
			if(value.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string(value.nodeName);
			var attribute = value.attributes();
			while(attribute.hasNext()) {
				var attribute1 = attribute.next();
				this.output.b += Std.string(" " + attribute1 + "=\"");
				var input = StringTools.htmlEscape(value.get(attribute1),true);
				this.output.b += Std.string(input);
				this.output.b += "\"";
			}
			if(this.hasChildren(value)) {
				this.output.b += ">";
				if(this.pretty) {
					this.output.b += "\n";
				}
				if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
				}
				var _this = value.children;
				var _g_current = 0;
				while(_g_current < _this.length) this.writeNode(_this[_g_current++],this.pretty ? tabs + "\t" : tabs);
				this.output.b += Std.string(tabs + "</");
				if(value.nodeType != Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, expected Element but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
				}
				this.output.b += Std.string(value.nodeName);
				this.output.b += ">";
				if(this.pretty) {
					this.output.b += "\n";
				}
			} else {
				this.output.b += "/>";
				if(this.pretty) {
					this.output.b += "\n";
				}
			}
			break;
		case 1:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			var nodeValue = value.nodeValue;
			if(nodeValue.length != 0) {
				var input = tabs + StringTools.htmlEscape(nodeValue);
				this.output.b += Std.string(input);
				if(this.pretty) {
					this.output.b += "\n";
				}
			}
			break;
		case 2:
			this.output.b += Std.string(tabs + "<![CDATA[");
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string(value.nodeValue);
			this.output.b += "]]>";
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 3:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			var commentContent = value.nodeValue;
			var _this_r = new RegExp("[\n\r\t]+","g".split("u").join(""));
			commentContent = commentContent.replace(_this_r,"");
			commentContent = "<!--" + commentContent + "-->";
			this.output.b += tabs == null ? "null" : "" + tabs;
			this.output.b += Std.string(StringTools.trim(commentContent));
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 4:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string("<!DOCTYPE " + value.nodeValue + ">");
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 5:
			if(value.nodeType == Xml.Document || value.nodeType == Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, unexpected " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			this.output.b += Std.string("<?" + value.nodeValue + "?>");
			if(this.pretty) {
				this.output.b += "\n";
			}
			break;
		case 6:
			if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) {
				throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
			}
			var _this = value.children;
			var _g_current = 0;
			while(_g_current < _this.length) this.writeNode(_this[_g_current++],tabs);
			break;
		}
	}
	,hasChildren: function(value) {
		if(value.nodeType != Xml.Document && value.nodeType != Xml.Element) {
			throw haxe_Exception.thrown("Bad node type, expected Element or Document but found " + (value.nodeType == null ? "null" : XmlType.toString(value.nodeType)));
		}
		var _this = value.children;
		var _g_current = 0;
		while(_g_current < _this.length) {
			var child = _this[_g_current++];
			switch(child.nodeType) {
			case 0:case 1:
				return true;
			case 2:case 3:
				if(child.nodeType == Xml.Document || child.nodeType == Xml.Element) {
					throw haxe_Exception.thrown("Bad node type, unexpected " + (child.nodeType == null ? "null" : XmlType.toString(child.nodeType)));
				}
				if(StringTools.ltrim(child.nodeValue).length != 0) {
					return true;
				}
				break;
			default:
			}
		}
		return false;
	}
	,__class__: haxe_xml_Printer
};
var js_Boot = function() { };
js_Boot.__name__ = "js.Boot";
js_Boot.getClass = function(o) {
	if(o == null) {
		return null;
	} else if(((o) instanceof Array)) {
		return Array;
	} else {
		var cl = o.__class__;
		if(cl != null) {
			return cl;
		}
		var name = js_Boot.__nativeClassName(o);
		if(name != null) {
			return js_Boot.__resolveNativeClass(name);
		}
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var con = e.__constructs__[o._hx_index];
			var n = con._hx_name;
			if(con.__params__) {
				s = s + "\t";
				return n + "(" + ((function($this) {
					var $r;
					var _g = [];
					{
						var _g1 = 0;
						var _g2 = con.__params__;
						while(true) {
							if(!(_g1 < _g2.length)) {
								break;
							}
							var p = _g2[_g1];
							_g1 = _g1 + 1;
							_g.push(js_Boot.__string_rec(o[p],s));
						}
					}
					$r = _g;
					return $r;
				}(this))).join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g = 0;
			var _g1 = o.length;
			while(_g < _g1) {
				var i = _g++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( _g ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) {
			str += ", \n";
		}
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	while(true) {
		if(cc == null) {
			return false;
		}
		if(cc == cl) {
			return true;
		}
		var intf = cc.__interfaces__;
		if(intf != null) {
			var _g = 0;
			var _g1 = intf.length;
			while(_g < _g1) {
				var i = intf[_g++];
				if(i == cl || js_Boot.__interfLoop(i,cl)) {
					return true;
				}
			}
		}
		cc = cc.__super__;
	}
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) {
		return false;
	}
	switch(cl) {
	case Array:
		return ((o) instanceof Array);
	case Bool:
		return typeof(o) == "boolean";
	case Dynamic:
		return o != null;
	case Float:
		return typeof(o) == "number";
	case Int:
		if(typeof(o) == "number") {
			return ((o | 0) === o);
		} else {
			return false;
		}
		break;
	case String:
		return typeof(o) == "string";
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(js_Boot.__downcastCheck(o,cl)) {
					return true;
				}
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(((o) instanceof cl)) {
					return true;
				}
			}
		} else {
			return false;
		}
		if(cl == Class ? o.__name__ != null : false) {
			return true;
		}
		if(cl == Enum ? o.__ename__ != null : false) {
			return true;
		}
		return o.__enum__ != null ? $hxEnums[o.__enum__] == cl : false;
	}
};
js_Boot.__downcastCheck = function(o,cl) {
	if(!((o) instanceof cl)) {
		if(cl.__isInterface__) {
			return js_Boot.__interfLoop(js_Boot.getClass(o),cl);
		} else {
			return false;
		}
	} else {
		return true;
	}
};
js_Boot.__implements = function(o,iface) {
	return js_Boot.__interfLoop(js_Boot.getClass(o),iface);
};
js_Boot.__cast = function(o,t) {
	if(o == null || js_Boot.__instanceof(o,t)) {
		return o;
	} else {
		throw haxe_Exception.thrown("Cannot cast " + Std.string(o) + " to " + Std.string(t));
	}
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") {
		return null;
	}
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
function tools_ArrayItems_last(a) {
	return a[a.length - 1];
}
function tools_ArrayItems_first(a) {
	return a[0];
}
var tools_EnumTools = function() { };
tools_EnumTools.__name__ = "tools.EnumTools";
var utest_Assert = function() { };
utest_Assert.__name__ = "utest.Assert";
utest_Assert.processResult = function(cond,getMessage,pos) {
	if(utest_Assert.results == null) {
		throw haxe_Exception.thrown("Assert at " + pos.fileName + ":" + pos.lineNumber + " out of context. Most likely you are trying to assert after a test timeout.");
	}
	if(cond) {
		utest_Assert.results.add(utest_Assertation.Success(pos));
	} else {
		utest_Assert.results.add(utest_Assertation.Failure(getMessage(),pos));
	}
	return cond;
};
utest_Assert.isTrue = function(cond,msg,pos) {
	if(utest_Assert.results == null) {
		throw haxe_Exception.thrown("Assert at " + pos.fileName + ":" + pos.lineNumber + " out of context. Most likely you are trying to assert after a test timeout.");
	}
	if(cond) {
		utest_Assert.results.add(utest_Assertation.Success(pos));
	} else {
		utest_Assert.results.add(utest_Assertation.Failure(msg != null ? msg : "expected true",pos));
	}
	return cond;
};
utest_Assert.isFalse = function(value,msg,pos) {
	var cond = value == false;
	if(utest_Assert.results == null) {
		throw haxe_Exception.thrown("Assert at " + pos.fileName + ":" + pos.lineNumber + " out of context. Most likely you are trying to assert after a test timeout.");
	}
	if(cond) {
		utest_Assert.results.add(utest_Assertation.Success(pos));
	} else {
		utest_Assert.results.add(utest_Assertation.Failure(msg != null ? msg : "expected false",pos));
	}
	return cond;
};
utest_Assert.isNull = function(value,msg,pos) {
	var cond = value == null;
	if(utest_Assert.results == null) {
		throw haxe_Exception.thrown("Assert at " + pos.fileName + ":" + pos.lineNumber + " out of context. Most likely you are trying to assert after a test timeout.");
	}
	if(cond) {
		utest_Assert.results.add(utest_Assertation.Success(pos));
	} else {
		utest_Assert.results.add(utest_Assertation.Failure(msg != null ? msg : "expected null but it is " + utest_Assert.q(value),pos));
	}
	return cond;
};
utest_Assert.notNull = function(value,msg,pos) {
	var cond = value != null;
	if(utest_Assert.results == null) {
		throw haxe_Exception.thrown("Assert at " + pos.fileName + ":" + pos.lineNumber + " out of context. Most likely you are trying to assert after a test timeout.");
	}
	if(cond) {
		utest_Assert.results.add(utest_Assertation.Success(pos));
	} else {
		utest_Assert.results.add(utest_Assertation.Failure(msg != null ? msg : "expected not null",pos));
	}
	return cond;
};
utest_Assert.is = function(value,type,msg,pos) {
	return utest_Assert.isOfType(value,type,msg,pos);
};
utest_Assert.isOfType = function(value,type,msg,pos) {
	var cond = js_Boot.__instanceof(value,type);
	if(utest_Assert.results == null) {
		throw haxe_Exception.thrown("Assert at " + pos.fileName + ":" + pos.lineNumber + " out of context. Most likely you are trying to assert after a test timeout.");
	}
	if(cond) {
		utest_Assert.results.add(utest_Assertation.Success(pos));
	} else {
		utest_Assert.results.add(utest_Assertation.Failure(msg != null ? msg : "expected type " + utest_Assert.typeToString(type) + " but it is " + utest_Assert.typeToString(value),pos));
	}
	return cond;
};
utest_Assert.notEquals = function(expected,value,msg,pos) {
	var cond = expected != value;
	if(utest_Assert.results == null) {
		throw haxe_Exception.thrown("Assert at " + pos.fileName + ":" + pos.lineNumber + " out of context. Most likely you are trying to assert after a test timeout.");
	}
	if(cond) {
		utest_Assert.results.add(utest_Assertation.Success(pos));
	} else {
		utest_Assert.results.add(utest_Assertation.Failure(msg != null ? msg : "expected " + utest_Assert.q(expected) + " and test value " + utest_Assert.q(value) + " should be different",pos));
	}
	return cond;
};
utest_Assert.equals = function(expected,value,msg,pos) {
	var cond = expected == value;
	if(utest_Assert.results == null) {
		throw haxe_Exception.thrown("Assert at " + pos.fileName + ":" + pos.lineNumber + " out of context. Most likely you are trying to assert after a test timeout.");
	}
	if(cond) {
		utest_Assert.results.add(utest_Assertation.Success(pos));
	} else {
		utest_Assert.results.add(utest_Assertation.Failure(msg != null ? msg : "expected " + utest_Assert.q(expected) + " but it is " + utest_Assert.q(value),pos));
	}
	return cond;
};
utest_Assert.match = function(pattern,value,msg,pos) {
	var cond = pattern.match(value);
	if(utest_Assert.results == null) {
		throw haxe_Exception.thrown("Assert at " + pos.fileName + ":" + pos.lineNumber + " out of context. Most likely you are trying to assert after a test timeout.");
	}
	if(cond) {
		utest_Assert.results.add(utest_Assertation.Success(pos));
	} else {
		utest_Assert.results.add(utest_Assertation.Failure(msg != null ? msg : "the value " + utest_Assert.q(value) + " does not match the provided pattern",pos));
	}
	return cond;
};
utest_Assert.floatEquals = function(expected,value,approx,msg,pos) {
	var cond = utest_Assert._floatEquals(expected,value,approx);
	if(utest_Assert.results == null) {
		throw haxe_Exception.thrown("Assert at " + pos.fileName + ":" + pos.lineNumber + " out of context. Most likely you are trying to assert after a test timeout.");
	}
	if(cond) {
		utest_Assert.results.add(utest_Assertation.Success(pos));
	} else {
		utest_Assert.results.add(utest_Assertation.Failure(msg != null ? msg : "expected " + utest_Assert.q(expected) + " but it is " + utest_Assert.q(value),pos));
	}
	return cond;
};
utest_Assert._floatEquals = function(expected,value,approx) {
	if(isNaN(expected)) {
		return isNaN(value);
	} else if(isNaN(value)) {
		return false;
	} else if(!isFinite(expected) && !isFinite(value)) {
		return expected > 0 == value > 0;
	}
	if(null == approx) {
		approx = 1e-5;
	}
	return Math.abs(value - expected) <= approx;
};
utest_Assert.getTypeName = function(v) {
	var _g = Type.typeof(v);
	switch(_g._hx_index) {
	case 0:
		return "`null`";
	case 1:
		return "Int";
	case 2:
		return "Float";
	case 3:
		return "Bool";
	case 4:
		return "Object";
	case 5:
		return "function";
	case 6:
		var c = _g.c;
		return c.__name__;
	case 7:
		var e = _g.e;
		return e.__ename__;
	case 8:
		return "`Unknown`";
	}
};
utest_Assert.isIterable = function(v,isAnonym) {
	if(!Lambda.has(isAnonym ? Reflect.fields(v) : Type.getInstanceFields(js_Boot.getClass(v)),"iterator")) {
		return false;
	}
	return Reflect.isFunction(Reflect.field(v,"iterator"));
};
utest_Assert.isIterator = function(v,isAnonym) {
	var fields = isAnonym ? Reflect.fields(v) : Type.getInstanceFields(js_Boot.getClass(v));
	if(!Lambda.has(fields,"next") || !Lambda.has(fields,"hasNext")) {
		return false;
	}
	if(Reflect.isFunction(Reflect.field(v,"next"))) {
		return Reflect.isFunction(Reflect.field(v,"hasNext"));
	} else {
		return false;
	}
};
utest_Assert.sameAs = function(expected,value,status,approx) {
	var texpected = utest_Assert.getTypeName(expected);
	var tvalue = utest_Assert.getTypeName(value);
	status.expectedValue = expected;
	status.actualValue = value;
	if(texpected != tvalue && !(texpected == "Int" && tvalue == "Float" || texpected == "Float" && tvalue == "Int")) {
		status.error = "expected type " + texpected + " but it is " + tvalue + (status.path == "" ? "" : " for field " + status.path);
		return false;
	}
	var _g = Type.typeof(expected);
	switch(_g._hx_index) {
	case 1:case 2:
		if(!utest_Assert._floatEquals(expected,value,approx)) {
			status.error = "expected " + utest_Assert.q(expected) + " but it is " + utest_Assert.q(value) + (status.path == "" ? "" : " for field " + status.path);
			return false;
		}
		return true;
	case 0:case 3:
		if(expected != value) {
			status.error = "expected " + utest_Assert.q(expected) + " but it is " + utest_Assert.q(value) + (status.path == "" ? "" : " for field " + status.path);
			return false;
		}
		return true;
	case 4:
		if(status.recursive || status.path == "") {
			var tfields = Reflect.fields(value);
			var fields = Reflect.fields(expected);
			var path = status.path;
			var _g1 = 0;
			while(_g1 < fields.length) {
				var field = fields[_g1];
				++_g1;
				HxOverrides.remove(tfields,field);
				status.path = path == "" ? field : path + "." + field;
				if(!Object.prototype.hasOwnProperty.call(value,field)) {
					status.error = "expected field " + status.path + " does not exist in " + utest_Assert.q(value);
					return false;
				}
				var e = Reflect.field(expected,field);
				if(Reflect.isFunction(e)) {
					continue;
				}
				if(!utest_Assert.sameAs(e,Reflect.field(value,field),status,approx)) {
					return false;
				}
			}
			if(tfields.length > 0) {
				status.error = "the tested object has extra field(s) (" + tfields.join(", ") + ") not included in the expected ones";
				return false;
			}
		}
		if(utest_Assert.isIterator(expected,true)) {
			if(!utest_Assert.isIterator(value,true)) {
				status.error = "expected Iterable but it is not " + (status.path == "" ? "" : " for field " + status.path);
				return false;
			}
			if(status.recursive || status.path == "") {
				var evalues = Lambda.array({ iterator : function() {
					return expected;
				}});
				var vvalues = Lambda.array({ iterator : function() {
					return value;
				}});
				if(evalues.length != vvalues.length) {
					status.error = "expected " + evalues.length + " values in Iterator but they are " + vvalues.length + (status.path == "" ? "" : " for field " + status.path);
					return false;
				}
				var path = status.path;
				var _g1 = 0;
				var _g2 = evalues.length;
				while(_g1 < _g2) {
					var i = _g1++;
					status.path = path == "" ? "iterator[" + i + "]" : path + "[" + i + "]";
					if(!utest_Assert.sameAs(evalues[i],vvalues[i],status,approx)) {
						status.error = "expected " + utest_Assert.q(status.expectedValue) + " but it is " + utest_Assert.q(status.actualValue) + (status.path == "" ? "" : " for field " + status.path);
						return false;
					}
				}
			}
			return true;
		}
		if(utest_Assert.isIterable(expected,true)) {
			if(!utest_Assert.isIterable(value,true)) {
				status.error = "expected Iterator but it is not " + (status.path == "" ? "" : " for field " + status.path);
				return false;
			}
			if(status.recursive || status.path == "") {
				var evalues = Lambda.array(expected);
				var vvalues = Lambda.array(value);
				if(evalues.length != vvalues.length) {
					status.error = "expected " + evalues.length + " values in Iterable but they are " + vvalues.length + (status.path == "" ? "" : " for field " + status.path);
					return false;
				}
				var path = status.path;
				var _g1 = 0;
				var _g2 = evalues.length;
				while(_g1 < _g2) {
					var i = _g1++;
					status.path = path == "" ? "iterable[" + i + "]" : path + "[" + i + "]";
					if(!utest_Assert.sameAs(evalues[i],vvalues[i],status,approx)) {
						return false;
					}
				}
			}
			return true;
		}
		return true;
	case 5:
		if(!Reflect.compareMethods(expected,value)) {
			status.error = "expected same function reference" + (status.path == "" ? "" : " for field " + status.path);
			return false;
		}
		return true;
	case 6:
		var c = _g.c;
		var cexpected = c.__name__;
		var c = js_Boot.getClass(value);
		var cvalue = c.__name__;
		if(cexpected != cvalue) {
			status.error = "expected instance of " + utest_Assert.q(cexpected) + " but it is " + utest_Assert.q(cvalue) + (status.path == "" ? "" : " for field " + status.path);
			return false;
		}
		if(typeof(expected) == "string") {
			if(expected == value) {
				return true;
			} else {
				status.error = "expected string '" + Std.string(expected) + "' but it is '" + Std.string(value) + "'";
				return false;
			}
		}
		if(((expected) instanceof Array)) {
			if(status.recursive || status.path == "") {
				if(expected.length != value.length) {
					status.error = "expected " + Std.string(expected.length) + " elements but they are " + Std.string(value.length) + (status.path == "" ? "" : " for field " + status.path);
					return false;
				}
				var path = status.path;
				var _g1 = 0;
				var _g2 = expected.length;
				while(_g1 < _g2) {
					var i = _g1++;
					status.path = path == "" ? "array[" + i + "]" : path + "[" + i + "]";
					if(!utest_Assert.sameAs(expected[i],value[i],status,approx)) {
						status.error = "expected array element at [" + i + "] to have " + utest_Assert.q(status.expectedValue) + " but it is " + utest_Assert.q(status.actualValue) + (status.path == "" ? "" : " for field " + status.path);
						return false;
					}
				}
			}
			return true;
		}
		if(((expected) instanceof Date)) {
			if(expected.getTime() != value.getTime()) {
				status.error = "expected " + utest_Assert.q(expected) + " but it is " + utest_Assert.q(value) + (status.path == "" ? "" : " for field " + status.path);
				return false;
			}
			return true;
		}
		if(((expected) instanceof haxe_io_Bytes)) {
			if(status.recursive || status.path == "") {
				var ebytes = expected;
				var vbytes = value;
				if(ebytes.length != vbytes.length) {
					status.error = "expected " + ebytes.length + " bytes length but it is " + vbytes.length;
					return false;
				}
				var _g1 = 0;
				var _g2 = ebytes.length;
				while(_g1 < _g2) {
					var i = _g1++;
					if(ebytes.b[i] != vbytes.b[i]) {
						status.error = "expected byte #" + i + " to be " + ebytes.b[i] + " but it is " + vbytes.b[i] + (status.path == "" ? "" : " for field " + status.path);
						return false;
					}
				}
			}
			return true;
		}
		if(js_Boot.__implements(expected,haxe_IMap)) {
			if(status.recursive || status.path == "") {
				var map = js_Boot.__cast(expected , haxe_IMap);
				var vmap = js_Boot.__cast(value , haxe_IMap);
				var _g1 = [];
				var k = map.keys();
				while(k.hasNext()) _g1.push(k.next());
				var keys = _g1;
				var _g1 = [];
				var k = vmap.keys();
				while(k.hasNext()) _g1.push(k.next());
				var vkeys = _g1;
				if(keys.length != vkeys.length) {
					status.error = "expected " + keys.length + " keys but they are " + vkeys.length + (status.path == "" ? "" : " for field " + status.path);
					return false;
				}
				var path = status.path;
				var _g1 = 0;
				while(_g1 < keys.length) {
					var key = keys[_g1];
					++_g1;
					status.path = path == "" ? "hash[" + Std.string(key) + "]" : path + "[" + Std.string(key) + "]";
					if(!utest_Assert.sameAs(map.get(key),vmap.get(key),status,approx)) {
						status.error = "expected " + utest_Assert.q(status.expectedValue) + " but it is " + utest_Assert.q(status.actualValue) + (status.path == "" ? "" : " for field " + status.path);
						return false;
					}
				}
			}
			return true;
		}
		if(utest_Assert.isIterator(expected,false)) {
			if(status.recursive || status.path == "") {
				var evalues = Lambda.array({ iterator : function() {
					return expected;
				}});
				var vvalues = Lambda.array({ iterator : function() {
					return value;
				}});
				if(evalues.length != vvalues.length) {
					status.error = "expected " + evalues.length + " values in Iterator but they are " + vvalues.length + (status.path == "" ? "" : " for field " + status.path);
					return false;
				}
				var path = status.path;
				var _g1 = 0;
				var _g2 = evalues.length;
				while(_g1 < _g2) {
					var i = _g1++;
					status.path = path == "" ? "iterator[" + i + "]" : path + "[" + i + "]";
					if(!utest_Assert.sameAs(evalues[i],vvalues[i],status,approx)) {
						status.error = "expected " + utest_Assert.q(status.expectedValue) + " but it is " + utest_Assert.q(status.actualValue) + (status.path == "" ? "" : " for field " + status.path);
						return false;
					}
				}
			}
			return true;
		}
		if(utest_Assert.isIterable(expected,false)) {
			if(status.recursive || status.path == "") {
				var evalues = Lambda.array(expected);
				var vvalues = Lambda.array(value);
				if(evalues.length != vvalues.length) {
					status.error = "expected " + evalues.length + " values in Iterable but they are " + vvalues.length + (status.path == "" ? "" : " for field " + status.path);
					return false;
				}
				var path = status.path;
				var _g1 = 0;
				var _g2 = evalues.length;
				while(_g1 < _g2) {
					var i = _g1++;
					status.path = path == "" ? "iterable[" + i + "]" : path + "[" + i + "]";
					if(!utest_Assert.sameAs(evalues[i],vvalues[i],status,approx)) {
						return false;
					}
				}
			}
			return true;
		}
		if(status.recursive || status.path == "") {
			var fields = Type.getInstanceFields(js_Boot.getClass(expected));
			var path = status.path;
			var _g1 = 0;
			while(_g1 < fields.length) {
				var field = fields[_g1];
				++_g1;
				status.path = path == "" ? field : path + "." + field;
				var e = Reflect.field(expected,field);
				if(Reflect.isFunction(e)) {
					continue;
				}
				if(!utest_Assert.sameAs(e,Reflect.field(value,field),status,approx)) {
					return false;
				}
			}
		}
		return true;
	case 7:
		var e = _g.e;
		var eexpected = e.__ename__;
		var e = Type.getEnum(value);
		var evalue = e.__ename__;
		if(eexpected != evalue) {
			status.error = "expected enumeration of " + utest_Assert.q(eexpected) + " but it is " + utest_Assert.q(evalue) + (status.path == "" ? "" : " for field " + status.path);
			return false;
		}
		if(status.recursive || status.path == "") {
			if(expected._hx_index != value._hx_index) {
				var e = expected;
				var tmp = "expected enum constructor " + utest_Assert.q($hxEnums[e.__enum__].__constructs__[e._hx_index]._hx_name) + " but it is ";
				var e = value;
				status.error = tmp + utest_Assert.q($hxEnums[e.__enum__].__constructs__[e._hx_index]._hx_name) + (status.path == "" ? "" : " for field " + status.path);
				return false;
			}
			var eparams = Type.enumParameters(expected);
			var vparams = Type.enumParameters(value);
			var path = status.path;
			var _g = 0;
			var _g1 = eparams.length;
			while(_g < _g1) {
				var i = _g++;
				status.path = path == "" ? "enum[" + i + "]" : path + "[" + i + "]";
				if(!utest_Assert.sameAs(eparams[i],vparams[i],status,approx)) {
					status.error = "expected enum param " + utest_Assert.q(expected) + " but it is " + utest_Assert.q(value) + (status.path == "" ? "" : " for field " + status.path) + " with " + status.error;
					return false;
				}
			}
		}
		return true;
	case 8:
		throw haxe_Exception.thrown("Unable to compare two unknown types");
	}
};
utest_Assert.q = function(v) {
	if(typeof(v) == "string") {
		return "\"" + StringTools.replace(v,"\"","\\\"") + "\"";
	} else {
		return Std.string(v);
	}
};
utest_Assert.same = function(expected,value,recursive,msg,approx,pos) {
	if(null == approx) {
		approx = 1e-5;
	}
	var status = { recursive : null == recursive ? true : recursive, path : "", error : null, expectedValue : expected, actualValue : value};
	if(utest_Assert.sameAs(expected,value,status,approx)) {
		return utest_Assert.pass(msg,pos);
	} else {
		return utest_Assert.fail(msg == null ? status.error : msg,pos);
	}
};
utest_Assert.raises = function(method,type,msgNotThrown,msgWrongType,pos) {
	var name = type != null ? type.__name__ : "Dynamic";
	try {
		method();
	} catch( _g ) {
		var ex = haxe_Exception.caught(_g).unwrap();
		if(null == type) {
			return utest_Assert.pass(null,pos);
		} else {
			if(null == msgWrongType) {
				msgWrongType = "expected throw of type " + name + " but it is " + Std.string(ex);
			}
			return utest_Assert.isTrue(js_Boot.__instanceof(ex,type),msgWrongType,pos);
		}
	}
	if(null == msgNotThrown) {
		msgNotThrown = "exception of type " + name + " not raised";
	}
	return utest_Assert.fail(msgNotThrown,pos);
};
utest_Assert.allows = function(possibilities,value,msg,pos) {
	if(Lambda.has(possibilities,value)) {
		return utest_Assert.isTrue(true,msg,pos);
	} else {
		return utest_Assert.fail(msg == null ? "value " + utest_Assert.q(value) + " not found in the expected possibilities " + Std.string(possibilities) : msg,pos);
	}
};
utest_Assert.contains = function(match,values,msg,pos) {
	if(Lambda.has(values,match)) {
		return utest_Assert.isTrue(true,msg,pos);
	} else {
		return utest_Assert.fail(msg == null ? "values " + utest_Assert.q(values) + " do not contain " + Std.string(match) : msg,pos);
	}
};
utest_Assert.notContains = function(match,values,msg,pos) {
	if(!Lambda.has(values,match)) {
		return utest_Assert.isTrue(true,msg,pos);
	} else {
		return utest_Assert.fail(msg == null ? "values " + utest_Assert.q(values) + " do contain " + Std.string(match) : msg,pos);
	}
};
utest_Assert.stringContains = function(match,value,msg,pos) {
	if(value != null && value.indexOf(match) >= 0) {
		return utest_Assert.isTrue(true,msg,pos);
	} else {
		return utest_Assert.fail(msg == null ? "value " + utest_Assert.q(value) + " does not contain " + utest_Assert.q(match) : msg,pos);
	}
};
utest_Assert.stringSequence = function(sequence,value,msg,pos) {
	if(null == value) {
		return utest_Assert.fail(msg == null ? "null argument value" : msg,pos);
	}
	var p = 0;
	var _g = 0;
	while(_g < sequence.length) {
		var s = sequence[_g];
		++_g;
		var p2 = value.indexOf(s,p);
		if(p2 < 0) {
			if(msg == null) {
				msg = "expected '" + s + "' after ";
				if(p > 0) {
					var cut = HxOverrides.substr(value,0,p);
					if(cut.length > 30) {
						cut = "..." + HxOverrides.substr(cut,-27,null);
					}
					msg += " '" + cut + "'";
				} else {
					msg += " begin";
				}
			}
			return utest_Assert.fail(msg,pos);
		}
		p = p2 + s.length;
	}
	return utest_Assert.isTrue(true,msg,pos);
};
utest_Assert.pass = function(msg,pos) {
	if(msg == null) {
		msg = "pass expected";
	}
	return utest_Assert.isTrue(true,msg,pos);
};
utest_Assert.fail = function(msg,pos) {
	if(msg == null) {
		msg = "failure expected";
	}
	return utest_Assert.isTrue(false,msg,pos);
};
utest_Assert.warn = function(msg) {
	utest_Assert.results.add(utest_Assertation.Warning(msg));
};
utest_Assert.createAsync = function(f,timeout) {
	return function() {
	};
};
utest_Assert.createEvent = function(f,timeout) {
	return function(e) {
	};
};
utest_Assert.typeToString = function(t) {
	try {
		var _t = js_Boot.getClass(t);
		if(_t != null) {
			t = _t;
		}
	} catch( _g ) {
	}
	try {
		return t.__name__;
	} catch( _g ) {
	}
	try {
		var _t = Type.getEnum(t);
		if(_t != null) {
			t = _t;
		}
	} catch( _g ) {
	}
	try {
		return t.__ename__;
	} catch( _g ) {
	}
	try {
		return Std.string(Type.typeof(t));
	} catch( _g ) {
	}
	try {
		return Std.string(t);
	} catch( _g ) {
	}
	return "<unable to retrieve type name>";
};
var utest_Assertation = $hxEnums["utest.Assertation"] = { __ename__:"utest.Assertation",__constructs__:null
	,Success: ($_=function(pos) { return {_hx_index:0,pos:pos,__enum__:"utest.Assertation",toString:$estr}; },$_._hx_name="Success",$_.__params__ = ["pos"],$_)
	,Failure: ($_=function(msg,pos) { return {_hx_index:1,msg:msg,pos:pos,__enum__:"utest.Assertation",toString:$estr}; },$_._hx_name="Failure",$_.__params__ = ["msg","pos"],$_)
	,Error: ($_=function(e,stack) { return {_hx_index:2,e:e,stack:stack,__enum__:"utest.Assertation",toString:$estr}; },$_._hx_name="Error",$_.__params__ = ["e","stack"],$_)
	,SetupError: ($_=function(e,stack) { return {_hx_index:3,e:e,stack:stack,__enum__:"utest.Assertation",toString:$estr}; },$_._hx_name="SetupError",$_.__params__ = ["e","stack"],$_)
	,TeardownError: ($_=function(e,stack) { return {_hx_index:4,e:e,stack:stack,__enum__:"utest.Assertation",toString:$estr}; },$_._hx_name="TeardownError",$_.__params__ = ["e","stack"],$_)
	,TimeoutError: ($_=function(missedAsyncs,stack) { return {_hx_index:5,missedAsyncs:missedAsyncs,stack:stack,__enum__:"utest.Assertation",toString:$estr}; },$_._hx_name="TimeoutError",$_.__params__ = ["missedAsyncs","stack"],$_)
	,AsyncError: ($_=function(e,stack) { return {_hx_index:6,e:e,stack:stack,__enum__:"utest.Assertation",toString:$estr}; },$_._hx_name="AsyncError",$_.__params__ = ["e","stack"],$_)
	,Warning: ($_=function(msg) { return {_hx_index:7,msg:msg,__enum__:"utest.Assertation",toString:$estr}; },$_._hx_name="Warning",$_.__params__ = ["msg"],$_)
	,Ignore: ($_=function(reason) { return {_hx_index:8,reason:reason,__enum__:"utest.Assertation",toString:$estr}; },$_._hx_name="Ignore",$_.__params__ = ["reason"],$_)
};
utest_Assertation.__constructs__ = [utest_Assertation.Success,utest_Assertation.Failure,utest_Assertation.Error,utest_Assertation.SetupError,utest_Assertation.TeardownError,utest_Assertation.TimeoutError,utest_Assertation.AsyncError,utest_Assertation.Warning,utest_Assertation.Ignore];
var utest_Async = function(timeoutMs) {
	if(timeoutMs == null) {
		timeoutMs = 250;
	}
	this.branches = [];
	this.callbacks = [];
	this.timedOut = false;
	this.resolved = false;
	this.timeoutMs = timeoutMs;
	this.startTime = HxOverrides.now() / 1000;
	this.timer = haxe_Timer.delay($bind(this,this.setTimedOutState),timeoutMs);
};
utest_Async.__name__ = "utest.Async";
utest_Async.getResolved = function() {
	if(utest_Async.resolvedInstance == null) {
		utest_Async.resolvedInstance = new utest_Async();
		utest_Async.resolvedInstance.done({ fileName : "utest/Async.hx", lineNumber : 30, className : "utest.Async", methodName : "getResolved"});
	}
	return utest_Async.resolvedInstance;
};
utest_Async.prototype = {
	resolved: null
	,timedOut: null
	,callbacks: null
	,timeoutMs: null
	,startTime: null
	,timer: null
	,branches: null
	,done: function(pos) {
		if(this.resolved) {
			if(this.timedOut) {
				throw haxe_Exception.thrown("Cannot done() at " + pos.fileName + ":" + pos.lineNumber + " because async is timed out.");
			} else {
				throw haxe_Exception.thrown("Cannot done() at " + pos.fileName + ":" + pos.lineNumber + " because async is done already.");
			}
		}
		this.resolved = true;
		this.timer.stop();
		var _g = 0;
		var _g1 = this.callbacks;
		while(_g < _g1.length) _g1[_g++]();
	}
	,setTimeout: function(timeoutMs,pos) {
		if(this.resolved) {
			throw haxe_Exception.thrown("Cannot setTimeout(" + timeoutMs + ") at " + pos.fileName + ":" + pos.lineNumber + " because async is done.");
		}
		if(this.timedOut) {
			throw haxe_Exception.thrown("Cannot setTimeout(" + timeoutMs + ") at " + pos.fileName + ":" + pos.lineNumber + " because async is timed out.");
		}
		this.timer.stop();
		this.timeoutMs = timeoutMs;
		this.timer = haxe_Timer.delay($bind(this,this.setTimedOutState),timeoutMs - Math.round(1000 * (HxOverrides.now() / 1000 - this.startTime)));
	}
	,branch: function(fn,pos) {
		var branch = new utest_Async(this.timeoutMs);
		this.branches.push(branch);
		var _g = $bind(this,this.checkBranches);
		var pos1 = pos;
		branch.then(function() {
			_g(pos1);
		});
		if(fn != null) {
			fn(branch);
		}
		return branch;
	}
	,checkBranches: function(pos) {
		var _gthis = this;
		if(this.resolved) {
			return;
		}
		var _g = 0;
		var _g1 = this.branches;
		while(_g < _g1.length) {
			var branch = _g1[_g];
			++_g;
			if(!branch.resolved) {
				return;
			}
			if(branch.timedOut) {
				this.setTimedOutState();
				return;
			}
		}
		var branchCount = this.branches.length;
		haxe_Timer.delay(function() {
			if(branchCount == _gthis.branches.length) {
				_gthis.done(pos);
			}
		},5);
	}
	,then: function(cb) {
		if(this.resolved) {
			cb();
		} else {
			this.callbacks.push(cb);
		}
	}
	,setTimedOutState: function() {
		if(this.resolved) {
			return;
		}
		this.timedOut = true;
		this.done({ fileName : "utest/Async.hx", lineNumber : 115, className : "utest.Async", methodName : "setTimedOutState"});
	}
	,__class__: utest_Async
};
var utest__$Dispatcher_EventException = $hxEnums["utest._Dispatcher.EventException"] = { __ename__:"utest._Dispatcher.EventException",__constructs__:null
	,StopPropagation: {_hx_name:"StopPropagation",_hx_index:0,__enum__:"utest._Dispatcher.EventException",toString:$estr}
};
utest__$Dispatcher_EventException.__constructs__ = [utest__$Dispatcher_EventException.StopPropagation];
var utest_Dispatcher = function() {
	this.handlers = [];
};
utest_Dispatcher.__name__ = "utest.Dispatcher";
utest_Dispatcher.stop = function() {
	throw haxe_Exception.thrown(utest__$Dispatcher_EventException.StopPropagation);
};
utest_Dispatcher.prototype = {
	handlers: null
	,add: function(h) {
		this.handlers.push(h);
		return h;
	}
	,remove: function(h) {
		var _g = 0;
		var _g1 = this.handlers.length;
		while(_g < _g1) {
			var i = _g++;
			if(Reflect.compareMethods(this.handlers[i],h)) {
				return this.handlers.splice(i,1)[0];
			}
		}
		return null;
	}
	,clear: function() {
		this.handlers = [];
	}
	,dispatch: function(e) {
		try {
			var list = this.handlers.slice();
			var _g = 0;
			while(_g < list.length) list[_g++](e);
			return true;
		} catch( _g ) {
			if(js_Boot.__instanceof(haxe_Exception.caught(_g).unwrap(),utest__$Dispatcher_EventException)) {
				return false;
			} else {
				throw _g;
			}
		}
	}
	,has: function() {
		return this.handlers.length > 0;
	}
	,__class__: utest_Dispatcher
};
var utest_Notifier = function() {
	this.handlers = [];
};
utest_Notifier.__name__ = "utest.Notifier";
utest_Notifier.stop = function() {
	throw haxe_Exception.thrown(utest__$Dispatcher_EventException.StopPropagation);
};
utest_Notifier.prototype = {
	handlers: null
	,add: function(h) {
		this.handlers.push(h);
		return h;
	}
	,remove: function(h) {
		var _g = 0;
		var _g1 = this.handlers.length;
		while(_g < _g1) {
			var i = _g++;
			if(Reflect.compareMethods(this.handlers[i],h)) {
				return this.handlers.splice(i,1)[0];
			}
		}
		return null;
	}
	,clear: function() {
		this.handlers = [];
	}
	,dispatch: function() {
		try {
			var list = this.handlers.slice();
			var _g = 0;
			while(_g < list.length) list[_g++]();
			return true;
		} catch( _g ) {
			if(js_Boot.__instanceof(haxe_Exception.caught(_g).unwrap(),utest__$Dispatcher_EventException)) {
				return false;
			} else {
				throw _g;
			}
		}
	}
	,has: function() {
		return this.handlers.length > 0;
	}
	,__class__: utest_Notifier
};
var utest_TestHandler = function(fixture) {
	this.wasBound = false;
	this.finished = false;
	if(fixture == null) {
		throw haxe_Exception.thrown("fixture argument is null");
	}
	this.fixture = fixture;
	this.results = new haxe_ds_List();
	this.asyncStack = new haxe_ds_List();
	this.onTested = new utest_Dispatcher();
	this.onTimeout = new utest_Dispatcher();
	this.onComplete = new utest_Dispatcher();
	this.onPrecheck = new utest_Dispatcher();
	if(fixture.ignoringInfo != null) {
		this.results.add(utest_Assertation.Ignore(fixture.ignoringInfo));
	}
};
utest_TestHandler.__name__ = "utest.TestHandler";
utest_TestHandler.exceptionStack = function(pops) {
	if(pops == null) {
		pops = 2;
	}
	var stack = haxe_CallStack.exceptionStack();
	while(pops-- > 0) stack.pop();
	return stack;
};
utest_TestHandler.prototype = {
	results: null
	,fixture: null
	,finished: null
	,asyncStack: null
	,onTested: null
	,onTimeout: null
	,onComplete: null
	,onPrecheck: null
	,precheck: null
	,wasBound: null
	,execute: function() {
		var _gthis = this;
		if(this.fixture.ignoringInfo != null) {
			this.executeFinally();
			return;
		}
		var isSync = true;
		var expectingAsync = true;
		var run = function() {
			if(isSync) {
				expectingAsync = false;
				return;
			}
			_gthis.executeFixtureMethod();
			_gthis.executeFinally();
		};
		try {
			this.executeMethod(this.fixture.setup);
			this.executeAsyncMethod(this.fixture.setupAsync,run);
			if(!expectingAsync) {
				this.executeFixtureMethod();
			}
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g).unwrap();
			this.results.add(utest_Assertation.SetupError(_g1,utest_TestHandler.exceptionStack()));
		}
		isSync = false;
		if(!expectingAsync) {
			this.executeFinally();
		}
	}
	,executeFixtureMethod: function() {
		try {
			this.executeMethod(this.fixture.method);
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g).unwrap();
			this.results.add(utest_Assertation.Error(_g1,utest_TestHandler.exceptionStack()));
		}
	}
	,executeFinally: function() {
		this.onPrecheck.dispatch(this);
		this.checkTested();
	}
	,checkTested: function() {
		if(this.expiration == null || this.asyncStack.length == 0) {
			this.tested();
		} else if(HxOverrides.now() / 1000 > this.expiration) {
			this.timeout();
		} else {
			haxe_Timer.delay($bind(this,this.checkTested),10);
		}
	}
	,expiration: null
	,setTimeout: function(timeout) {
		var newExpire = HxOverrides.now() / 1000 + timeout / 1000;
		this.expiration = this.expiration == null ? newExpire : newExpire > this.expiration ? newExpire : this.expiration;
	}
	,bindHandler: function() {
		if(this.wasBound) {
			return;
		}
		utest_Assert.results = this.results;
		utest_Assert.createAsync = $bind(this,this.addAsync);
		utest_Assert.createEvent = $bind(this,this.addEvent);
		this.wasBound = true;
	}
	,unbindHandler: function() {
		if(!this.wasBound) {
			return;
		}
		utest_Assert.results = null;
		utest_Assert.createAsync = function(f,t) {
			return function() {
			};
		};
		utest_Assert.createEvent = function(f,t) {
			return function(e) {
			};
		};
		this.wasBound = false;
	}
	,addAsync: function(f,timeout) {
		if(timeout == null) {
			timeout = 250;
		}
		if(null == f) {
			f = function() {
			};
		}
		this.asyncStack.add(f);
		var handler = this;
		this.setTimeout(timeout);
		return function() {
			if(!handler.asyncStack.remove(f)) {
				handler.results.add(utest_Assertation.AsyncError("async function already executed",[]));
				return;
			}
			try {
				handler.bindHandler();
				f();
			} catch( _g ) {
				var _g1 = haxe_Exception.caught(_g).unwrap();
				handler.results.add(utest_Assertation.AsyncError(_g1,utest_TestHandler.exceptionStack(0)));
			}
		};
	}
	,addEvent: function(f,timeout) {
		if(timeout == null) {
			timeout = 250;
		}
		this.asyncStack.add(f);
		var handler = this;
		this.setTimeout(timeout);
		return function(e) {
			if(!handler.asyncStack.remove(f)) {
				handler.results.add(utest_Assertation.AsyncError("event already executed",[]));
				return;
			}
			try {
				handler.bindHandler();
				f(e);
			} catch( _g ) {
				var _g1 = haxe_Exception.caught(_g).unwrap();
				handler.results.add(utest_Assertation.AsyncError(_g1,utest_TestHandler.exceptionStack(0)));
			}
		};
	}
	,executeMethod: function(name) {
		if(name == null) {
			return;
		}
		this.bindHandler();
		Reflect.field(this.fixture.target,name).apply(this.fixture.target,[]);
	}
	,executeAsyncMethod: function(name,done) {
		if(name == null) {
			done();
			return;
		}
		this.bindHandler();
		Reflect.field(this.fixture.target,name).apply(this.fixture.target,[done]);
	}
	,tested: function() {
		if(this.results.length == 0) {
			this.results.add(utest_Assertation.Warning("no assertions"));
		}
		this.onTested.dispatch(this);
		this.completed();
	}
	,timeout: function() {
		this.results.add(utest_Assertation.TimeoutError(this.asyncStack.length,[]));
		this.onTimeout.dispatch(this);
		this.completed();
	}
	,completed: function() {
		var _gthis = this;
		if(this.fixture.ignoringInfo != null) {
			this.completedFinally();
			return;
		}
		var isSync = true;
		var expectingAsync = true;
		var complete = function() {
			if(isSync) {
				expectingAsync = false;
				return;
			}
			_gthis.completedFinally();
		};
		try {
			this.executeMethod(this.fixture.teardown);
			this.executeAsyncMethod(this.fixture.teardownAsync,complete);
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g).unwrap();
			this.results.add(utest_Assertation.TeardownError(_g1,utest_TestHandler.exceptionStack(2)));
		}
		isSync = false;
		if(!expectingAsync) {
			this.completedFinally();
		}
	}
	,completedFinally: function() {
		this.finished = true;
		this.unbindHandler();
		this.onComplete.dispatch(this);
	}
	,__class__: utest_TestHandler
};
var utest_ITestHandler = function(fixture) {
	utest_TestHandler.call(this,fixture);
	if(!fixture.isITest) {
		throw haxe_Exception.thrown("Invalid fixture type for utest.ITestHandler");
	}
	this.testCase = js_Boot.__cast(fixture.target , utest_ITest);
	this.test = fixture.test;
	if(this.test == null) {
		throw haxe_Exception.thrown("Fixture is missing test data");
	}
};
utest_ITestHandler.__name__ = "utest.ITestHandler";
utest_ITestHandler.__super__ = utest_TestHandler;
utest_ITestHandler.prototype = $extend(utest_TestHandler.prototype,{
	testCase: null
	,test: null
	,setupAsync: null
	,testAsync: null
	,teardownAsync: null
	,execute: function() {
		if(this.fixture.ignoringInfo != null) {
			this.executeFinally();
			return;
		}
		this.bindHandler();
		this.runSetup();
	}
	,runSetup: function() {
		try {
			this.setupAsync = this.fixture.setupMethod();
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g).unwrap();
			this.results.add(utest_Assertation.SetupError(_g1,haxe_CallStack.exceptionStack()));
			this.completedFinally();
			return;
		}
		this.setupAsync.then($bind(this,this.checkSetup));
	}
	,checkSetup: function() {
		if(this.setupAsync.timedOut) {
			this.results.add(utest_Assertation.SetupError("Setup timeout",[]));
			this.completedFinally();
		} else {
			this.runTest();
		}
	}
	,runTest: function() {
		try {
			this.testAsync = this.test.execute();
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g).unwrap();
			this.results.add(utest_Assertation.Error(_g1,haxe_CallStack.exceptionStack()));
			this.runTeardown();
			return;
		}
		this.testAsync.then($bind(this,this.checkTest));
	}
	,checkTest: function() {
		this.onPrecheck.dispatch(this);
		if(this.testAsync.timedOut) {
			this.results.add(utest_Assertation.TimeoutError(1,[]));
			this.onTimeout.dispatch(this);
		} else if(this.testAsync.resolved) {
			if(this.results.length == 0) {
				this.results.add(utest_Assertation.Warning("no assertions"));
			}
			this.onTested.dispatch(this);
		} else {
			throw haxe_Exception.thrown("Unexpected test state");
		}
		this.runTeardown();
	}
	,runTeardown: function() {
		try {
			this.teardownAsync = this.fixture.teardownMethod();
		} catch( _g ) {
			var _g1 = haxe_Exception.caught(_g).unwrap();
			this.results.add(utest_Assertation.TeardownError(_g1,haxe_CallStack.exceptionStack()));
			this.completedFinally();
			return;
		}
		this.teardownAsync.then($bind(this,this.checkTeardown));
	}
	,checkTeardown: function() {
		if(this.teardownAsync.timedOut) {
			this.results.add(utest_Assertation.TeardownError("Teardown timeout",[]));
		}
		this.completedFinally();
	}
	,bindHandler: function() {
		if(this.wasBound) {
			return;
		}
		utest_Assert.results = this.results;
		var msg = " is not allowed in tests extending utest.ITest. Add `async:utest.Async` argument to the test method instead.";
		utest_Assert.createAsync = function(f,t) {
			throw haxe_Exception.thrown("Assert.createAsync() " + msg);
		};
		utest_Assert.createEvent = function(f,t) {
			throw haxe_Exception.thrown("Assert.createEvent() " + msg);
		};
		this.wasBound = true;
	}
	,__class__: utest_ITestHandler
});
var utest_IgnoredFixture = {};
utest_IgnoredFixture.__properties__ = {get_ignoreReason:"get_ignoreReason",get_isIgnored:"get_isIgnored"};
utest_IgnoredFixture.NotIgnored = function() {
	return null;
};
utest_IgnoredFixture.Ignored = function(reason) {
	return reason != null ? reason : "";
};
utest_IgnoredFixture._new = function(reason) {
	return reason;
};
utest_IgnoredFixture.get_isIgnored = function(this1) {
	return this1 != null;
};
utest_IgnoredFixture.get_ignoreReason = function(this1) {
	return this1;
};
var utest_Runner = function() {
	this.executedFixtures = 0;
	this.pos = 0;
	this.complete = false;
	this.globalPattern = null;
	this.iTestFixtures = new haxe_ds_StringMap();
	this.fixtures = [];
	this.onProgress = new utest_Dispatcher();
	this.onStart = new utest_Dispatcher();
	this.onComplete = new utest_Dispatcher();
	this.onPrecheck = new utest_Dispatcher();
	this.onTestStart = new utest_Dispatcher();
	this.onTestComplete = new utest_Dispatcher();
	this.length = 0;
};
utest_Runner.__name__ = "utest.Runner";
utest_Runner.prototype = {
	fixtures: null
	,iTestFixtures: null
	,onProgress: null
	,onStart: null
	,onComplete: null
	,onPrecheck: null
	,onTestStart: null
	,onTestComplete: null
	,length: null
	,globalPattern: null
	,complete: null
	,addCase: function(test,setup,teardown,prefix,pattern,setupAsync,teardownAsync) {
		if(teardownAsync == null) {
			teardownAsync = "teardownAsync";
		}
		if(setupAsync == null) {
			setupAsync = "setupAsync";
		}
		if(prefix == null) {
			prefix = "test";
		}
		if(teardown == null) {
			teardown = "teardown";
		}
		if(setup == null) {
			setup = "setup";
		}
		if(js_Boot.__implements(test,utest_ITest)) {
			this.addITest(test,pattern);
		} else {
			this.addCaseOld(test,setup,teardown,prefix,pattern,setupAsync,teardownAsync);
		}
	}
	,addITest: function(testCase,pattern) {
		var c = js_Boot.getClass(testCase);
		var className = c.__name__;
		if(Object.prototype.hasOwnProperty.call(this.iTestFixtures.h,className)) {
			throw haxe_Exception.thrown("Cannot add the same test twice.");
		}
		var fixtures = [];
		var init = testCase.__initializeUtest__();
		var _g = 0;
		var _g1 = init.tests;
		while(_g < _g1.length) {
			var test = _g1[_g];
			++_g;
			if(!this.isTestFixtureName(className,test.name,["test","spec"],pattern,this.globalPattern)) {
				continue;
			}
			var fixture = utest_TestFixture.ofData(testCase,test,init.accessories);
			this.addFixture(fixture);
			fixtures.push(fixture);
		}
		if(fixtures.length > 0) {
			this.iTestFixtures.h[className] = { caseInstance : testCase, setupClass : utest_utils_AccessoriesUtils.getSetupClass(init.accessories), dependencies : init.dependencies, fixtures : fixtures, teardownClass : utest_utils_AccessoriesUtils.getTeardownClass(init.accessories)};
		}
	}
	,addCaseOld: function(test,setup,teardown,prefix,pattern,setupAsync,teardownAsync) {
		if(teardownAsync == null) {
			teardownAsync = "teardownAsync";
		}
		if(setupAsync == null) {
			setupAsync = "setupAsync";
		}
		if(prefix == null) {
			prefix = "test";
		}
		if(teardown == null) {
			teardown = "teardown";
		}
		if(setup == null) {
			setup = "setup";
		}
		if(!Reflect.isObject(test)) {
			throw haxe_Exception.thrown("can't add a null object as a test case");
		}
		if(!this.isMethod(test,setup)) {
			setup = null;
		}
		if(!this.isMethod(test,setupAsync)) {
			setupAsync = null;
		}
		if(!this.isMethod(test,teardown)) {
			teardown = null;
		}
		if(!this.isMethod(test,teardownAsync)) {
			teardownAsync = null;
		}
		var fields = Type.getInstanceFields(js_Boot.getClass(test));
		var c = js_Boot.getClass(test);
		var className = c.__name__;
		var _g = 0;
		while(_g < fields.length) {
			var field = fields[_g];
			++_g;
			if(!this.isMethod(test,field)) {
				continue;
			}
			if(!this.isTestFixtureName(className,field,[prefix],pattern,this.globalPattern)) {
				continue;
			}
			this.addFixture(new utest_TestFixture(test,field,setup,teardown,setupAsync,teardownAsync));
		}
	}
	,isTestFixtureName: function(caseName,testName,prefixes,pattern,globalPattern) {
		if(pattern == null && globalPattern == null) {
			var _g = 0;
			while(_g < prefixes.length) if(StringTools.startsWith(testName,prefixes[_g++])) {
				return true;
			}
			return false;
		}
		if(pattern == null) {
			pattern = globalPattern;
		}
		return pattern.match("" + caseName + "." + testName);
	}
	,addFixture: function(fixture) {
		this.fixtures.push(fixture);
		this.length++;
	}
	,getFixture: function(index) {
		return this.fixtures[index];
	}
	,isMethod: function(test,name) {
		try {
			return Reflect.isFunction(Reflect.field(test,name));
		} catch( _g ) {
			return false;
		}
	}
	,run: function() {
		this.onStart.dispatch(this);
		new utest__$Runner_ITestRunner(this).run();
		this.waitForCompletion();
	}
	,waitForCompletion: function() {
		if(!this.complete) {
			haxe_Timer.delay($bind(this,this.waitForCompletion),100);
		}
	}
	,pos: null
	,executedFixtures: null
	,runNext: function(finishedHandler) {
		var currentCase = null;
		var _g = this.pos;
		var _g1 = this.fixtures.length;
		while(_g < _g1) {
			_g++;
			var fixture = this.fixtures[this.pos++];
			if(fixture.isITest) {
				continue;
			}
			if(currentCase != fixture.target) {
				currentCase = fixture.target;
				var c = js_Boot.getClass(currentCase);
				c.__name__;
			}
			var handler = this.runFixture(fixture);
			if(!handler.finished) {
				handler.onComplete.add($bind(this,this.runNext));
				return;
			}
		}
		this.complete = true;
		this.onComplete.dispatch(this);
	}
	,runFixture: function(fixture) {
		var handler = fixture.isITest ? new utest_ITestHandler(fixture) : new utest_TestHandler(fixture);
		handler.onComplete.add($bind(this,this.testComplete));
		handler.onPrecheck.add(($_=this.onPrecheck,$bind($_,$_.dispatch)));
		this.onTestStart.dispatch(handler);
		handler.execute();
		return handler;
	}
	,testComplete: function(h) {
		++this.executedFixtures;
		this.onTestComplete.dispatch(h);
		this.onProgress.dispatch({ result : utest_TestResult.ofHandler(h), done : this.executedFixtures, totals : this.length});
	}
	,__class__: utest_Runner
};
var utest__$Runner_ITestRunner = function(runner) {
	this.failedCases = [];
	this.failedTestsInCurrentCase = [];
	var _gthis = this;
	this.runner = runner;
	runner.onTestComplete.add(function(handler) {
		var _g_head = handler.results.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			if(val._hx_index != 0) {
				_gthis.failedTestsInCurrentCase.push(handler.fixture.method);
				var c = js_Boot.getClass(handler.fixture.target);
				_gthis.failedCases.push(c.__name__);
			}
		}
	});
};
utest__$Runner_ITestRunner.__name__ = "utest._Runner.ITestRunner";
utest__$Runner_ITestRunner.prototype = {
	runner: null
	,cases: null
	,currentCaseName: null
	,currentCase: null
	,currentCaseFixtures: null
	,teardownClass: null
	,setupAsync: null
	,teardownAsync: null
	,failedTestsInCurrentCase: null
	,failedCases: null
	,run: function() {
		this.cases = this.orderClassesByDependencies();
		this.runCases();
	}
	,orderClassesByDependencies: function() {
		var _gthis = this;
		var result = [];
		var error = function(testCase,msg) {
			_gthis.runner.onProgress.dispatch({ totals : _gthis.runner.length, result : utest_TestResult.ofFailedSetupClass(testCase,utest_Assertation.SetupError(msg,[])), done : _gthis.runner.executedFixtures});
		};
		var added_h = Object.create(null);
		var addClass = null;
		addClass = function(cls,stack) {
			if(Object.prototype.hasOwnProperty.call(added_h,cls)) {
				return;
			}
			var data = _gthis.runner.iTestFixtures.h[cls];
			if(stack.indexOf(cls) >= 0) {
				error(data.caseInstance,"Circular dependencies among test classes detected: " + stack.join(" -> "));
				return;
			}
			stack.push(cls);
			var dependencies = data.dependencies;
			var _g = 0;
			while(_g < dependencies.length) {
				var dependency = dependencies[_g];
				++_g;
				if(Object.prototype.hasOwnProperty.call(_gthis.runner.iTestFixtures.h,dependency)) {
					addClass(dependency,stack);
				} else {
					error(data.caseInstance,"This class depends on " + dependency + ", but it cannot be found. Was it added to test runner?");
					return;
				}
			}
			result.push(cls);
			added_h[cls] = true;
		};
		var cls_keys = Object.keys(this.runner.iTestFixtures.h);
		var cls_length = cls_keys.length;
		var cls_current = 0;
		while(cls_current < cls_length) addClass(cls_keys[cls_current++],[]);
		return new haxe_iterators_ArrayIterator(result);
	}
	,failedDependencies: function(data) {
		var _g = 0;
		var _g1 = data.dependencies;
		while(_g < _g1.length) if(this.failedCases.indexOf(_g1[_g++]) >= 0) {
			return true;
		}
		return false;
	}
	,runCases: function() {
		while(this.cases.hasNext()) {
			this.currentCaseName = this.cases.next();
			var data = this.runner.iTestFixtures.h[this.currentCaseName];
			this.currentCase = data.caseInstance;
			this.failedTestsInCurrentCase = [];
			if(this.failedDependencies(data)) {
				this.failedCases.push(this.currentCaseName);
				continue;
			}
			this.currentCaseFixtures = data.fixtures;
			this.teardownClass = data.teardownClass;
			try {
				this.setupAsync = data.setupClass();
			} catch( _g ) {
				this.setupFailed(utest_Assertation.SetupError("setupClass failed: " + Std.string(haxe_Exception.caught(_g).unwrap()),haxe_CallStack.exceptionStack()));
				return;
			}
			if(this.setupAsync.resolved) {
				if(!this.runFixtures()) {
					return;
				}
			} else {
				this.setupAsync.then($bind(this,this.checkSetup));
				return;
			}
		}
		this.runner.runNext();
	}
	,checkSetup: function() {
		if(this.setupAsync.timedOut) {
			this.setupFailed(utest_Assertation.SetupError("setupClass timeout",[]));
		} else {
			this.runFixtures();
		}
	}
	,setupFailed: function(assertation) {
		this.runner.executedFixtures += this.currentCaseFixtures.length;
		this.runner.onProgress.dispatch({ totals : this.runner.length, result : utest_TestResult.ofFailedSetupClass(this.currentCase,assertation), done : this.runner.executedFixtures});
		this.runCases();
	}
	,runFixtures: function(finishedHandler) {
		while(this.currentCaseFixtures.length > 0) {
			var fixture = this.currentCaseFixtures.shift();
			var _g = 0;
			var _g1 = fixture.test.dependencies;
			while(_g < _g1.length) if(this.failedTestsInCurrentCase.indexOf(_g1[_g++]) >= 0) {
				fixture.ignoringInfo = utest_IgnoredFixture.Ignored("Failed dependencies");
				break;
			}
			var handler = this.runner.runFixture(fixture);
			if(!handler.finished) {
				handler.onComplete.add($bind(this,this.runFixtures));
				return false;
			}
		}
		try {
			this.teardownAsync = this.teardownClass();
		} catch( _g ) {
			this.teardownFailed(utest_Assertation.TeardownError("teardownClass failed: " + Std.string(haxe_Exception.caught(_g).unwrap()),haxe_CallStack.exceptionStack()));
			return true;
		}
		if(this.teardownAsync.resolved && finishedHandler == null) {
			return true;
		}
		this.teardownAsync.then($bind(this,this.checkTeardown));
		return false;
	}
	,checkTeardown: function() {
		if(this.teardownAsync.timedOut) {
			this.teardownFailed(utest_Assertation.TeardownError("teardownClass timeout",[]));
		}
		this.runCases();
	}
	,teardownFailed: function(assertation) {
		this.runner.onProgress.dispatch({ totals : this.runner.length, result : utest_TestResult.ofFailedTeardownClass(this.currentCase,assertation), done : this.runner.executedFixtures});
	}
	,__class__: utest__$Runner_ITestRunner
};
var utest_AccessoryName = function() { };
utest_AccessoryName.__name__ = "utest.AccessoryName";
var utest_TestFixture = function(target,method,setup,teardown,setupAsync,teardownAsync) {
	this.isITest = false;
	this.target = target;
	this.method = method;
	this.setup = setup;
	this.setupAsync = setupAsync;
	this.teardown = teardown;
	this.teardownAsync = teardownAsync;
	this.ignoringInfo = this.getIgnored();
};
utest_TestFixture.__name__ = "utest.TestFixture";
utest_TestFixture.ofData = function(target,test,accessories) {
	var fixture = new utest_TestFixture(target,test.name);
	fixture.isITest = true;
	fixture.test = test;
	fixture.setupMethod = utest_utils_AccessoriesUtils.getSetup(accessories);
	fixture.teardownMethod = utest_utils_AccessoriesUtils.getTeardown(accessories);
	return fixture;
};
utest_TestFixture.prototype = {
	target: null
	,method: null
	,setup: null
	,setupAsync: null
	,teardown: null
	,teardownAsync: null
	,ignoringInfo: null
	,isITest: null
	,test: null
	,setupMethod: null
	,teardownMethod: null
	,checkMethod: function(name,arg) {
		var field = Reflect.field(this.target,name);
		if(field == null) {
			throw haxe_Exception.thrown(arg + " function " + name + " is not a field of target");
		}
		if(!Reflect.isFunction(field)) {
			throw haxe_Exception.thrown(arg + " function " + name + " is not a function");
		}
	}
	,getIgnored: function() {
		var metasForTestMetas = Reflect.getProperty(haxe_rtti_Meta.getFields(js_Boot.getClass(this.target)),this.method);
		if(metasForTestMetas == null || !Object.prototype.hasOwnProperty.call(metasForTestMetas,"Ignored")) {
			return utest_IgnoredFixture.NotIgnored();
		}
		var ignoredArgs = Reflect.getProperty(metasForTestMetas,"Ignored");
		if(ignoredArgs == null || ignoredArgs.length == 0 || ignoredArgs[0] == null) {
			return utest_IgnoredFixture.Ignored();
		}
		return utest_IgnoredFixture.Ignored(Std.string(ignoredArgs[0]));
	}
	,__class__: utest_TestFixture
};
var utest_TestResult = function() {
};
utest_TestResult.__name__ = "utest.TestResult";
utest_TestResult.ofHandler = function(handler) {
	var r = new utest_TestResult();
	var c = js_Boot.getClass(handler.fixture.target);
	var path = c.__name__.split(".");
	r.cls = path.pop();
	r.pack = path.join(".");
	r.method = handler.fixture.method;
	r.setup = handler.fixture.setup;
	r.setupAsync = handler.fixture.setupAsync;
	r.teardown = handler.fixture.teardown;
	r.teardownAsync = handler.fixture.teardownAsync;
	r.assertations = handler.results;
	return r;
};
utest_TestResult.ofFailedSetupClass = function(testCase,assertation) {
	var r = new utest_TestResult();
	var c = js_Boot.getClass(testCase);
	var path = c.__name__.split(".");
	r.cls = path.pop();
	r.pack = path.join(".");
	r.method = "setup";
	r.assertations = new haxe_ds_List();
	r.assertations.add(assertation);
	return r;
};
utest_TestResult.ofFailedTeardownClass = function(testCase,assertation) {
	var r = new utest_TestResult();
	var c = js_Boot.getClass(testCase);
	var path = c.__name__.split(".");
	r.cls = path.pop();
	r.pack = path.join(".");
	r.method = "setup";
	r.assertations = new haxe_ds_List();
	r.assertations.add(assertation);
	return r;
};
utest_TestResult.prototype = {
	pack: null
	,cls: null
	,method: null
	,setup: null
	,setupAsync: null
	,teardown: null
	,teardownAsync: null
	,assertations: null
	,__class__: utest_TestResult
};
var utest_UTest = function() { };
utest_UTest.__name__ = "utest.UTest";
utest_UTest.run = function(cases,callback) {
	var runner = new utest_Runner();
	var _g = 0;
	while(_g < cases.length) runner.addCase(cases[_g++]);
	if(null != callback) {
		runner.onComplete.add(function(_) {
			callback();
		});
	}
	utest_ui_Report.create(runner);
	runner.run();
};
var utest_ui_Report = function() { };
utest_ui_Report.__name__ = "utest.ui.Report";
utest_ui_Report.create = function(runner,displaySuccessResults,headerDisplayMode) {
	var report;
	if(typeof window != 'undefined') {
		report = new utest_ui_text_HtmlReport(runner,null,true);
	} else {
		report = new utest_ui_text_PrintReport(runner);
	}
	if(null == displaySuccessResults) {
		report.displaySuccessResults = utest_ui_common_SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors;
	} else {
		report.displaySuccessResults = displaySuccessResults;
	}
	if(null == headerDisplayMode) {
		report.displayHeader = utest_ui_common_HeaderDisplayMode.ShowHeaderWithResults;
	} else {
		report.displayHeader = headerDisplayMode;
	}
	return report;
};
var utest_ui_common_ClassResult = function(className,setupName,teardownName) {
	this.fixtures = new haxe_ds_StringMap();
	this.className = className;
	this.setupName = setupName;
	this.hasSetup = setupName != null;
	this.teardownName = teardownName;
	this.hasTeardown = teardownName != null;
	this.methods = 0;
	this.stats = new utest_ui_common_ResultStats();
};
utest_ui_common_ClassResult.__name__ = "utest.ui.common.ClassResult";
utest_ui_common_ClassResult.prototype = {
	fixtures: null
	,className: null
	,setupName: null
	,teardownName: null
	,hasSetup: null
	,hasTeardown: null
	,methods: null
	,stats: null
	,add: function(result) {
		if(Object.prototype.hasOwnProperty.call(this.fixtures.h,result.methodName)) {
			throw haxe_Exception.thrown("invalid duplicated fixture: " + this.className + "." + result.methodName);
		}
		this.stats.wire(result.stats);
		this.methods++;
		this.fixtures.h[result.methodName] = result;
	}
	,get: function(method) {
		return this.fixtures.h[method];
	}
	,exists: function(method) {
		return Object.prototype.hasOwnProperty.call(this.fixtures.h,method);
	}
	,methodNames: function(errorsHavePriority) {
		if(errorsHavePriority == null) {
			errorsHavePriority = true;
		}
		var names = [];
		var name_keys = Object.keys(this.fixtures.h);
		var name_length = name_keys.length;
		var name_current = 0;
		while(name_current < name_length) names.push(name_keys[name_current++]);
		if(errorsHavePriority) {
			var me = this;
			names.sort(function(a,b) {
				var as = me.get(a).stats;
				var bs = me.get(b).stats;
				if(as.hasErrors) {
					if(!bs.hasErrors) {
						return -1;
					} else if(as.errors == bs.errors) {
						return Reflect.compare(a,b);
					} else {
						return Reflect.compare(as.errors,bs.errors);
					}
				} else if(bs.hasErrors) {
					return 1;
				} else if(as.hasFailures) {
					if(!bs.hasFailures) {
						return -1;
					} else if(as.failures == bs.failures) {
						return Reflect.compare(a,b);
					} else {
						return Reflect.compare(as.failures,bs.failures);
					}
				} else if(bs.hasFailures) {
					return 1;
				} else if(as.hasWarnings) {
					if(!bs.hasWarnings) {
						return -1;
					} else if(as.warnings == bs.warnings) {
						return Reflect.compare(a,b);
					} else {
						return Reflect.compare(as.warnings,bs.warnings);
					}
				} else if(bs.hasWarnings) {
					return 1;
				} else {
					return Reflect.compare(a,b);
				}
			});
		} else {
			names.sort(function(a,b) {
				return Reflect.compare(a,b);
			});
		}
		return names;
	}
	,__class__: utest_ui_common_ClassResult
};
var utest_ui_common_FixtureResult = function(methodName) {
	this.methodName = methodName;
	this.list = new haxe_ds_List();
	this.hasTestError = false;
	this.hasSetupError = false;
	this.hasTeardownError = false;
	this.hasTimeoutError = false;
	this.hasAsyncError = false;
	this.stats = new utest_ui_common_ResultStats();
};
utest_ui_common_FixtureResult.__name__ = "utest.ui.common.FixtureResult";
utest_ui_common_FixtureResult.prototype = {
	methodName: null
	,hasTestError: null
	,hasSetupError: null
	,hasTeardownError: null
	,hasTimeoutError: null
	,hasAsyncError: null
	,stats: null
	,list: null
	,iterator: function() {
		return new haxe_ds__$List_ListIterator(this.list.h);
	}
	,add: function(assertation) {
		this.list.add(assertation);
		switch(assertation._hx_index) {
		case 0:
			this.stats.addSuccesses(1);
			break;
		case 1:
			this.stats.addFailures(1);
			break;
		case 2:
			this.stats.addErrors(1);
			break;
		case 3:
			this.stats.addErrors(1);
			this.hasSetupError = true;
			break;
		case 4:
			this.stats.addErrors(1);
			this.hasTeardownError = true;
			break;
		case 5:
			this.stats.addErrors(1);
			this.hasTimeoutError = true;
			break;
		case 6:
			this.stats.addErrors(1);
			this.hasAsyncError = true;
			break;
		case 7:
			this.stats.addWarnings(1);
			break;
		case 8:
			this.stats.addIgnores(1);
			break;
		}
	}
	,__class__: utest_ui_common_FixtureResult
};
var utest_ui_common_HeaderDisplayMode = $hxEnums["utest.ui.common.HeaderDisplayMode"] = { __ename__:"utest.ui.common.HeaderDisplayMode",__constructs__:null
	,AlwaysShowHeader: {_hx_name:"AlwaysShowHeader",_hx_index:0,__enum__:"utest.ui.common.HeaderDisplayMode",toString:$estr}
	,NeverShowHeader: {_hx_name:"NeverShowHeader",_hx_index:1,__enum__:"utest.ui.common.HeaderDisplayMode",toString:$estr}
	,ShowHeaderWithResults: {_hx_name:"ShowHeaderWithResults",_hx_index:2,__enum__:"utest.ui.common.HeaderDisplayMode",toString:$estr}
};
utest_ui_common_HeaderDisplayMode.__constructs__ = [utest_ui_common_HeaderDisplayMode.AlwaysShowHeader,utest_ui_common_HeaderDisplayMode.NeverShowHeader,utest_ui_common_HeaderDisplayMode.ShowHeaderWithResults];
var utest_ui_common_SuccessResultsDisplayMode = $hxEnums["utest.ui.common.SuccessResultsDisplayMode"] = { __ename__:"utest.ui.common.SuccessResultsDisplayMode",__constructs__:null
	,AlwaysShowSuccessResults: {_hx_name:"AlwaysShowSuccessResults",_hx_index:0,__enum__:"utest.ui.common.SuccessResultsDisplayMode",toString:$estr}
	,NeverShowSuccessResults: {_hx_name:"NeverShowSuccessResults",_hx_index:1,__enum__:"utest.ui.common.SuccessResultsDisplayMode",toString:$estr}
	,ShowSuccessResultsWithNoErrors: {_hx_name:"ShowSuccessResultsWithNoErrors",_hx_index:2,__enum__:"utest.ui.common.SuccessResultsDisplayMode",toString:$estr}
};
utest_ui_common_SuccessResultsDisplayMode.__constructs__ = [utest_ui_common_SuccessResultsDisplayMode.AlwaysShowSuccessResults,utest_ui_common_SuccessResultsDisplayMode.NeverShowSuccessResults,utest_ui_common_SuccessResultsDisplayMode.ShowSuccessResultsWithNoErrors];
var utest_ui_common_IReport = function() { };
utest_ui_common_IReport.__name__ = "utest.ui.common.IReport";
utest_ui_common_IReport.__isInterface__ = true;
utest_ui_common_IReport.prototype = {
	displaySuccessResults: null
	,displayHeader: null
	,setHandler: null
	,__class__: utest_ui_common_IReport
};
var utest_ui_common_PackageResult = function(packageName) {
	this.isEmpty = true;
	this.packageName = packageName;
	this.classes = new haxe_ds_StringMap();
	this.packages = new haxe_ds_StringMap();
	this.stats = new utest_ui_common_ResultStats();
};
utest_ui_common_PackageResult.__name__ = "utest.ui.common.PackageResult";
utest_ui_common_PackageResult.prototype = {
	packageName: null
	,isEmpty: null
	,classes: null
	,packages: null
	,stats: null
	,addResult: function(result,flattenPackage) {
		this.isEmpty = false;
		this.getOrCreateClass(this.getOrCreatePackage(result.pack,flattenPackage,this),result.cls,result.setup,result.teardown).add(this.createFixture(result.method,result.assertations));
	}
	,addClass: function(result) {
		this.isEmpty = false;
		this.classes.h[result.className] = result;
		this.stats.wire(result.stats);
	}
	,addPackage: function(result) {
		this.isEmpty = false;
		this.packages.h[result.packageName] = result;
		this.stats.wire(result.stats);
	}
	,existsPackage: function(name) {
		return Object.prototype.hasOwnProperty.call(this.packages.h,name);
	}
	,existsClass: function(name) {
		return Object.prototype.hasOwnProperty.call(this.classes.h,name);
	}
	,getPackage: function(name) {
		if(this.packageName == null && name == "") {
			return this;
		}
		return this.packages.h[name];
	}
	,getClass: function(name) {
		return this.classes.h[name];
	}
	,classNames: function(errorsHavePriority) {
		if(errorsHavePriority == null) {
			errorsHavePriority = true;
		}
		var names = [];
		var name_keys = Object.keys(this.classes.h);
		var name_length = name_keys.length;
		var name_current = 0;
		while(name_current < name_length) names.push(name_keys[name_current++]);
		if(errorsHavePriority) {
			var me = this;
			names.sort(function(a,b) {
				var as = me.getClass(a).stats;
				var bs = me.getClass(b).stats;
				if(as.hasErrors) {
					if(!bs.hasErrors) {
						return -1;
					} else if(as.errors == bs.errors) {
						return Reflect.compare(a,b);
					} else {
						return Reflect.compare(as.errors,bs.errors);
					}
				} else if(bs.hasErrors) {
					return 1;
				} else if(as.hasFailures) {
					if(!bs.hasFailures) {
						return -1;
					} else if(as.failures == bs.failures) {
						return Reflect.compare(a,b);
					} else {
						return Reflect.compare(as.failures,bs.failures);
					}
				} else if(bs.hasFailures) {
					return 1;
				} else if(as.hasWarnings) {
					if(!bs.hasWarnings) {
						return -1;
					} else if(as.warnings == bs.warnings) {
						return Reflect.compare(a,b);
					} else {
						return Reflect.compare(as.warnings,bs.warnings);
					}
				} else if(bs.hasWarnings) {
					return 1;
				} else {
					return Reflect.compare(a,b);
				}
			});
		} else {
			names.sort(function(a,b) {
				return Reflect.compare(a,b);
			});
		}
		return names;
	}
	,packageNames: function(errorsHavePriority) {
		if(errorsHavePriority == null) {
			errorsHavePriority = true;
		}
		var names = [];
		if(this.packageName == null) {
			names.push("");
		}
		var name_keys = Object.keys(this.packages.h);
		var name_length = name_keys.length;
		var name_current = 0;
		while(name_current < name_length) names.push(name_keys[name_current++]);
		if(errorsHavePriority) {
			var me = this;
			names.sort(function(a,b) {
				var as = me.getPackage(a).stats;
				var bs = me.getPackage(b).stats;
				if(as.hasErrors) {
					if(!bs.hasErrors) {
						return -1;
					} else if(as.errors == bs.errors) {
						return Reflect.compare(a,b);
					} else {
						return Reflect.compare(as.errors,bs.errors);
					}
				} else if(bs.hasErrors) {
					return 1;
				} else if(as.hasFailures) {
					if(!bs.hasFailures) {
						return -1;
					} else if(as.failures == bs.failures) {
						return Reflect.compare(a,b);
					} else {
						return Reflect.compare(as.failures,bs.failures);
					}
				} else if(bs.hasFailures) {
					return 1;
				} else if(as.hasWarnings) {
					if(!bs.hasWarnings) {
						return -1;
					} else if(as.warnings == bs.warnings) {
						return Reflect.compare(a,b);
					} else {
						return Reflect.compare(as.warnings,bs.warnings);
					}
				} else if(bs.hasWarnings) {
					return 1;
				} else {
					return Reflect.compare(a,b);
				}
			});
		} else {
			names.sort(function(a,b) {
				return Reflect.compare(a,b);
			});
		}
		return names;
	}
	,createFixture: function(method,assertations) {
		var f = new utest_ui_common_FixtureResult(method);
		var assertation = $getIterator(assertations);
		while(assertation.hasNext()) f.add(assertation.next());
		return f;
	}
	,getOrCreateClass: function(pack,cls,setup,teardown) {
		if(pack.existsClass(cls)) {
			return pack.getClass(cls);
		}
		var c = new utest_ui_common_ClassResult(cls,setup,teardown);
		pack.addClass(c);
		return c;
	}
	,getOrCreatePackage: function(pack,flat,ref) {
		if(pack == null || pack == "") {
			return ref;
		}
		if(flat) {
			if(ref.existsPackage(pack)) {
				return ref.getPackage(pack);
			}
			var p = new utest_ui_common_PackageResult(pack);
			ref.addPackage(p);
			return p;
		} else {
			var parts = pack.split(".");
			var _g = 0;
			while(_g < parts.length) ref = this.getOrCreatePackage(parts[_g++],true,ref);
			return ref;
		}
	}
	,__class__: utest_ui_common_PackageResult
};
var utest_ui_common_ReportTools = function() { };
utest_ui_common_ReportTools.__name__ = "utest.ui.common.ReportTools";
utest_ui_common_ReportTools.hasHeader = function(report,stats) {
	switch(report.displayHeader._hx_index) {
	case 0:
		return true;
	case 1:
		return false;
	case 2:
		if(!stats.isOk) {
			return true;
		}
		switch(report.displaySuccessResults._hx_index) {
		case 0:case 2:
			return true;
		case 1:
			return false;
		}
		break;
	}
};
utest_ui_common_ReportTools.skipResult = function(report,stats,isOk) {
	if(!stats.isOk) {
		return false;
	}
	switch(report.displaySuccessResults._hx_index) {
	case 0:
		return false;
	case 1:
		return true;
	case 2:
		return !isOk;
	}
};
utest_ui_common_ReportTools.hasOutput = function(report,stats) {
	if(!stats.isOk) {
		return true;
	}
	return utest_ui_common_ReportTools.hasHeader(report,stats);
};
var utest_ui_common_ResultAggregator = function(runner,flattenPackage) {
	if(flattenPackage == null) {
		flattenPackage = false;
	}
	if(runner == null) {
		throw haxe_Exception.thrown("runner argument is null");
	}
	this.flattenPackage = flattenPackage;
	this.runner = runner;
	runner.onStart.add($bind(this,this.start));
	runner.onProgress.add($bind(this,this.progress));
	runner.onComplete.add($bind(this,this.complete));
	this.onStart = new utest_Notifier();
	this.onComplete = new utest_Dispatcher();
	this.onProgress = new utest_Dispatcher();
};
utest_ui_common_ResultAggregator.__name__ = "utest.ui.common.ResultAggregator";
utest_ui_common_ResultAggregator.prototype = {
	runner: null
	,flattenPackage: null
	,root: null
	,onStart: null
	,onComplete: null
	,onProgress: null
	,start: function(runner) {
		this.checkNonITest();
		this.root = new utest_ui_common_PackageResult(null);
		this.onStart.dispatch();
	}
	,checkNonITest: function() {
		var first = null;
		var total = 0;
		var _g = 0;
		var _g1 = this.runner.length;
		while(_g < _g1) {
			var fixture = this.runner.getFixture(_g++);
			if(!fixture.isITest) {
				++total;
				if(first == null) {
					var c = js_Boot.getClass(fixture.target);
					first = c.__name__;
				}
			}
		}
		if(total > 0) {
			var baseMsg = "implement utest.ITest. Non-ITest tests are deprecated. Implement utest.ITest or extend utest.Test.";
			var msg;
			switch(total) {
			case 1:
				msg = "" + first + " doesn't " + baseMsg;
				break;
			case 2:
				msg = "" + first + " and 1 other don't " + baseMsg;
				break;
			default:
				msg = "" + first + " and " + total + " others don't " + baseMsg;
			}
			haxe_Log.trace(msg,{ fileName : "utest/ui/common/ResultAggregator.hx", lineNumber : 54, className : "utest.ui.common.ResultAggregator", methodName : "checkNonITest"});
		}
	}
	,getOrCreatePackage: function(pack,flat,ref) {
		if(ref == null) {
			ref = this.root;
		}
		if(pack == null || pack == "") {
			return ref;
		}
		if(flat) {
			if(ref.existsPackage(pack)) {
				return ref.getPackage(pack);
			}
			var p = new utest_ui_common_PackageResult(pack);
			ref.addPackage(p);
			return p;
		} else {
			var parts = pack.split(".");
			var _g = 0;
			while(_g < parts.length) ref = this.getOrCreatePackage(parts[_g++],true,ref);
			return ref;
		}
	}
	,getOrCreateClass: function(pack,cls,setup,teardown) {
		if(pack.existsClass(cls)) {
			return pack.getClass(cls);
		}
		var c = new utest_ui_common_ClassResult(cls,setup,teardown);
		pack.addClass(c);
		return c;
	}
	,createFixture: function(result) {
		var f = new utest_ui_common_FixtureResult(result.method);
		var _g_head = result.assertations.h;
		while(_g_head != null) {
			var val = _g_head.item;
			_g_head = _g_head.next;
			f.add(val);
		}
		return f;
	}
	,progress: function(e) {
		this.root.addResult(e.result,this.flattenPackage);
		this.onProgress.dispatch(e);
	}
	,complete: function(runner) {
		if(this.root.isEmpty) {
			this.root.addResult(this.createNoTestsResult(),false);
		}
		this.onComplete.dispatch(this.root);
	}
	,createNoTestsResult: function() {
		var result = new utest_TestResult();
		result.pack = "";
		result.cls = "";
		result.method = "";
		result.assertations = new haxe_ds_List();
		result.assertations.add(utest_Assertation.Failure("No tests executed.",{ fileName : "", lineNumber : 1, className : "utest.Runner", methodName : "run"}));
		return result;
	}
	,__class__: utest_ui_common_ResultAggregator
};
var utest_ui_common_ResultStats = function() {
	this.assertations = 0;
	this.successes = 0;
	this.failures = 0;
	this.errors = 0;
	this.warnings = 0;
	this.ignores = 0;
	this.isOk = true;
	this.hasFailures = false;
	this.hasErrors = false;
	this.hasWarnings = false;
	this.hasIgnores = false;
	this.onAddSuccesses = new utest_Dispatcher();
	this.onAddFailures = new utest_Dispatcher();
	this.onAddErrors = new utest_Dispatcher();
	this.onAddWarnings = new utest_Dispatcher();
	this.onAddIgnores = new utest_Dispatcher();
};
utest_ui_common_ResultStats.__name__ = "utest.ui.common.ResultStats";
utest_ui_common_ResultStats.prototype = {
	assertations: null
	,successes: null
	,failures: null
	,errors: null
	,warnings: null
	,ignores: null
	,onAddSuccesses: null
	,onAddFailures: null
	,onAddErrors: null
	,onAddWarnings: null
	,onAddIgnores: null
	,isOk: null
	,hasFailures: null
	,hasErrors: null
	,hasWarnings: null
	,hasIgnores: null
	,addSuccesses: function(v) {
		if(v == 0) {
			return;
		}
		this.assertations += v;
		this.successes += v;
		this.onAddSuccesses.dispatch(v);
	}
	,addFailures: function(v) {
		if(v == 0) {
			return;
		}
		this.assertations += v;
		this.failures += v;
		this.hasFailures = this.failures > 0;
		this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
		this.onAddFailures.dispatch(v);
	}
	,addErrors: function(v) {
		if(v == 0) {
			return;
		}
		this.assertations += v;
		this.errors += v;
		this.hasErrors = this.errors > 0;
		this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
		this.onAddErrors.dispatch(v);
	}
	,addIgnores: function(v) {
		if(v == 0) {
			return;
		}
		this.assertations += v;
		this.ignores += v;
		this.hasIgnores = this.ignores > 0;
		this.onAddIgnores.dispatch(v);
	}
	,addWarnings: function(v) {
		if(v == 0) {
			return;
		}
		this.assertations += v;
		this.warnings += v;
		this.hasWarnings = this.warnings > 0;
		this.isOk = !(this.hasFailures || this.hasErrors || this.hasWarnings);
		this.onAddWarnings.dispatch(v);
	}
	,sum: function(other) {
		this.addSuccesses(other.successes);
		this.addFailures(other.failures);
		this.addErrors(other.errors);
		this.addWarnings(other.warnings);
		this.addIgnores(other.ignores);
	}
	,subtract: function(other) {
		this.addSuccesses(-other.successes);
		this.addFailures(-other.failures);
		this.addErrors(-other.errors);
		this.addWarnings(-other.warnings);
		this.addIgnores(-other.ignores);
	}
	,wire: function(dependant) {
		dependant.onAddSuccesses.add($bind(this,this.addSuccesses));
		dependant.onAddFailures.add($bind(this,this.addFailures));
		dependant.onAddErrors.add($bind(this,this.addErrors));
		dependant.onAddWarnings.add($bind(this,this.addWarnings));
		dependant.onAddIgnores.add($bind(this,this.addIgnores));
		this.sum(dependant);
	}
	,unwire: function(dependant) {
		dependant.onAddSuccesses.remove($bind(this,this.addSuccesses));
		dependant.onAddFailures.remove($bind(this,this.addFailures));
		dependant.onAddErrors.remove($bind(this,this.addErrors));
		dependant.onAddWarnings.remove($bind(this,this.addWarnings));
		dependant.onAddIgnores.remove($bind(this,this.addIgnores));
		this.subtract(dependant);
	}
	,__class__: utest_ui_common_ResultStats
};
var utest_ui_text_HtmlReport = function(runner,outputHandler,traceRedirected) {
	if(traceRedirected == null) {
		traceRedirected = true;
	}
	this.aggregator = new utest_ui_common_ResultAggregator(runner,true);
	runner.onStart.add($bind(this,this.start));
	this.aggregator.onComplete.add($bind(this,this.complete));
	if(null == outputHandler) {
		this.setHandler($bind(this,this._handler));
	} else {
		this.setHandler(outputHandler);
	}
	if(traceRedirected) {
		this.redirectTrace();
	}
	this.displaySuccessResults = utest_ui_common_SuccessResultsDisplayMode.AlwaysShowSuccessResults;
	this.displayHeader = utest_ui_common_HeaderDisplayMode.AlwaysShowHeader;
};
utest_ui_text_HtmlReport.__name__ = "utest.ui.text.HtmlReport";
utest_ui_text_HtmlReport.__interfaces__ = [utest_ui_common_IReport];
utest_ui_text_HtmlReport.prototype = {
	traceRedirected: null
	,displaySuccessResults: null
	,displayHeader: null
	,handler: null
	,aggregator: null
	,oldTrace: null
	,_traces: null
	,setHandler: function(handler) {
		this.handler = handler;
	}
	,redirectTrace: function() {
		if(this.traceRedirected) {
			return;
		}
		this._traces = [];
		this.oldTrace = haxe_Log.trace;
		haxe_Log.trace = $bind(this,this._trace);
	}
	,restoreTrace: function() {
		if(!this.traceRedirected) {
			return;
		}
		haxe_Log.trace = this.oldTrace;
	}
	,_traceTime: null
	,_trace: function(v,infos) {
		var time = HxOverrides.now() / 1000;
		var delta = this._traceTime == null ? 0 : time - this._traceTime;
		this._traces.push({ msg : StringTools.htmlEscape(Std.string(v)), infos : infos, time : time - this.startTime, delta : delta, stack : haxe_CallStack.callStack()});
		this._traceTime = HxOverrides.now() / 1000;
	}
	,startTime: null
	,start: function(e) {
		this.startTime = HxOverrides.now() / 1000;
	}
	,cls: function(stats) {
		if(stats.hasErrors) {
			return "error";
		} else if(stats.hasFailures) {
			return "failure";
		} else if(stats.hasWarnings) {
			return "warn";
		} else {
			return "ok";
		}
	}
	,resultNumbers: function(buf,stats) {
		var numbers = [];
		if(stats.assertations == 1) {
			numbers.push("<strong>1</strong> test");
		} else {
			numbers.push("<strong>" + stats.assertations + "</strong> tests");
		}
		if(stats.successes != stats.assertations) {
			if(stats.successes == 1) {
				numbers.push("<strong>1</strong> pass");
			} else if(stats.successes > 0) {
				numbers.push("<strong>" + stats.successes + "</strong> passes");
			}
		}
		if(stats.errors == 1) {
			numbers.push("<strong>1</strong> error");
		} else if(stats.errors > 0) {
			numbers.push("<strong>" + stats.errors + "</strong> errors");
		}
		if(stats.failures == 1) {
			numbers.push("<strong>1</strong> failure");
		} else if(stats.failures > 0) {
			numbers.push("<strong>" + stats.failures + "</strong> failures");
		}
		if(stats.warnings == 1) {
			numbers.push("<strong>1</strong> warning");
		} else if(stats.warnings > 0) {
			numbers.push("<strong>" + stats.warnings + "</strong> warnings");
		}
		var x = numbers.join(", ");
		buf.b += Std.string(x);
	}
	,blockNumbers: function(buf,stats) {
		var x = "<div class=\"" + this.cls(stats) + "bg statnumbers\">";
		buf.b += Std.string(x);
		this.resultNumbers(buf,stats);
		buf.b += "</div>";
	}
	,formatStack: function(stack,addNL) {
		if(addNL == null) {
			addNL = true;
		}
		var parts = [];
		var nl = addNL ? "\n" : "";
		var last = null;
		var count = 1;
		var _g = 0;
		var _g1 = haxe_CallStack.toString(stack).split("\n");
		while(_g < _g1.length) {
			var part = _g1[_g];
			++_g;
			if(StringTools.trim(part) == "") {
				continue;
			}
			if(-1 < part.indexOf("Called from utest.")) {
				continue;
			}
			if(part == last) {
				parts[parts.length - 1] = part + " (#" + ++count + ")";
			} else {
				count = 1;
				last = part;
				parts.push(part);
			}
		}
		return "<div>" + ("<ul><li>" + parts.join("</li>" + nl + "<li>") + "</li></ul>" + nl) + "</div>" + nl;
	}
	,addFixture: function(buf,result,name,isOk) {
		if(utest_ui_common_ReportTools.skipResult(this,result.stats,isOk)) {
			return;
		}
		buf.b += "<li class=\"fixture\"><div class=\"li\">";
		var x = "<span class=\"" + this.cls(result.stats) + "bg fixtureresult\">";
		buf.b += Std.string(x);
		if(result.stats.isOk) {
			buf.b += "OK ";
		} else if(result.stats.hasErrors) {
			buf.b += "ERROR ";
		} else if(result.stats.hasFailures) {
			buf.b += "FAILURE ";
		} else if(result.stats.hasWarnings) {
			buf.b += "WARNING ";
		}
		buf.b = (buf.b += "</span>") + "<div class=\"fixturedetails\">";
		buf.b = (buf.b += Std.string("<strong>" + name + "</strong>")) + ": ";
		this.resultNumbers(buf,result.stats);
		var messages = [];
		var _g = result.iterator();
		while(_g.head != null) {
			var val = _g.head.item;
			_g.head = _g.head.next;
			switch(val._hx_index) {
			case 0:
				break;
			case 1:
				messages.push("<strong>line " + val.pos.lineNumber + "</strong>: <em>" + StringTools.htmlEscape(val.msg) + "</em>");
				break;
			case 2:
				var _g1 = val.e;
				messages.push("<strong>error</strong>: <em>" + this.getErrorDescription(_g1) + "</em>\n<br/><strong>stack</strong>:" + this.getErrorStack(val.stack,_g1));
				break;
			case 3:
				var _g2 = val.e;
				messages.push("<strong>setup error</strong>: " + this.getErrorDescription(_g2) + "\n<br/><strong>stack</strong>:" + this.getErrorStack(val.stack,_g2));
				break;
			case 4:
				var _g3 = val.e;
				messages.push("<strong>tear-down error</strong>: " + this.getErrorDescription(_g3) + "\n<br/><strong>stack</strong>:" + this.getErrorStack(val.stack,_g3));
				break;
			case 5:
				messages.push("<strong>missed async call(s)</strong>: " + val.missedAsyncs);
				break;
			case 6:
				var _g4 = val.e;
				messages.push("<strong>async error</strong>: " + this.getErrorDescription(_g4) + "\n<br/><strong>stack</strong>:" + this.getErrorStack(val.stack,_g4));
				break;
			case 7:
				messages.push(StringTools.htmlEscape(val.msg));
				break;
			case 8:
				messages.push(StringTools.htmlEscape(val.reason));
				break;
			}
		}
		if(messages.length > 0) {
			buf.b += "<div class=\"testoutput\">";
			var x = messages.join("<br/>");
			buf.b += Std.string(x);
			buf.b += "</div>\n";
		}
		buf.b = (buf.b += "</div>\n") + "</div></li>\n";
	}
	,getErrorDescription: function(e) {
		return Std.string(e);
	}
	,getErrorStack: function(s,e) {
		return this.formatStack(s);
	}
	,addClass: function(buf,result,name,isOk) {
		if(utest_ui_common_ReportTools.skipResult(this,result.stats,isOk)) {
			return;
		}
		buf.b = (buf.b += "<li>") + Std.string("<h2 class=\"classname\">" + name + "</h2>");
		this.blockNumbers(buf,result.stats);
		buf.b += "<ul>\n";
		var _g = 0;
		var _g1 = result.methodNames();
		while(_g < _g1.length) {
			var mname = _g1[_g];
			++_g;
			this.addFixture(buf,result.get(mname),mname,isOk);
		}
		buf.b = (buf.b += "</ul>\n") + "</li>\n";
	}
	,addPackages: function(buf,result,isOk) {
		if(utest_ui_common_ReportTools.skipResult(this,result.stats,isOk)) {
			return;
		}
		buf.b += "<ul id=\"utest-results-packages\">\n";
		var _g = 0;
		var _g1 = result.packageNames(false);
		while(_g < _g1.length) {
			var name = _g1[_g];
			++_g;
			this.addPackage(buf,result.getPackage(name),name,isOk);
		}
		buf.b += "</ul>\n";
	}
	,addPackage: function(buf,result,name,isOk) {
		if(utest_ui_common_ReportTools.skipResult(this,result.stats,isOk)) {
			return;
		}
		if(name == "" && result.classNames().length == 0) {
			return;
		}
		buf.b = (buf.b += "<li>") + Std.string("<h2>" + name + "</h2>");
		this.blockNumbers(buf,result.stats);
		buf.b += "<ul>\n";
		var _g = 0;
		var _g1 = result.classNames();
		while(_g < _g1.length) {
			var cname = _g1[_g];
			++_g;
			this.addClass(buf,result.getClass(cname),cname,isOk);
		}
		buf.b = (buf.b += "</ul>\n") + "</li>\n";
	}
	,getTextResults: function() {
		var newline = "\n";
		var indents = function(count) {
			var _g = [];
			var _g1 = 0;
			while(_g1 < count) {
				++_g1;
				_g.push("  ");
			}
			return _g.join("");
		};
		var dumpStack = function(stack) {
			if(stack.length == 0) {
				return "";
			}
			var parts = haxe_CallStack.toString(stack).split("\n");
			var r = [];
			var _g = 0;
			while(_g < parts.length) {
				var part = parts[_g];
				++_g;
				if(part.indexOf(" utest.") >= 0) {
					continue;
				}
				r.push(part);
			}
			return r.join(newline);
		};
		var buf_b = "";
		var _g = 0;
		var _g1 = this.result.packageNames();
		while(_g < _g1.length) {
			var pname = _g1[_g];
			++_g;
			var pack = this.result.getPackage(pname);
			if(utest_ui_common_ReportTools.skipResult(this,pack.stats,this.result.stats.isOk)) {
				continue;
			}
			var _g2 = 0;
			var _g3 = pack.classNames();
			while(_g2 < _g3.length) {
				var cname = _g3[_g2];
				++_g2;
				var cls = pack.getClass(cname);
				if(utest_ui_common_ReportTools.skipResult(this,cls.stats,this.result.stats.isOk)) {
					continue;
				}
				buf_b += Std.string((pname == "" ? "" : pname + ".") + cname + newline);
				var _g4 = 0;
				var _g5 = cls.methodNames();
				while(_g4 < _g5.length) {
					var mname = _g5[_g4];
					++_g4;
					var fix = cls.get(mname);
					if(utest_ui_common_ReportTools.skipResult(this,fix.stats,this.result.stats.isOk)) {
						continue;
					}
					buf_b += Std.string(indents(1) + mname + ": ");
					if(fix.stats.isOk) {
						buf_b += "OK ";
					} else if(fix.stats.hasErrors) {
						buf_b += "ERROR ";
					} else if(fix.stats.hasFailures) {
						buf_b += "FAILURE ";
					} else if(fix.stats.hasWarnings) {
						buf_b += "WARNING ";
					}
					var messages = "";
					var _g6 = fix.iterator();
					while(_g6.head != null) {
						var val = _g6.head.item;
						_g6.head = _g6.head.next;
						switch(val._hx_index) {
						case 0:
							buf_b += ".";
							break;
						case 1:
							buf_b += "F";
							messages += indents(2) + "line: " + val.pos.lineNumber + ", " + val.msg + newline;
							break;
						case 2:
							buf_b += "E";
							messages += indents(2) + Std.string(val.e) + dumpStack(val.stack) + newline;
							break;
						case 3:
							buf_b += "S";
							messages += indents(2) + Std.string(val.e) + dumpStack(val.stack) + newline;
							break;
						case 4:
							buf_b += "T";
							messages += indents(2) + Std.string(val.e) + dumpStack(val.stack) + newline;
							break;
						case 5:
							buf_b += "O";
							messages += indents(2) + "missed async calls: " + val.missedAsyncs + dumpStack(val.stack) + newline;
							break;
						case 6:
							buf_b += "A";
							messages += indents(2) + Std.string(val.e) + dumpStack(val.stack) + newline;
							break;
						case 7:
							buf_b += "W";
							messages += indents(2) + val.msg + newline;
							break;
						case 8:
							var _g7 = val.reason;
							buf_b += "I";
							if(_g7 != null && _g7 != "") {
								messages += indents(2) + ("With reason: " + _g7) + newline;
							}
							break;
						}
					}
					buf_b += newline == null ? "null" : "" + newline;
					buf_b += messages == null ? "null" : "" + messages;
				}
			}
		}
		return buf_b;
	}
	,getHeader: function() {
		var buf = new StringBuf();
		if(!utest_ui_common_ReportTools.hasHeader(this,this.result.stats)) {
			return "";
		}
		var time = ((HxOverrides.now() / 1000 - this.startTime) * 1000 | 0) / 1000;
		var msg = "TEST OK";
		if(this.result.stats.hasErrors) {
			msg = "TEST ERRORS";
		} else if(this.result.stats.hasFailures) {
			msg = "TEST FAILED";
		} else if(this.result.stats.hasWarnings) {
			msg = "WARNING REPORTED";
		}
		var x = "<h1 class=\"" + this.cls(this.result.stats) + "bg header\">" + msg + "</h1>\n";
		buf.b += Std.string(x);
		buf.b += "<div class=\"headerinfo\">";
		this.resultNumbers(buf,this.result.stats);
		buf.b += Std.string(" performed on <strong>" + utest_ui_text_HtmlReport.platform + "</strong>, executed in <strong> " + time + " sec. </strong></div >\n ");
		return buf.b;
	}
	,getTrace: function() {
		var buf_b = "";
		if(this._traces == null || this._traces.length == 0) {
			return "";
		}
		buf_b = "<div class=\"trace\"><h2>traces</h2><ol>";
		var _g = 0;
		var _g1 = this._traces;
		while(_g < _g1.length) {
			var t = _g1[_g];
			++_g;
			buf_b += "<li><div class=\"li\">";
			var stack = StringTools.replace(this.formatStack(t.stack,false),"'","\\'");
			var method = "<span class=\"tracepackage\">" + t.infos.className + "</span><br/>" + t.infos.methodName + "(" + t.infos.lineNumber + ")";
			buf_b += Std.string("<span class=\"tracepos\" onmouseover=\"utestTooltip(this.parentNode, '" + stack + "')\" onmouseout=\"utestRemoveTooltip()\">");
			buf_b += method == null ? "null" : "" + method;
			buf_b += "</span><span class=\"tracetime\">";
			buf_b += Std.string("@ " + this.formatTime(t.time));
			if(Math.round(t.delta * 1000) > 0) {
				buf_b += Std.string(", ~" + this.formatTime(t.delta));
			}
			buf_b += "</span><span class=\"tracemsg\">";
			buf_b += Std.string(StringTools.replace(StringTools.trim(t.msg),"\n","<br/>\n"));
			buf_b += "</span><div class=\"clr\"></div></div></li>";
		}
		buf_b += "</ol></div>";
		return buf_b;
	}
	,getResults: function() {
		var buf = new StringBuf();
		this.addPackages(buf,this.result,this.result.stats.isOk);
		return buf.b;
	}
	,getAll: function() {
		if(!utest_ui_common_ReportTools.hasOutput(this,this.result.stats)) {
			return "";
		} else {
			return this.getHeader() + this.getTrace() + this.getResults();
		}
	}
	,getHtml: function(title) {
		if(null == title) {
			title = "utest: " + utest_ui_text_HtmlReport.platform;
		}
		var s = this.getAll();
		if("" == s) {
			return "";
		} else {
			return this.wrapHtml(title,s);
		}
	}
	,result: null
	,complete: function(result) {
		this.result = result;
		this.handler(this);
		this.restoreTrace();
		var exposedResult = { isOk : result.stats.isOk, message : this.getTextResults()};
		if('undefined' != typeof window) {
			window.utest_result = exposedResult;
		}
	}
	,formatTime: function(t) {
		return Math.round(t * 1000) + " ms";
	}
	,cssStyle: function() {
		return "body, dd, dt {\n  font-family: Verdana, Arial, Sans-serif;\n  font-size: 12px;\n}\ndl {\n  width: 180px;\n}\ndd, dt {\n  margin : 0;\n  padding : 2px 5px;\n  border-top: 1px solid #f0f0f0;\n  border-left: 1px solid #f0f0f0;\n  border-right: 1px solid #CCCCCC;\n  border-bottom: 1px solid #CCCCCC;\n}\ndd.value {\n  text-align: center;\n  background-color: #eeeeee;\n}\ndt {\n  text-align: left;\n  background-color: #e6e6e6;\n  float: left;\n  width: 100px;\n}\n\nh1, h2, h3, h4, h5, h6 {\n  margin: 0;\n  padding: 0;\n}\n\nh1 {\n  text-align: center;\n  font-weight: bold;\n  padding: 5px 0 4px 0;\n  font-family: Arial, Sans-serif;\n  font-size: 18px;\n  border-top: 1px solid #f0f0f0;\n  border-left: 1px solid #f0f0f0;\n  border-right: 1px solid #CCCCCC;\n  border-bottom: 1px solid #CCCCCC;\n  margin: 0 2px 0px 2px;\n}\n\nh2 {\n  font-weight: bold;\n  padding: 2px 0 2px 8px;\n  font-family: Arial, Sans-serif;\n  font-size: 13px;\n  border-top: 1px solid #f0f0f0;\n  border-left: 1px solid #f0f0f0;\n  border-right: 1px solid #CCCCCC;\n  border-bottom: 1px solid #CCCCCC;\n  margin: 0 0 0px 0;\n  background-color: #FFFFFF;\n  color: #777777;\n}\n\nh2.classname {\n  color: #000000;\n}\n\n.okbg {\n  background-color: #66FF55;\n}\n.errorbg {\n  background-color: #CC1100;\n}\n.failurebg {\n  background-color: #EE3322;\n}\n.warnbg {\n  background-color: #FFCC99;\n}\n.headerinfo {\n  text-align: right;\n  font-size: 11px;\n  font - color: 0xCCCCCC;\n  margin: 0 2px 5px 2px;\n  border-left: 1px solid #f0f0f0;\n  border-right: 1px solid #CCCCCC;\n  border-bottom: 1px solid #CCCCCC;\n  padding: 2px;\n}\n\nli {\n  padding: 4px;\n  margin: 2px;\n  border-top: 1px solid #f0f0f0;\n  border-left: 1px solid #f0f0f0;\n  border-right: 1px solid #CCCCCC;\n  border-bottom: 1px solid #CCCCCC;\n  background-color: #e6e6e6;\n}\n\nli.fixture {\n  background-color: #f6f6f6;\n  padding-bottom: 6px;\n}\n\ndiv.fixturedetails {\n  padding-left: 108px;\n}\n\nul {\n  padding: 0;\n  margin: 6px 0 0 0;\n  list-style-type: none;\n}\n\nol {\n  padding: 0 0 0 28px;\n  margin: 0px 0 0 0;\n}\n\n.statnumbers {\n  padding: 2px 8px;\n}\n\n.fixtureresult {\n  width: 100px;\n  text-align: center;\n  display: block;\n  float: left;\n  font-weight: bold;\n  padding: 1px;\n  margin: 0 0 0 0;\n}\n\n.testoutput {\n  border: 1px dashed #CCCCCC;\n  margin: 4px 0 0 0;\n  padding: 4px 8px;\n  background-color: #eeeeee;\n}\n\nspan.tracepos, span.traceposempty {\n  display: block;\n  float: left;\n  font-weight: bold;\n  font-size: 9px;\n  width: 170px;\n  margin: 2px 0 0 2px;\n}\n\nspan.tracepos:hover {\n  cursor : pointer;\n  background-color: #ffff99;\n}\n\nspan.tracemsg {\n  display: block;\n  margin-left: 180px;\n  background-color: #eeeeee;\n  padding: 7px;\n}\n\nspan.tracetime {\n  display: block;\n  float: right;\n  margin: 2px;\n  font-size: 9px;\n  color: #777777;\n}\n\n\ndiv.trace ol {\n  padding: 0 0 0 40px;\n  color: #777777;\n}\n\ndiv.trace li {\n  padding: 0;\n}\n\ndiv.trace li div.li {\n  color: #000000;\n}\n\ndiv.trace h2 {\n  margin: 0 2px 0px 2px;\n  padding-left: 4px;\n}\n\n.tracepackage {\n  color: #777777;\n  font-weight: normal;\n}\n\n.clr {\n  clear: both;\n}\n\n#utesttip {\n  margin-top: -3px;\n  margin-left: 170px;\n  font-size: 9px;\n}\n\n#utesttip li {\n  margin: 0;\n  background-color: #ffff99;\n  padding: 2px 4px;\n  border: 0;\n  border-bottom: 1px dashed #ffff33;\n}";
	}
	,jsScript: function() {
		return "function utestTooltip(ref, text) {\n  var el = document.getElementById(\"utesttip\");\n  if(!el) {\n    var el = document.createElement(\"div\")\n    el.id = \"utesttip\";\n    el.style.position = \"absolute\";\n    document.body.appendChild(el)\n  }\n  var p = utestFindPos(ref);\n  el.style.left = (4 + p[0]) + \"px\";\n  el.style.top = (p[1] - 1) + \"px\";\n  el.innerHTML =  text;\n}\n\nfunction utestFindPos(el) {\n  var left = 0;\n  var top = 0;\n  do {\n    left += el.offsetLeft;\n    top += el.offsetTop;\n  } while(el = el.offsetParent)\n  return [left, top];\n}\n\nfunction utestRemoveTooltip() {\n  var el = document.getElementById(\"utesttip\")\n  if(el)\n    document.body.removeChild(el)\n}";
	}
	,wrapHtml: function(title,s) {
		return "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html;charset=utf-8\" />\n<title>" + title + "</title>\n      <style type=\"text/css\">" + this.cssStyle() + "</style>\n      <script type=\"text/javascript\">\n" + this.jsScript() + "\n</" + "script>\n</head>\n      <body>\n" + s + "\n</body>\n</html>";
	}
	,_handler: function(report) {
		var _gthis = this;
		if(window.document.readyState == "loading") {
			var onReadyStateChange = null;
			onReadyStateChange = function() {
				if(window.document.readyState != "loading") {
					window.document.removeEventListener("readystatechange",onReadyStateChange);
					_gthis._handler(report);
				}
			};
			window.document.addEventListener("readystatechange",onReadyStateChange);
			return;
		}
		var isDef = function(v) {
			return typeof v != 'undefined';
		};
		var hasProcess = typeof process != 'undefined';
		if(hasProcess) {
			process.stdout.write(report.getHtml());
			return;
		}
		var head = window.document.getElementsByTagName("head")[0];
		var script = window.document.createElement("script");
		script.type = "text/javascript";
		var sjs = report.jsScript();
		if(isDef(script.text)) {
			script.text = sjs;
		} else {
			script.innerHTML = sjs;
		}
		head.appendChild(script);
		var style = window.document.createElement("style");
		style.type = "text/css";
		var scss = report.cssStyle();
		if(isDef(style.styleSheet)) {
			style.styleSheet.cssText = scss;
		} else if(isDef(style.cssText)) {
			style.cssText = scss;
		} else if(isDef(style.innerText)) {
			style.innerText = scss;
		} else {
			style.innerHTML = scss;
		}
		head.appendChild(style);
		var el = window.document.getElementById("utest-results");
		if(null == el) {
			el = window.document.createElement("div");
			el.id = "utest-results";
			window.document.body.appendChild(el);
		}
		el.innerHTML = report.getAll();
	}
	,__class__: utest_ui_text_HtmlReport
};
var utest_ui_text_PlainTextReport = function(runner,outputHandler) {
	this.aggregator = new utest_ui_common_ResultAggregator(runner,true);
	runner.onStart.add($bind(this,this.start));
	this.aggregator.onComplete.add($bind(this,this.complete));
	if(null != outputHandler) {
		this.setHandler(outputHandler);
	}
	this.displaySuccessResults = utest_ui_common_SuccessResultsDisplayMode.AlwaysShowSuccessResults;
	this.displayHeader = utest_ui_common_HeaderDisplayMode.AlwaysShowHeader;
};
utest_ui_text_PlainTextReport.__name__ = "utest.ui.text.PlainTextReport";
utest_ui_text_PlainTextReport.__interfaces__ = [utest_ui_common_IReport];
utest_ui_text_PlainTextReport.prototype = {
	displaySuccessResults: null
	,displayHeader: null
	,handler: null
	,aggregator: null
	,newline: null
	,indent: null
	,setHandler: function(handler) {
		this.handler = handler;
	}
	,startTime: null
	,start: function(e) {
		this.startTime = this.getTime();
	}
	,getTime: function() {
		return HxOverrides.now() / 1000;
	}
	,indents: function(c) {
		var s = "";
		while(--c >= 0) s += this.indent;
		return s;
	}
	,dumpStack: function(stack) {
		if(stack.length == 0) {
			return "";
		}
		var parts = haxe_CallStack.toString(stack).split("\n");
		var r = [];
		var _g = 0;
		while(_g < parts.length) {
			var part = parts[_g];
			++_g;
			if(part.indexOf(" utest.") >= 0) {
				continue;
			}
			r.push(part);
		}
		return r.join(this.newline);
	}
	,addHeader: function(buf,result) {
		if(!utest_ui_common_ReportTools.hasHeader(this,result.stats)) {
			return;
		}
		var time = ((this.getTime() - this.startTime) * 1000 | 0) / 1000;
		buf.b += Std.string("\nassertations: " + result.stats.assertations + this.newline);
		buf.b += Std.string("successes: " + result.stats.successes + this.newline);
		buf.b += Std.string("errors: " + result.stats.errors + this.newline);
		buf.b += Std.string("failures: " + result.stats.failures + this.newline);
		buf.b += Std.string("warnings: " + result.stats.warnings + this.newline);
		buf.b += Std.string("execution time: " + time + this.newline);
		buf.b += Std.string(this.newline);
		buf.b += Std.string("results: " + (result.stats.isOk ? "ALL TESTS OK (success: true)" : "SOME TESTS FAILURES (success: false)"));
		buf.b += Std.string(this.newline);
	}
	,result: null
	,getResults: function() {
		var buf = new StringBuf();
		this.addHeader(buf,this.result);
		var _g = 0;
		var _g1 = this.result.packageNames();
		while(_g < _g1.length) {
			var pname = _g1[_g];
			++_g;
			var pack = this.result.getPackage(pname);
			if(utest_ui_common_ReportTools.skipResult(this,pack.stats,this.result.stats.isOk)) {
				continue;
			}
			var _g2 = 0;
			var _g3 = pack.classNames();
			while(_g2 < _g3.length) {
				var cname = _g3[_g2];
				++_g2;
				var cls = pack.getClass(cname);
				if(utest_ui_common_ReportTools.skipResult(this,cls.stats,this.result.stats.isOk)) {
					continue;
				}
				buf.b += Std.string((pname == "" ? "" : pname + ".") + cname + this.newline);
				var _g4 = 0;
				var _g5 = cls.methodNames();
				while(_g4 < _g5.length) {
					var mname = _g5[_g4];
					++_g4;
					var fix = cls.get(mname);
					if(utest_ui_common_ReportTools.skipResult(this,fix.stats,this.result.stats.isOk)) {
						continue;
					}
					var x = this.indents(1) + mname + ": ";
					buf.b += Std.string(x);
					if(fix.stats.isOk) {
						buf.b += "OK ";
					} else if(fix.stats.hasErrors) {
						buf.b += "ERROR ";
					} else if(fix.stats.hasFailures) {
						buf.b += "FAILURE ";
					} else if(fix.stats.hasWarnings) {
						buf.b += "WARNING ";
					}
					var messages = "";
					var _g6 = fix.iterator();
					while(_g6.head != null) {
						var val = _g6.head.item;
						_g6.head = _g6.head.next;
						switch(val._hx_index) {
						case 0:
							buf.b += ".";
							break;
						case 1:
							buf.b += "F";
							messages += this.indents(2) + "line: " + val.pos.lineNumber + ", " + val.msg + this.newline;
							break;
						case 2:
							buf.b += "E";
							messages += this.indents(2) + Std.string(val.e) + this.dumpStack(val.stack) + this.newline;
							break;
						case 3:
							buf.b += "S";
							messages += this.indents(2) + Std.string(val.e) + this.dumpStack(val.stack) + this.newline;
							break;
						case 4:
							buf.b += "T";
							messages += this.indents(2) + Std.string(val.e) + this.dumpStack(val.stack) + this.newline;
							break;
						case 5:
							buf.b += "O";
							messages += this.indents(2) + "missed async calls: " + val.missedAsyncs + this.dumpStack(val.stack) + this.newline;
							break;
						case 6:
							buf.b += "A";
							messages += this.indents(2) + Std.string(val.e) + this.dumpStack(val.stack) + this.newline;
							break;
						case 7:
							buf.b += "W";
							messages += this.indents(2) + val.msg + this.newline;
							break;
						case 8:
							var _g7 = val.reason;
							buf.b += "I";
							if(_g7 != null && _g7 != "") {
								messages += this.indents(2) + ("With reason: " + _g7) + this.newline;
							}
							break;
						}
					}
					buf.b = (buf.b += Std.string(this.newline)) + (messages == null ? "null" : "" + messages);
				}
			}
		}
		return buf.b;
	}
	,complete: function(result) {
		this.result = result;
		if(this.handler != null) {
			this.handler(this);
		}
		if(typeof phantom != "undefined") {
			var tmp = result.stats.isOk ? 0 : 1;
			phantom.exit(tmp);
		}
		if(typeof process != "undefined") {
			var tmp = result.stats.isOk ? 0 : 1;
			process.exit(tmp);
		}
	}
	,__class__: utest_ui_text_PlainTextReport
};
var utest_ui_text_PrintReport = function(runner) {
	utest_ui_text_PlainTextReport.call(this,runner,$bind(this,this._handler));
	this.newline = "\n";
	this.indent = "  ";
};
utest_ui_text_PrintReport.__name__ = "utest.ui.text.PrintReport";
utest_ui_text_PrintReport.__super__ = utest_ui_text_PlainTextReport;
utest_ui_text_PrintReport.prototype = $extend(utest_ui_text_PlainTextReport.prototype,{
	_handler: function(report) {
		this._trace(report.getResults());
	}
	,_trace: function(s) {
		s = StringTools.replace(s,"  ",this.indent);
		s = StringTools.replace(s,"\n",this.newline);
		haxe_Log.trace(s,{ fileName : "utest/ui/text/PrintReport.hx", lineNumber : 52, className : "utest.ui.text.PrintReport", methodName : "_trace"});
	}
	,__class__: utest_ui_text_PrintReport
});
var utest_utils_AccessoriesUtils = function() { };
utest_utils_AccessoriesUtils.__name__ = "utest.utils.AccessoriesUtils";
utest_utils_AccessoriesUtils.getSetupClass = function(accessories) {
	if(accessories.setupClass == null) {
		return utest_Async.getResolved;
	} else {
		return accessories.setupClass;
	}
};
utest_utils_AccessoriesUtils.getSetup = function(accessories) {
	if(accessories.setup == null) {
		return utest_Async.getResolved;
	} else {
		return accessories.setup;
	}
};
utest_utils_AccessoriesUtils.getTeardown = function(accessories) {
	if(accessories.teardown == null) {
		return utest_Async.getResolved;
	} else {
		return accessories.teardown;
	}
};
utest_utils_AccessoriesUtils.getTeardownClass = function(accessories) {
	if(accessories.teardownClass == null) {
		return utest_Async.getResolved;
	} else {
		return accessories.teardownClass;
	}
};
var utest_utils_AsyncUtils = function() { };
utest_utils_AsyncUtils.__name__ = "utest.utils.AsyncUtils";
utest_utils_AsyncUtils.orResolved = function(_async) {
	if(_async == null) {
		return utest_Async.getResolved();
	} else {
		return _async;
	}
};
var utest_utils_Misc = function() { };
utest_utils_Misc.__name__ = "utest.utils.Misc";
utest_utils_Misc.isOfType = function(v,t) {
	return js_Boot.__instanceof(v,t);
};
var utest_utils_Print = function() { };
utest_utils_Print.__name__ = "utest.utils.Print";
utest_utils_Print.immediately = function(msg) {
	console.log(msg);
};
utest_utils_Print.startCase = function(caseName) {
};
utest_utils_Print.startTest = function(name) {
};
function $getIterator(o) { if( o instanceof Array ) return new haxe_iterators_ArrayIterator(o); else return o.iterator(); }
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $global.$haxeUID++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = m.bind(o); o.hx__closures__[m.__id__] = f; } return f; }
$global.$haxeUID |= 0;
if(typeof(performance) != "undefined" ? typeof(performance.now) == "function" : false) {
	HxOverrides.now = performance.now.bind(performance);
}
if( String.fromCodePoint == null ) String.fromCodePoint = function(c) { return c < 0x10000 ? String.fromCharCode(c) : String.fromCharCode((c>>10)+0xD7C0)+String.fromCharCode((c&0x3FF)+0xDC00); }
String.prototype.__class__ = String;
String.__name__ = "String";
Array.__name__ = "Array";
Date.prototype.__class__ = Date;
Date.__name__ = "Date";
var Int = { };
var Dynamic = { };
var Float = Number;
var Bool = Boolean;
var Class = { };
var Enum = { };
js_Boot.__toStr = ({ }).toString;
Xml.Element = 0;
Xml.PCData = 1;
Xml.CData = 2;
Xml.Comment = 3;
Xml.DocType = 4;
Xml.ProcessingInstruction = 5;
Xml.Document = 6;
haxe_xml_Parser.escapes = (function($this) {
	var $r;
	var h = new haxe_ds_StringMap();
	h.h["lt"] = "<";
	h.h["gt"] = ">";
	h.h["amp"] = "&";
	h.h["quot"] = "\"";
	h.h["apos"] = "'";
	$r = h;
	return $r;
}(this));
utest_TestHandler.POLLING_TIME = 10;
utest_AccessoryName.SETUP_NAME = "setup";
utest_AccessoryName.SETUP_CLASS_NAME = "setupClass";
utest_AccessoryName.TEARDOWN_NAME = "teardown";
utest_AccessoryName.TEARDOWN_CLASS_NAME = "teardownClass";
utest_ui_text_HtmlReport.platform = "javascript";
TestSimpleGraphics_main();
})(typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
