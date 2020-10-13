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

type FrameProps = {
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
	tooltip?: framehandle | null;
	value?: number;
	vertexColor?: number;
	visible?: boolean;
	size?: { width?: number; height?: number };
	position?: Pos[] | null;
	absPosition?: AbsPos[] | null;
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

declare namespace JSX {
	interface IntrinsicElements {
		frame: FrameProps;
		"simple-frame": FrameProps;
	}
}

declare function BlzFrameGetChildrenCount(frame: framehandle): number;
declare function BlzFrameGetChild(
	frame: framehandle,
	index: number,
): framehandle;
