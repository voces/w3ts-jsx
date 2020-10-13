/** @noSelfInFile **/

import { Adapter, adapter } from "./adapter";
import {
	ComponentType,
	FunctionalComponent as FunctionalComponentType,
} from "./Component";
import { VNode } from "./element";
import { TEXT_ELEMENT } from "./common";

export const hooks = {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
	beforeRender: (instance: ClassComponent<any>): void => {
		/* do nothing */
	},
};

export interface Instance<T, P> {
	// FunctionComponents are dynamically converted into ClassComponents
	publicInstance?: ClassComponent<P> | undefined;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	childInstance: Instance<T, any> | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	childInstances: Array<Instance<T, any> | null>;
	hostFrame: T;
	vnode: VNode<P>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let rootInstance: Instance<any, any> | null = null;

export function render<T, P>(vnode: VNode<P>, container: T): void {
	const prevInstance = rootInstance;
	const nextInstance = reconcile(container, prevInstance, vnode);
	rootInstance = nextInstance;
}

export function reconcile<T, InstanceProps>(
	parentFrame: T,
	instance: Instance<T, InstanceProps> | null,
	vnode: null,
): null;
export function reconcile<T, VNodeProps, InstanceProps>(
	parentFrame: T,
	instance: Instance<T, InstanceProps> | null,
	vnode: VNode<VNodeProps>,
): Instance<T, VNodeProps>;
export function reconcile<T, VNodeProps, InstanceProps>(
	parentFrame: T,
	instance: Instance<T, InstanceProps> | null,
	vnode: VNode<VNodeProps>,
): Instance<T, VNodeProps>;
export function reconcile<T, VNodeProps, instanceProps>(
	parentFrame: T,
	instance: Instance<T, instanceProps> | null,
	vnode: VNode<VNodeProps> | null,
): Instance<T, VNodeProps> | null {
	try {
		if (!instance)
			// Create instance
			return instantiate(vnode!, parentFrame);
		else if (!vnode) {
			// Remove instance
			cleanupFrames(instance);
			return null;
		} else if (instance.vnode.type !== vnode.type) {
			// Replace instance
			const newInstance = instantiate(vnode, parentFrame);
			cleanupFrames(instance);
			return newInstance;
		} else {
			// This assumes .type equality => Prop type equality
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const instanceOfSameType = (instance as any) as Instance<
				T,
				VNodeProps
			>;
			if (typeof vnode.type === "string") {
				// Update host vnode
				adapter.updateFrameProperties(
					instance.hostFrame,
					instance.vnode.props,
					vnode.props,
				);
				instance.childInstances = reconcileChildren(instance, vnode);
				instanceOfSameType.vnode = vnode;
				return instanceOfSameType;
			} else if (instanceOfSameType.publicInstance) {
				// Update composite instance
				instanceOfSameType.publicInstance.props = vnode.props;
				hooks.beforeRender(instanceOfSameType.publicInstance);
				const childElement = instanceOfSameType.publicInstance.render(
					vnode.props,
				);
				if (!childElement) throw "Failed to render child";
				const oldChildInstance = instanceOfSameType.childInstance;
				const childInstance = reconcile(
					parentFrame,
					oldChildInstance,
					childElement,
				);
				if (!childInstance) throw "Failed to update composite instance";
				instanceOfSameType.hostFrame = childInstance.hostFrame;
				instanceOfSameType.childInstance = childInstance;
				instanceOfSameType.vnode = vnode;
				return instanceOfSameType;
			} else throw "Reconciler catch all error";
		}
		return null;
	} catch (err) {
		// TODO: log this error, but in a JavaScript/Lua general way...
		print(err);
		return null;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function cleanupFrames<T>(instance: Instance<T, any>) {
	// TODO: composite objects need special cleanup, this should be part of reconcile
	if (instance.childInstances)
		for (const child of instance.childInstances)
			if (child != null) cleanupFrames(child);
	if (instance.childInstance) cleanupFrames(instance.childInstance);
	adapter.cleanupFrame(instance.hostFrame);
}

function reconcileChildren<T, P>(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	instance: Instance<T, any>,
	vnode: VNode<P>,
) {
	const hostFrame = instance.hostFrame;
	const childInstances = instance.childInstances;
	const nextChildElements = vnode.props.children || [];
	const newChildInstances = [];
	const count = Math.max(childInstances.length, nextChildElements.length);
	// TODO: add support for keys
	for (let i = 0; i < count; i++) {
		const childInstance = childInstances[i];
		const childElement = nextChildElements[i];
		const newChildInstance = reconcile(
			hostFrame,
			childInstance,
			childElement,
		);
		newChildInstances.push(newChildInstance);
	}
	return newChildInstances.filter((instance) => instance != null);
}

function instantiate<T, P>(vnode: VNode<P>, parentFrame: T): Instance<T, P> {
	const { type, props } = vnode;
	if (typeof type === "string") {
		if (type === TEXT_ELEMENT) throw "Cannot create inline text, yet";
		// Instantiate host vnode
		const frame = (adapter as Adapter<T>).createFrame(
			type,
			parentFrame,
			props,
		);
		const childElements = props.children || [];
		const childInstances = childElements.map((child) =>
			instantiate(child, frame),
		);
		const instance: Instance<T, P> = {
			hostFrame: frame,
			vnode,
			childInstances,
			childInstance: null,
		};
		return instance;
	} else {
		// Instantiate component vnode
		const instance = {} as Instance<T, P>;
		const publicInstance = createPublicInstance(vnode, instance);
		hooks.beforeRender(publicInstance);
		const childElement = publicInstance.render(props);
		const childInstance = childElement
			? instantiate(childElement, parentFrame)
			: undefined;
		const hostFrame = childInstance?.hostFrame;
		const updateProps: Partial<Instance<T, P>> = {
			hostFrame,
			vnode,
			childInstance,
			publicInstance,
		};
		Object.assign(instance, updateProps);
		return instance;
	}
}

const functionalComponentClasses = new WeakMap<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	FunctionalComponentType<any>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	new (props: any) => ClassComponent<any>
>();

const isLua = "_VERSION" in globalThis;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isClass = (constructor: ComponentType<any>) => {
	if (isLua) return typeof constructor !== "function";
	else return "prototype" in constructor;
};

function createPublicInstance<T, S, P>(
	vnode: VNode<P>,
	internalInstance: Instance<T, P>,
): ClassComponent<P, S, T> {
	const { type: ComponentType, props } = vnode;
	let constructor;
	if (typeof ComponentType === "string")
		throw "Tried createPublicInstance() with string";
	else if (isClass(ComponentType))
		// ComponentType.prototype && "render" in ComponentType.prototype)
		constructor = ComponentType as new (props: P) => ClassComponent<
			P,
			S,
			T
		>;
	else {
		const renderFunc = ComponentType as FunctionalComponentType<P>;
		const existingClass = functionalComponentClasses.get(renderFunc);
		if (existingClass)
			constructor = existingClass as new (props: P) => ClassComponent<
				P,
				S,
				T
			>;
		else {
			// Wrap the dynamic class in an object to avoid all functional
			// components being ClassComponent
			constructor = class extends ClassComponent<P, S, T> {
				// get displayName() {
				// 	return renderFunc.name;
				// }
				render(props: P) {
					return renderFunc(props);
				}
			};
			functionalComponentClasses.set(renderFunc, constructor);
		}
	}
	const publicInstance = new constructor(props);
	publicInstance.instance = internalInstance;
	return publicInstance;
}

const instanceMap = new WeakMap<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ClassComponent<any>,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Instance<any, any>
>();

export abstract class ClassComponent<P, S = unknown, T = unknown> {
	state = {} as S;

	constructor(public props: P) {}

	setState(partialState: Partial<S>): void {
		this.state = { ...this.state, ...partialState };
		const instance = instanceMap.get(this)!;
		if (instance) updateInstance(instance);
	}

	set instance(instance: Instance<T, P>) {
		instanceMap.set(this, instance);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	abstract render(props: P): VNode<any> | null;
}

function updateInstance<T>(internalInstance: Instance<T, unknown>) {
	const parentDom = adapter.getParent(internalInstance.hostFrame);
	const vnode = internalInstance.vnode;
	if (parentDom) reconcile(parentDom, internalInstance, vnode);
	else throw "Tried to reconcile instance with no dom.parentDom";
}
