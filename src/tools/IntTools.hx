package tools;

using Lambda;

inline function minInt(a:Int, b:Int)
	return a < b ? a : b;

inline function maxInt(a:Int, b:Int)
	return a > b ? a : b;

function maxOf(a:Array<Int>, filterNull = true):Int {
	if (filterNull)
		a = a.filter(i -> i != null);
	var max = a[0];
	if (a.length > 1)
		for (i in 1...a.length)
			max = maxInt(max, a[i]);

	return max;
}
