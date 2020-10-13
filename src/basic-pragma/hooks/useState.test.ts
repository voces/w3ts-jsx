import { setAdapter } from "../adapter";
import { createElement } from "../element";
import { render } from "../reconciler";
import { testAdapter, TestFrame } from "../test/testAdapter";
import { useState } from "./useState";

setAdapter(testAdapter);

it("works", () => {
	const fn = jest.fn();
	let exposedSetState!: (nextState: string) => void;
	const TestComponent = () => {
		const [state, setState] = useState("foo");
		exposedSetState = setState;
		fn(state);

		return createElement("frame", { knownState: state });
	};
	const root = new TestFrame();
	render(createElement(TestComponent), root);

	expect(fn).toHaveBeenCalledTimes(1);
	expect(fn).toHaveBeenCalledWith("foo");
	expect(root.children[0]).toMatchObject({
		jsxType: "frame",
		props: { knownState: "foo" },
	});

	exposedSetState("bar");

	expect(fn).toHaveBeenCalledTimes(2);
	expect(fn).toHaveBeenCalledWith("bar");
	expect(root.children[0]).toMatchObject({
		jsxType: "frame",
		props: { knownState: "bar" },
	});
});
