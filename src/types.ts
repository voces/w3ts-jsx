type Pos =
	| {
			point: framepointtype;
			relative: framehandle;
			relativePoint: framepointtype;
			x?: number;
			y?: number;
	  }
	| "clear";

type AbsPos =
	| {
			point: framepointtype;
			x?: number;
			y?: number;
	  }
	| "clear";

type FrameProps = {
	name: string;
	priority?: number;
	isSimple?: boolean;
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
	position?: Pos[] | null;
	absPosition?: AbsPos[] | null;
};

// eslint-disable-next-line @typescript-eslint/no-namespace, @typescript-eslint/no-unused-vars
declare namespace JSX {
	interface IntrinsicElements {
		frame: FrameProps;
	}
}
