package tools;

using Lambda;

inline function forEach<T>(a:Array<T>, f:T->Void)
	Lambda.iter(a, f);

inline function addUnique<T>(a:Array<T>, item:T):Bool {
	if (a.has(item))
		return false;
	a.push(item);
	return true;
}
