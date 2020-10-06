import { setAdapter, VNode } from "basic-pragma";
import { adapter } from "./adapter";

setAdapter(adapter);

export type Node<T = unknown> = VNode<T>;

export { createElement, render } from "basic-pragma";
export { JsxTransformer } from "tstl-jsx";
