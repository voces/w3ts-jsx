/** @noSelfInFile **/

import { ComponentType } from "./Component";
import { TEXT_ELEMENT } from "./common";

export interface VNode<P> {
	type: string | ComponentType<P>;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	props: P & { children?: VNode<any>[] };
	key?: string | number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RawChild = VNode<any> | string | boolean | null | undefined;

type RawChildren = RawChild[] | RawChild;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RenderableChildElement = VNode<any> | string;

const EMPTY_OBJECT = {};
export type EmptyObject = typeof EMPTY_OBJECT;

export function createElement<P>(
	type: string | ComponentType<P>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	config: P & { key?: string | number; children?: VNode<any>[] },
	children?: RawChildren[],
): VNode<P>;
export function createElement(
	type: string | ComponentType<typeof EMPTY_OBJECT>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	config?: { key?: string | number; children?: VNode<any>[] },
	children?: RawChildren[],
): VNode<typeof EMPTY_OBJECT>;
export function createElement<P>(
	type: string | ComponentType<P>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	config: P & { key?: string | number; children?: VNode<any>[] },
	children?: RawChildren[],
): VNode<P> {
	const { key = null, ...props } = { ...config };
	const flattenedChildren = (children && children.length > 0 ? children : [])
		.flat()
		.filter(
			(c): c is RenderableChildElement =>
				c != null &&
				typeof c !== "boolean" &&
				// filters out empty objects which are left because Array.flat() is not correct
				(typeof c === "string" || !!c.type),
		)
		.map((c) => (typeof c === "string" ? createTextElement(c) : c));

	if (flattenedChildren.length > 0) props.children = flattenedChildren;
	else delete props.children;

	// IDK why this is mad, prop is LocalP - key + children, which should work...
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const vnode: VNode<P> = { type, props } as any;

	// Only set key if not nullish
	if (key != null) vnode.key = key;

	return vnode!;
}

function createTextElement(value: string): VNode<{ nodeValue: string }> {
	return createElement(TEXT_ELEMENT, { nodeValue: value });
}

export const Fragment = (props: { children: RawChildren[] }): RawChildren[] =>
	props.children;
