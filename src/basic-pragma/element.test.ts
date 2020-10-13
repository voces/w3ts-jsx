import { createElement } from "./element";
import { TEXT_ELEMENT } from "./common";

describe("createElement", () => {
	it("empty", () => {
		expect(createElement("node")).toEqual({
			type: "node",
			props: {},
		});
	});

	it("with props", () => {
		expect(createElement("node", { foo: "bar", baz: 7 })).toEqual({
			type: "node",
			props: { foo: "bar", baz: 7 },
		});
	});

	it("strips key", () => {
		expect(createElement("node", { foo: "bar", baz: 7, key: 0 })).toEqual({
			type: "node",
			key: 0,
			props: { foo: "bar", baz: 7 },
		});
	});

	it("doesn't render nullish values", () => {
		expect(createElement("node", {}, [null, undefined])).toEqual({
			type: "node",
			props: {},
		});
	});

	it("doesn't render booleans", () => {
		expect(createElement("node", {}, [false, true])).toEqual({
			type: "node",
			props: {},
		});
	});

	it("nested", () => {
		expect(createElement("outer", {}, [createElement("inner")])).toEqual({
			type: "outer",
			props: {
				children: [
					{
						type: "inner",
						props: {},
					},
				],
			},
		});
	});
});

describe("createTextElement", () => {
	it("works", () => {
		expect(createElement("outer", {}, ["inner"])).toEqual({
			type: "outer",
			props: {
				children: [
					{
						type: TEXT_ELEMENT,
						props: { nodeValue: "inner" },
					},
				],
			},
		});
	});
});
