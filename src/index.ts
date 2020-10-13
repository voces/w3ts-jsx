/** @noSelfInFile **/

import { adapter } from "./adapter";
import { setAdapter } from "./basic-pragma/adapter";
setAdapter(adapter);

import { VNode } from "./basic-pragma/element";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Node<T = any> = VNode<T> | null;

export { useState } from "./basic-pragma/hooks/useState";

export { createElement, Fragment } from "./basic-pragma/element";
export { render } from "./basic-pragma/reconciler";
