/** @noSelfInFile **/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Adapter<T = any, P = any> = {
	createFrame: (jsxType: string, parentFrame: T, props: P) => T;
	cleanupFrame: (frame: T) => void;
	updateFrameProperties: (frame: T, prevProps: P, nextProps: P) => void;
	getParent: (frame: T) => T | undefined;
};

const baseCreateFrame: Adapter["createFrame"] = () => {
	throw "Adapter has not implemented createFrame";
};

const baseCleanupFrame: Adapter["cleanupFrame"] = () => {
	throw "Adapter has not implemented cleanupFrame";
};

const baseUpdateFrameProperties: Adapter["updateFrameProperties"] = () => {
	throw "Adapter has not implemented updateFrameProperties";
};

const baseGetParent: Adapter["getParent"] = () => {
	throw "Adapter has not implemented getParent";
};

const internalAdapter: Adapter = {
	createFrame: baseCreateFrame,
	cleanupFrame: baseCleanupFrame,
	updateFrameProperties: baseUpdateFrameProperties,
	getParent: baseGetParent,
};

export const adapter = internalAdapter;

export const setAdapter = (adapter: Partial<Adapter>): void => {
	// We do this just to ensure we set all methods on intenralAdapter
	internalAdapter.createFrame = adapter.createFrame ?? baseCreateFrame;
	internalAdapter.cleanupFrame = adapter.cleanupFrame ?? baseCleanupFrame;
	internalAdapter.getParent = adapter.getParent ?? baseGetParent;
	internalAdapter.updateFrameProperties =
		adapter.updateFrameProperties ?? baseUpdateFrameProperties;
};
