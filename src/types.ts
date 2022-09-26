import type { Children, VNode } from "basic-pragma";

export type RelativeFrame =
  | framehandle
  | "previous"
  | "parent"
  | "children"
  | "children-reverse";

export type Pos =
  | {
    point: framepointtype;
    relative: RelativeFrame;
    relativePoint: framepointtype;
    x?: number;
    y?: number;
  }
  | "parent"
  | "clear";

export type AbsPos =
  | {
    point: framepointtype;
    x?: number;
    y?: number;
  }
  | "clear";

type Handler = (() => void) | null;

// Props shared by all frame types
type CommonFrameProps = {
  // immutable props
  name?: string;
  priority?: number;
  isSimple?: boolean;
  typeName?: string | null;
  inherits?: string;
  context?: number;
  key?: string | number | null;
  // mutable props
  alpha?: number;
  enabled?: boolean;
  font?: { fileName?: string; height?: number; flags?: number };
  level?: number;
  maxLength?: number;
  minMaxValue?: { min?: number; max?: number };
  scale?: number;
  text?: string;
  textAlignment?: { vert: textaligntype; horz: textaligntype };
  textColor?: number;
  texture?: { texFile?: string; flag?: number; blend?: boolean } | string;
  value?: number;
  vertexColor?: number;
  visible?: boolean;
  size?: { width?: number; height?: number } | number;
  position?: Pos | Pos[] | null;
  absPosition?: AbsPos | AbsPos[] | null;
  ref?: { current: framehandle } | null;
  children?: Children;
};

// Props shared by all simple frames
type SimpleFrameProps = CommonFrameProps;

// Props shared by all frames that are not simple frames
type ComplexFrameProps = CommonFrameProps & {
  // deno-lint-ignore no-explicit-any
  tooltip?: VNode<any> | null;
};

export type FrameProps = ComplexFrameProps & {
  model?: { modelFile?: string; cameraIndex?: number } | string;
  spriteAnimate?: { primaryProp: number; flags: number };
  stepSize?: number;
  onClick?: Handler;
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
  onMouseWheel?: Handler;
  onCheckboxChecked?: Handler;
  onCheckboxUnchecked?: Handler;
  onEditboxTextChanged?: Handler;
  onPopupmenuItemChanged?: Handler;
  onDoubleClick?: Handler;
  onSpriteAnimUpdate?: Handler;
  onSliderChanged?: Handler;
  onDialogCancel?: Handler;
  onDialogAccept?: Handler;
  onEditboxEnter?: Handler;
};

export type BackdropProps = ComplexFrameProps;

export type ButtonProps = ComplexFrameProps & {
  onClick?: Handler;
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
  onMouseWheel?: Handler;
  onDoubleClick?: Handler;
};

export type ChatDisplayProps = ComplexFrameProps & {
  onClick?: Handler;
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
  onMouseWheel?: Handler;
  onDoubleClick?: Handler;
};

export type CheckboxProps = ComplexFrameProps & {
  onClick?: Handler;
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
  onMouseWheel?: Handler;
  onCheckboxChecked?: Handler;
  onCheckboxUnchecked?: Handler;
  onDoubleClick?: Handler;
};

export type ControlProps = ComplexFrameProps & {
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
};

export type DialogProps = ComplexFrameProps & {
  onDialogCancel?: Handler;
  onDialogAccept?: Handler;
};

export type EditBoxProps = ComplexFrameProps & {
  onClick?: Handler;
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
  onMouseWheel?: Handler;
  onEditboxTextChanged?: Handler;
  onDoubleClick?: Handler;
  onEditboxEnter?: Handler;
};

export type ContainerProps = ComplexFrameProps;

export type GlueButtonProps = ComplexFrameProps & {
  onClick?: Handler;
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
  onMouseWheel?: Handler;
};

export type GlueCheckboxProps = ComplexFrameProps & {
  onClick?: Handler;
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
  onMouseWheel?: Handler;
  onCheckboxChecked?: Handler;
  onCheckboxUnchecked?: Handler;
  onDoubleClick?: Handler;
};

export type GlueEditBoxProps = ComplexFrameProps & {
  onClick?: Handler;
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
  onMouseWheel?: Handler;
  onEditboxTextChanged?: Handler;
  onDoubleClick?: Handler;
  onEditboxEnter?: Handler;
};

