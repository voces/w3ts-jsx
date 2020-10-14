/** @noSelfInFile **/

type Pos =
	| {
			point: framepointtype;
			relative: framehandle | "previous" | "parent";
			relativePoint: framepointtype;
			x?: number;
			y?: number;
	  }
	| "parent"
	| "clear";

type AbsPos =
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
	model?: { modelFile?: string; cameraIndex?: number };
	scale?: number;
	spriteAnimate?: { primaryProp: number; flags: number };
	stepSize?: number;
	text?: string;
	textAlignment?: { vert: textaligntype; horz: textaligntype };
	textColor?: number;
	texture?: { texFile?: string; flag?: number; blend?: boolean };
	value?: number;
	vertexColor?: number;
	visible?: boolean;
	size?: { width?: number; height?: number };
	position?: Pos[] | null;
	absPosition?: AbsPos[] | null;
};

type SimpleFrameProps = CommonFrameProps;

type ComplexFrameProps = CommonFrameProps & {
	tooltip?: framehandle | null;
};

type FrameProps = ComplexFrameProps & {
	// events
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

type BackdropProps = ComplexFrameProps;

type ButtonProps = ComplexFrameProps & {
	// events
	onClick?: Handler;
	onMouseEnter?: Handler;
	onMouseLeave?: Handler;
	onMouseUp?: Handler;
	onMouseDown?: Handler;
	onMouseWheel?: Handler;
	onDoubleClick?: Handler;
};

type ChatDisplayProps = ComplexFrameProps & {
	// events
	onClick?: Handler;
	onMouseEnter?: Handler;
	onMouseLeave?: Handler;
	onMouseUp?: Handler;
	onMouseDown?: Handler;
	onMouseWheel?: Handler;
	onDoubleClick?: Handler;
};

type CheckboxProps = ComplexFrameProps & {
	// events
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

type ControlProps = ComplexFrameProps & {
	// events
	onMouseEnter?: Handler;
	onMouseLeave?: Handler;
	onMouseUp?: Handler;
	onMouseDown?: Handler;
};

type DialogProps = ComplexFrameProps & {
	// events
	onDialogCancel?: Handler;
	onDialogAccept?: Handler;
};

type EditBoxProps = ComplexFrameProps & {
	// events
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

type ContainerProps = ComplexFrameProps;

type GlueButtonProps = ComplexFrameProps & {
	// events
	onClick?: Handler;
	onMouseEnter?: Handler;
	onMouseLeave?: Handler;
	onMouseUp?: Handler;
	onMouseDown?: Handler;
	onMouseWheel?: Handler;
};

type GlueCheckboxProps = ComplexFrameProps & {
	// events
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

type GlueEditBoxProps = ComplexFrameProps & {
	// events
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

type GluePopupMenuProps = ComplexFrameProps & {
	// events
	onClick?: Handler;
	onMouseEnter?: Handler;
	onMouseLeave?: Handler;
	onMouseWheel?: Handler;
	onPopupmenuItemChanged?: Handler;
	onDoubleClick?: Handler;
};

type GlueTextButtonProps = ComplexFrameProps & {
	// events
	onClick?: Handler;
	onMouseEnter?: Handler;
	onMouseLeave?: Handler;
	onMouseUp?: Handler;
	onMouseDown?: Handler;
	onMouseWheel?: Handler;
	onDoubleClick?: Handler;
};

type HighlightProps = ComplexFrameProps;

type ListBoxProps = ComplexFrameProps & {
	// events
	onMouseEnter?: Handler;
	onMouseLeave?: Handler;
	onMouseUp?: Handler;
	onMouseDown?: Handler;
	onMouseWheel?: Handler;
};

type MenuProps = ComplexFrameProps & {
	// events
	onMouseEnter?: Handler;
	onMouseLeave?: Handler;
	onMouseUp?: Handler;
	onMouseDown?: Handler;
	onMouseWheel?: Handler;
};

type ModelProps = ComplexFrameProps & {
	// events
	onMouseEnter?: Handler;
	onMouseLeave?: Handler;
	onMouseUp?: Handler;
	onMouseDown?: Handler;
	onMouseWheel?: Handler;
};

type PopupMenuProps = ComplexFrameProps & {
	// events
	onClick?: Handler;
	onMouseEnter?: Handler;
	onMouseLeave?: Handler;
	onMouseWheel?: Handler;
	onPopupmenuItemChanged?: Handler;
	onDoubleClick?: Handler;
};

type ScrollbarProps = ComplexFrameProps & {
	// events
	onMouseEnter?: Handler;
	onMouseLeave?: Handler;
	onMouseUp?: Handler;
	onMouseDown?: Handler;
	onMouseWheel?: Handler;
	onSliderChanged?: Handler;
};

type SimpleButtonProps = SimpleFrameProps & {
	tooltip?: framehandle | null;
	// events
	onClick?: Handler;
};

type SimpleCheckboxProps = SimpleFrameProps;

type SimpleContainerProps = SimpleFrameProps;

type SimpleStatusBarProps = SimpleFrameProps;

type SlashChatboxProps = ComplexFrameProps & {
	// events
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

type SliderProps = ComplexFrameProps & {
	// events
	onClick?: Handler;
	onMouseEnter?: Handler;
	onMouseLeave?: Handler;
	onMouseUp?: Handler;
	onMouseDown?: Handler;
	onMouseWheel?: Handler;
	onSliderChanged?: Handler;
	onDoubleClick?: Handler;
};

type SpriteProps = ComplexFrameProps & {
	// events
	onSpriteAnimUpdate?: Handler;
};

type TextProps = ComplexFrameProps & {
	// events
	onClick?: Handler;
	onMouseEnter?: Handler;
	onMouseLeave?: Handler;
	onMouseUp?: Handler;
	onMouseDown?: Handler;
	onMouseWheel?: Handler;
	onDoubleClick?: Handler;
};

type TextAreaProps = ComplexFrameProps & {
	// events
	onMouseEnter?: Handler;
	onMouseLeave?: Handler;
	onMouseUp?: Handler;
	onMouseDown?: Handler;
	onMouseWheel?: Handler;
};

type TextButtonProps = ComplexFrameProps & {
	// events
	onClick?: Handler;
	onMouseEnter?: Handler;
	onMouseLeave?: Handler;
	onMouseUp?: Handler;
	onMouseDown?: Handler;
	onMouseWheel?: Handler;
	onDoubleClick?: Handler;
};

type TimerTextProps = ComplexFrameProps & {
	// events
	onClick?: Handler;
	onMouseEnter?: Handler;
	onMouseLeave?: Handler;
	onMouseUp?: Handler;
	onMouseDown?: Handler;
	onMouseWheel?: Handler;
	onDoubleClick?: Handler;
};

declare namespace JSX {
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
	}
}

// Missing from war3-types
declare function BlzFrameGetChildrenCount(frame: framehandle): number;
declare function BlzFrameGetChild(
	frame: framehandle,
	index: number,
): framehandle;
