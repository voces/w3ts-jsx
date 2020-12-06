import { adapter } from "../adapter";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const root = {} as any;

const triggerAddConditionMock = jest.fn();
globalThis.TriggerAddCondition = triggerAddConditionMock;

const blzTriggerRegisterFrameEventMock = jest.fn();
globalThis.BlzTriggerRegisterFrameEvent = blzTriggerRegisterFrameEventMock;

const triggerClearConditionsMock = jest.fn();
globalThis.TriggerClearConditions = triggerClearConditionsMock;

beforeEach(() => {
	triggerAddConditionMock.mockClear();
	blzTriggerRegisterFrameEventMock.mockClear();
	triggerClearConditionsMock.mockClear();
});

it("clears conditions when changing callback", () => {
	let props = {};
	let nextProps = {};
	const frame = adapter.createFrame("container", root, props);

	expect(triggerAddConditionMock).toHaveBeenCalledTimes(0);

	nextProps = { onClick: jest.fn() };
	adapter.updateFrameProperties(frame, props, nextProps);
	props = nextProps;

	expect(blzTriggerRegisterFrameEventMock).toHaveBeenCalledTimes(1);
	expect(triggerClearConditionsMock).toHaveBeenCalledTimes(0);
	expect(triggerAddConditionMock).toHaveBeenCalledTimes(1);

	nextProps = { onClick: jest.fn() };
	adapter.updateFrameProperties(frame, props, nextProps);
	props = nextProps;

	expect(blzTriggerRegisterFrameEventMock).toHaveBeenCalledTimes(1);
	expect(triggerClearConditionsMock).toHaveBeenCalledTimes(1);
	expect(triggerAddConditionMock).toHaveBeenCalledTimes(2);
});
