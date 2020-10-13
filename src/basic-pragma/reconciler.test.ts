import { setAdapter } from "./adapter";
import { createElement } from "./element";
import { reconcile, render, ClassComponent } from "./reconciler";
import { testAdapter, TestFrame } from "./test/testAdapter";

setAdapter(testAdapter);

describe("reconcile", () => {
	describe("creating an instance", () => {
		describe("base type", () => {
			it("first child", () => {
				const root = new TestFrame();
				const vnode = createElement("child");
				const instance = reconcile(root, null, vnode);

				expect(instance).toEqual({
					childInstance: null,
					childInstances: [],
					hostFrame: {
						children: [],
						jsxType: "child",
						props: {},
						type: "test-frame",
					},
					vnode,
				});
				expect(root.children.length).toEqual(1);
			});

			it("second child", () => {
				const root = new TestFrame();
				new TestFrame(undefined, root);
				const vnode = createElement("child");
				const instance = reconcile(root, null, vnode);

				expect(instance).toEqual({
					childInstance: null,
					childInstances: [],
					hostFrame: {
						children: [],
						jsxType: "child",
						props: {},
						type: "test-frame",
					},
					vnode,
				});
				expect(root.children.length).toEqual(2);
			});

			it("child with props", () => {
				const root = new TestFrame();
				const vnode = createElement("child", { foo: "bar" });
				const instance = reconcile(root, null, vnode);

				expect(instance).toEqual({
					childInstance: null,
					childInstances: [],
					hostFrame: {
						children: [],
						jsxType: "child",
						props: { foo: "bar" },
						type: "test-frame",
					},
					vnode,
				});
				expect(root.children.length).toEqual(1);
			});

			it("nested children", () => {
				const root = new TestFrame();
				const grandChildVNode = createElement("grandchild");
				const vnode = createElement("child", undefined, [
					grandChildVNode,
				]);
				const instance = reconcile(root, null, vnode);
				const grandchildFrame = {
					children: [],
					jsxType: "grandchild",
					props: {},
					type: "test-frame",
				};
				const grandchildVnode = { type: "grandchild", props: {} };

				expect(instance).toEqual({
					childInstance: null,
					childInstances: [
						{
							childInstance: null,
							childInstances: [],
							hostFrame: grandchildFrame,
							vnode: grandchildVnode,
						},
					],
					hostFrame: {
						children: [grandchildFrame],
						jsxType: "child",
						props: { children: [grandChildVNode] },
						type: "test-frame",
					},
					vnode,
				});
				expect(root.children.length).toEqual(1);
			});
		});

		it("functional components", () => {
			const FunctionalComponent = (props: { foo: string }) =>
				createElement("base", props);

			const root = new TestFrame();
			const props = { foo: "bar" };
			const vnode = createElement(FunctionalComponent, props);
			const instance = reconcile(root, null, vnode);
			const hostFrame = {
				children: [],
				jsxType: "base",
				props,
				type: "test-frame",
			};

			expect(instance).toEqual({
				childInstance: {
					childInstance: null,
					childInstances: [],
					hostFrame,
					vnode: {
						props,
						type: "base",
					},
				},
				publicInstance: {
					props,
					state: {},
				},
				hostFrame,
				vnode,
			});
		});

		it("class components", () => {
			class TestClassComponent extends ClassComponent<{ foo: string }> {
				render(props: { foo: string }) {
					return createElement("base", props);
				}
			}

			const root = new TestFrame();
			const props = { foo: "bar" };
			const vnode = createElement(TestClassComponent, props);
			const instance = reconcile(root, null, vnode);
			const hostFrame = {
				children: [],
				jsxType: "base",
				props,
				type: "test-frame",
			};

			expect(instance).toEqual({
				childInstance: {
					childInstance: null,
					childInstances: [],
					hostFrame,
					vnode: {
						props,
						type: "base",
					},
				},
				publicInstance: {
					props,
					state: {},
				},
				hostFrame,
				vnode,
			});
		});
	});

	describe("removing instances", () => {
		it("removing an instance", () => {
			const root = new TestFrame();
			const vnode = createElement("child");
			const instance = reconcile(root, null, vnode);

			expect(root).toEqual(
				expect.objectContaining({ children: [instance.hostFrame] }),
			);

			reconcile(root, instance, null);

			expect(root).toEqual(expect.objectContaining({ children: [] }));
		});

		it("removing child instances", () => {
			const root = new TestFrame();
			const vnode = createElement("child", {}, [
				createElement("grandchild"),
				createElement("grandchild"),
			]);
			const instance = reconcile(root, null, vnode);

			expect(root).toEqual(
				expect.objectContaining({ children: [instance.hostFrame] }),
			);

			reconcile(root, instance, null);

			expect(root).toEqual(expect.objectContaining({ children: [] }));
		});
	});
	it("replacing an instance", () => {
		const root = new TestFrame();
		const oldChild = createElement("old-child");
		const newChild = createElement("new-child");
		const oldInstance = reconcile(root, null, oldChild);

		expect(root).toEqual(
			expect.objectContaining({ children: [oldInstance.hostFrame] }),
		);

		const newInstance = reconcile(root, oldInstance, newChild);

		expect(root).toEqual(
			expect.objectContaining({ children: [newInstance.hostFrame] }),
		);

		expect(oldInstance).not.toEqual(newInstance);
	});

	describe("updating an instance", () => {
		it("adding props to an instance with none", () => {
			const root = new TestFrame();
			const vnode = createElement("child");
			const instance = reconcile(root, null, vnode);

			expect(root).toEqual(
				expect.objectContaining({ children: [instance.hostFrame] }),
			);

			const newInstance = reconcile(
				root,
				instance,
				createElement("child", { foo: "foo-1" }),
			);

			expect(newInstance).toEqual(instance);
			expect(instance.vnode.props).toEqual({ foo: "foo-1" });
		});

		it("adding, changing, and removing props", () => {
			const root = new TestFrame();
			const vnode = createElement("child", {
				foo: "foo-1",
				bar: "bar-1",
			});
			const instance = reconcile(root, null, vnode);

			expect(root).toEqual(
				expect.objectContaining({ children: [instance.hostFrame] }),
			);

			const newInstance = reconcile(
				root,
				instance,
				createElement("child", { bar: "bar-2", baz: "baz-1" }),
			);

			expect(newInstance).toEqual(instance);
			expect(instance.vnode.props).toEqual({
				bar: "bar-2",
				baz: "baz-1",
			});
		});

		it("adding, changing, and removing grandchild props", () => {
			const root = new TestFrame();
			const vnode = createElement("child", {}, [
				createElement("grandchild", { index: 0 }),
				createElement("grandchild", { index: 1 }),
			]);
			const instance = reconcile(root, null, vnode);

			expect(root).toEqual(
				expect.objectContaining({ children: [instance.hostFrame] }),
			);

			const newInstance = reconcile(
				root,
				instance,
				createElement("child", {}, [
					createElement("grandchild", { index: 1 }),
					createElement("grandchild", { index: 2 }),
				]),
			);

			expect(newInstance).toEqual(instance);
			expect(instance.hostFrame.children).toEqual([
				{
					children: [],
					jsxType: "grandchild",
					props: { index: 1 },
					type: "test-frame",
				},
				{
					children: [],
					jsxType: "grandchild",
					props: { index: 2 },
					type: "test-frame",
				},
			]);
		});

		it("updating functional components", () => {
			const FunctionalComponent = (props: {
				foo?: string;
				bar: string;
				baz?: string;
			}) => createElement("base", props);

			const root = new TestFrame();
			const vnode = createElement(FunctionalComponent, {
				bar: "bar-1",
				foo: "foo-1",
			});
			const instance = reconcile(root, null, vnode);
			const hostFrame = {
				children: [],
				jsxType: "base",
				props: { bar: "bar-1", foo: "foo-1" },
				type: "test-frame",
			};

			expect(instance).toEqual({
				childInstance: {
					childInstance: null,
					childInstances: [],
					hostFrame,
					vnode: {
						props: { bar: "bar-1", foo: "foo-1" },
						type: "base",
					},
				},
				publicInstance: {
					props: { bar: "bar-1", foo: "foo-1" },
					state: {},
				},
				hostFrame,
				vnode,
			});

			const newInstance = reconcile(
				root,
				instance,
				createElement(FunctionalComponent, {
					bar: "bar-2",
					baz: "baz-1",
				}),
			);

			expect(newInstance).toEqual(instance);
			expect(instance.vnode.props).toEqual({
				bar: "bar-2",
				baz: "baz-1",
			});
			expect(instance.publicInstance?.props).toEqual(
				instance.vnode.props,
			);
			expect(instance.childInstance?.vnode.props).toEqual(
				instance.vnode.props,
			);
		});
	});
});

describe("render", () => {
	it("works", () => {
		const root = new TestFrame();
		const vnode = createElement("child");
		render(vnode, root);
		const firstChild = root.children[0];

		expect(root.children.length).toEqual(1);
		expect(firstChild).toEqual({
			children: [],
			jsxType: "child",
			props: {},
			type: "test-frame",
		});
		expect(vnode).toEqual({ type: "child", props: {} });
	});
});
