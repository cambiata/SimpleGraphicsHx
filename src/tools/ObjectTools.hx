/**
	MIT License

	Copyright (c) 2022 Robert Borghese

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
 */

package tools;

using haxe.macro.ExprTools;
using haxe.macro.MacroStringTools;

#if macro
import haxe.macro.Context;
import haxe.macro.Expr;
import haxe.macro.Type;

using haxe.macro.ExprTools;
using haxe.macro.PositionTools;
using haxe.macro.TypeTools;
#end

macro function unpack(input:Expr, exprs:Array<Expr>) {
	return unpackImpl(input, exprs);
}

#if macro
function unpackImpl(input:Expr, exprs:Array<Expr>) {
	var pos = Context.currentPos();

	var assignmentNames = [];
	var declaredVariables = [];
	var namePositions:Map<String, Position> = [];

	var addAssignmentName = function(name) {
		if (!assignmentNames.contains(name)) {
			assignmentNames.push(name);
		} else {
			Context.error('Multiple instances of \'${name}\' are attemping to be unpacked', pos);
		}
	};

	var index = 1;
	for (expr in exprs) {
		switch (expr.expr) {
			case EVars(vars):
				{
					declaredVariables.push({
						expr: EVars(vars.map(v -> {
							v.expr = null;
							v;
						})),
						pos: expr.pos
					});
					for (v in vars) {
						addAssignmentName(v.name);
						namePositions[v.name] = expr.pos;
					}
				}
			case EConst(c):
				{
					switch (c) {
						case CIdent(s): {
								addAssignmentName(s);
								namePositions[s] = expr.pos;
							}
						case _: {
								Context.error('Unpack parameter #$index \'${expr.toString()}\' is not a valid identifier', expr.pos);
							}
					}
				}
			case _:
				{
					Context.error('Unpack parameter #$index \'${expr.toString()}\' is neither an EVars or EConst(CIdent)', expr.pos);
				}
		}
		index++;
	}

	var typeExpr = Context.typeExpr(input);
	var resultExprs = [];

	for (declared in declaredVariables) {
		resultExprs.push(macro @:pos(pos) $declared);
	}

	var enumSwitchCases:Null<Array<Case>> = null;
	var enumName = switch (typeExpr.t) {
		case TEnum(enumTypeRef, _): {
				var enumType = enumTypeRef.get();
				for (enumChoiceName in enumType.names) {
					var enumChoice = enumType.constructs[enumChoiceName];
					var paramList = [];
					var matchCount = 0;
					if (enumChoice != null) {
						switch (enumChoice.type) {
							case TFun(args, _): {
									for (param in args) {
										if (assignmentNames.contains(param.name)) {
											paramList.push("_" + param.name);
											matchCount++;
										} else {
											paramList.push("_");
										}
									}
									if (matchCount == assignmentNames.length) {
										if (enumSwitchCases == null)
											enumSwitchCases = [];
										enumSwitchCases.push({
											values: [macro $i{enumChoice.name}($a{paramList.map(p -> macro $i{p})})]
										});
									}
								}
							case _:
						}
					}
				}
				enumType.name;
			}
		case _: null;
	}

	var assignExpr = [];
	for (name in assignmentNames) {
		// do not explicitly check for field's existance since Haxe will print robust error.
		var exprPos = namePositions[name];
		if (enumName != null) {
			assignExpr.push(macro @:pos(exprPos) $i{name} = $i{"_" + name});
		} else {
			assignExpr.push(macro @:pos(exprPos) $i{name} = temp.$name);
		}
	}

	if (enumName != null) {
		if (enumSwitchCases == null) {
			Context.error('Unpack of instance of $enumName failed as no option matches every desired field.', pos);
		}

		var cases = enumSwitchCases.map(c -> {
			{values: c.values, expr: macro $b{assignExpr}, guard: null}
		});

		var errorText = 'Provided enum instance of $enumName does not contain option with all desired fields.';
		cases.push({
			values: [macro _],
			expr: macro @:pos(pos) {
				throw $v{errorText};
			},
			guard: null
		});

		var switchExpr = {
			expr: ESwitch(macro temp, cases, null),
			pos: pos
		};

		resultExprs.push(macro @:pos(pos) {
			var temp = $input;
			$switchExpr;
			temp;
		});
	} else {
		resultExprs.push(macro @:pos(pos) {
			var temp = $input;
			$b{assignExpr};
			temp;
		});
	}

	return macro @:mergeBlock $b{resultExprs};
}

function findValidFields(type:Type, fieldNames:Array<String>):Map<String, Bool> {
	var result:Map<String, Bool> = [];
	for (name in fieldNames) {
		result[name] = false;
	}

	switch (type) {
		case TMono(t):
			{
				var newType = t.get();
				if (newType != null) {
					return findValidFields(newType, fieldNames);
				}
			}
		case TInst(clsTypeRef, _):
			{
				var clsType = clsTypeRef.get();
				for (f in fieldNames) {
					if (clsType.findField(f) != null) {
						result[f] = true;
					}
				}
			}
		case TType(defTypeRef, _):
			{
				return findValidFields(defTypeRef.get().type, fieldNames);
			}
		case TAnonymous(anonTypeRef):
			{
				var fields = anonTypeRef.get().fields;
				for (f in fields) {
					result[f.name] = true;
				}
			}
		case TDynamic(_):
			{
				for (name in fieldNames) {
					result[name] = true;
				}
			}
		case TLazy(func):
			{
				return findValidFields(func(), fieldNames);
			}
		case TAbstract(abstractTypeRef, _):
			{
				return findValidFields(abstractTypeRef.get().type, fieldNames);
			}
		case _:
	}

	return result;
}
#end
