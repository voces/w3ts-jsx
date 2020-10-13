/** @noSelfInFile **/

import { hooks, ClassComponent } from "../reconciler";

const oldBeforeRender = hooks.beforeRender;

interface HookContext {
	currentInstance: ClassComponent<unknown>;
	currentIndex: number;
}

export const hookContext = {} as HookContext;

export interface HookState<S, A> {
	reducer?: (this: void, prevState: S, action: A) => S;
	instance?: ClassComponent<unknown>;
	value?: [S, (action: A) => void];
}

export const hookMap = new WeakMap<
	ClassComponent<unknown>,
	HookState<unknown, unknown>[]
>();

hooks.beforeRender = (instance) => {
	oldBeforeRender(instance);

	hookContext.currentInstance = instance;
	hookContext.currentIndex = 0;

	if (!hookMap.has(instance)) hookMap.set(instance, []);
};
