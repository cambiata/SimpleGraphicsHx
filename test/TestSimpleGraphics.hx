function main() {
	utest.UTest.run([new TestA()]);
}

class TestA implements utest.ITest {
	public function new() {}

	function testA() {
		utest.Assert.isTrue(true);
	}
}
