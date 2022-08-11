package tools;

function largest(a:Array<Float>):Float {
	if (a == null)
		return null;
	var max:Float = a.shift();
	for (v in a)
		max = Math.max(max, v);
	return max;
}
