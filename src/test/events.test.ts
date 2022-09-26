import { adapter } from "../adapter";
import { initUI } from "w3api/dist/ui/init";

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
  initUI();
});

it("clears conditions when changing callback", () => {
  let props = {};
  let nextProps = {};
  const frame = adapter.createFrame(
    "container",
    BlzCreateFrame("foo", undefined as unknown as framehandle, 0, 0),
    props,
  );

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
