package tools;

class PairIterator<V> {
	final a:Array<V>;
	final tail:V = null;
	final length:Int = 0;
	var _index = 0;

	public function new(a:Array<V>, tail:V = null, includeNullAsTail:Bool = false) {
		this.a = a;
		this.tail = tail;
		this.length = a.length;
		if (tail != null || includeNullAsTail)
			this.length++;
		if (this.length < 2)
			throw('PairIterator error: Can not handle less than two items. A "tail" item can be added to the constructor, or "includeNullAsTail" can be set to include null as the rightmost item.');
	}

	function hasNext():Bool
		return this._index < this.length - 1;

	function next():{key:V, value:V}
		return _index < a.length - 1 ? {key: a[_index], value: a[++_index]} : {key: a[_index++], value: tail};

	public var index(get, never):Int;

	function get_index():Int
		return this._index - 1;

	public function keyValueIterator()
		return {hasNext: this.hasNext, next: this.next};

	static public function toPairIterator<V>(a:Array<V>, ?tail:V, includeNullAsTail:Bool = false):PairIterator<V>
		return new PairIterator(a, tail, includeNullAsTail);
}
// usage
/*
	using tools.PairIterator;
	function testPair() {
		final a = [{x: 3}, {x: 8}, {x: 11}];
		for (left => right in a.toPairIterator({x: 20})) {
			trace('left: $left => right: $right - x-difference: ${right.x - left.x}');
		}
	}
 */
