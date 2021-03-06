/** @noSelfInFile **/

import { adapter } from "./adapter";
import { setAdapter, VNode } from "../node_modules/basic-pragma/src/index";

setAdapter(adapter);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Node<T = any> = VNode<T> | null;

export { setPixelScale } from "./adapter";

export {
	Children,
	createElement,
	EmptyObject,
	Fragment,
	FunctionalComponent,
	render,
	useEffect,
	useForceUpdate,
	useRef,
	useState,
} from "../node_modules/basic-pragma/src/index";
