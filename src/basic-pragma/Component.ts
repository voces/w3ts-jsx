/** @noSelfInFile **/

import { VNode } from "./element";
import { ClassComponent } from "./reconciler";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionalComponent<P> = (props: P) => VNode<any> | null;

export type ComponentType<P> =
	| (new (props: P) => ClassComponent<P>)
	| FunctionalComponent<P>;