export type GluePopupMenuProps = ComplexFrameProps & {
  onClick?: Handler;
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseWheel?: Handler;
  onPopupmenuItemChanged?: Handler;
  onDoubleClick?: Handler;
};

export type GlueTextButtonProps = ComplexFrameProps & {
  onClick?: Handler;
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
  onMouseWheel?: Handler;
  onDoubleClick?: Handler;
};

export type HighlightProps = ComplexFrameProps;

export type ListBoxProps = ComplexFrameProps & {
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
  onMouseWheel?: Handler;
};

export type MenuProps = ComplexFrameProps & {
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
  onMouseWheel?: Handler;
};

export type ModelProps = ComplexFrameProps & {
  model?: { modelFile?: string; cameraIndex?: number } | string;
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
  onMouseWheel?: Handler;
};

export type PopupMenuProps = ComplexFrameProps & {
  onClick?: Handler;
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseWheel?: Handler;
  onPopupmenuItemChanged?: Handler;
  onDoubleClick?: Handler;
};

export type ScrollbarProps = ComplexFrameProps & {
  stepSize?: number;
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
  onMouseWheel?: Handler;
  onSliderChanged?: Handler;
};

export type SimpleButtonProps = SimpleFrameProps & {
  // deno-lint-ignore no-explicit-any
  tooltip?: VNode<any> | null;
  onClick?: Handler;
};

export type SimpleCheckboxProps = SimpleFrameProps;

export type SimpleContainerProps = SimpleFrameProps;

export type SimpleStatusBarProps = SimpleFrameProps;

export type SlashChatboxProps = ComplexFrameProps & {
  onClick?: Handler;
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
  onMouseWheel?: Handler;
  onEditboxTextChanged?: Handler;
  onDoubleClick?: Handler;
  onEditboxEnter?: Handler;
};

export type SliderProps = ComplexFrameProps & {
  stepSize?: number;
  onClick?: Handler;
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
  onMouseWheel?: Handler;
  onSliderChanged?: Handler;
  onDoubleClick?: Handler;
};

export type SpriteProps = ComplexFrameProps & {
  spriteAnimate?: { primaryProp: number; flags: number };
  onSpriteAnimUpdate?: Handler;
};

export type TextProps = ComplexFrameProps & {
  onClick?: Handler;
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
  onMouseWheel?: Handler;
  onDoubleClick?: Handler;
};

export type TextAreaProps = ComplexFrameProps & {
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
  onMouseWheel?: Handler;
};

export type TextButtonProps = ComplexFrameProps & {
  onClick?: Handler;
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
  onMouseWheel?: Handler;
  onDoubleClick?: Handler;
};

export type TimerTextProps = ComplexFrameProps & {
  onClick?: Handler;
  onMouseEnter?: Handler;
  onMouseLeave?: Handler;
  onMouseUp?: Handler;
  onMouseDown?: Handler;
  onMouseWheel?: Handler;
  onDoubleClick?: Handler;
};

export type StatusBarProps = ComplexFrameProps & {
  model: { modelFile?: string; cameraIndex?: number } | string;
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      frame: FrameProps;
      "simple-frame": FrameProps;
      backdrop: BackdropProps;
      button: ButtonProps;
      chatdisplay: ChatDisplayProps;
      checkbox: CheckboxProps;
      control: ControlProps;
      dialog: DialogProps;
      editbox: EditBoxProps;
      container: ContainerProps;
      gluebutton: GlueButtonProps;
      gluecheckbox: GlueCheckboxProps;
      glueeditbox: GlueEditBoxProps;
      gluepopupmenu: GluePopupMenuProps;
      gluetextbutton: GlueTextButtonProps;
      heightlight: HighlightProps;
      listbox: ListBoxProps;
      menu: MenuProps;
      model: ModelProps;
      popupmenu: PopupMenuProps;
      scrollbar: ScrollbarProps;
      "simple-button": SimpleButtonProps;
      "simple-checkbox": SimpleCheckboxProps;
      "simple-container": SimpleContainerProps;
      "simple-statusbar": SimpleStatusBarProps;
      slashchatbox: SlashChatboxProps;
      slider: SliderProps;
      sprite: SpriteProps;
      text: TextProps;
      textarea: TextAreaProps;
      textbutton: TextButtonProps;
      timertext: TimerTextProps;
      statusbar: StatusBarProps;
    }
  }
}
