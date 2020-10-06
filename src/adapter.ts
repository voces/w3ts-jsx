import { Adapter } from "basic-pragma";

// https://wc3modding.info/pages/jass-documentation-database/class/functions/file/common.j/

const frameDefaults: Required<FrameProps> = {
	// immutable props
	name: "",
	priority: 0,
	isSimple: true,
	// mutable props
	alpha: 255,
	enabled: true,
	font: { fileName: "", height: 16, flags: 0 },
	level: 0,
	maxLength: 9999,
	minMaxValue: { min: -999999999, max: 999999999 },
	model: { modelFile: "", cameraIndex: 0 },
	scale: 1,
	spriteAnimate: { primaryProp: 0, flags: 0 },
	stepSize: 0,
	text: "",
	textAlignment: { vert: TEXT_JUSTIFY_TOP, horz: TEXT_JUSTIFY_LEFT },
	textColor: 0xffffff,
	texture: { texFile: "", flag: 0, blend: false },
	tooltip: null,
	value: 0,
	vertexColor: 0xffffff,
	visible: true,
	position: null,
	absPosition: null,
};

const context = 0;

const absurd = (value: never) => {
	throw new Error(`Got ${value} when expected nothing`);
};

const setProp = (
	frame: framehandle,
	// This typing is wrong, should be prop: K, value?: FrameProps[K]
	prop: keyof FrameProps,
	value?: FrameProps[keyof FrameProps],
) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const val = value ?? (frameDefaults[prop] as any);
	switch (prop) {
		case "text": {
			BlzFrameSetText(frame, val);
			break;
		}
		case "maxLength": {
			BlzFrameSetTextSizeLimit(frame, val);
			break;
		}
		case "textColor": {
			BlzFrameSetTextColor(frame, val);
			break;
		}
		case "texture": {
			BlzFrameSetTexture(
				frame,
				val.txFile ?? frameDefaults.texture.texFile,
				val.flag ?? frameDefaults.texture.flag,
				val.blend ?? frameDefaults.texture.blend,
			);
			break;
		}
		case "model": {
			BlzFrameSetModel(
				frame,
				val.modelFile ?? frameDefaults.model.modelFile,
				val.cameraIndex ?? frameDefaults.model.cameraIndex,
			);
			break;
		}
		case "alpha": {
			BlzFrameSetAlpha(frame, val);
			break;
		}
		case "level": {
			BlzFrameSetLevel(frame, val);
			break;
		}
		case "visible": {
			BlzFrameSetVisible(frame, val);
			break;
		}
		case "enabled": {
			BlzFrameSetEnable(frame, val);
			break;
		}
		case "vertexColor": {
			BlzFrameSetVertexColor(frame, val);
			break;
		}
		case "value": {
			BlzFrameSetValue(frame, val);
			break;
		}
		case "stepSize": {
			BlzFrameSetStepSize(frame, val);
			break;
		}
		case "tooltip": {
			BlzFrameSetTooltip(frame, val);
			break;
		}
		case "font": {
			BlzFrameSetFont(
				frame,
				val.fileName ?? frameDefaults.font.fileName,
				val.height ?? frameDefaults.font.height,
				val.flags ?? frameDefaults.font.flags,
			);
			break;
		}
		case "minMaxValue": {
			BlzFrameSetMinMaxValue(
				frame,
				val.min ?? frameDefaults.minMaxValue.min,
				val.max ?? frameDefaults.minMaxValue.max,
			);
			break;
		}
		case "scale": {
			BlzFrameSetScale(frame, val);
			break;
		}
		case "spriteAnimate": {
			BlzFrameSetSpriteAnimate(
				frame,
				val.primaryProp ?? frameDefaults.spriteAnimate.primaryProp,
				val.flags ?? frameDefaults.spriteAnimate.flags,
			);
			break;
		}
		case "textAlignment": {
			BlzFrameSetTextAlignment(
				frame,
				val.vert ?? frameDefaults.textAlignment.vert,
				val.horz ?? frameDefaults.textAlignment.horz,
			);
			break;
		}
		case "position": {
			if (val != null)
				val.forEach((position: Pos) => {
					if (position === "clear") BlzFrameClearAllPoints(frame);
					else
						BlzFrameSetPoint(
							frame,
							position.point,
							position.relative,
							position.relativePoint,
							position.x ?? 0,
							position.y ?? 0,
						);
				});
			break;
		}
		case "absPosition": {
			if (val != null)
				val.forEach((absPosition: AbsPos) => {
					if (absPosition === "clear") BlzFrameClearAllPoints(frame);
					else
						BlzFrameSetAbsPoint(
							frame,
							absPosition.point,
							absPosition.x ?? 0,
							absPosition.y ?? 0,
						);
				});
			break;
		}
		case "name":
		case "priority":
		case "isSimple":
			break;
		default:
			absurd(prop);
	}
};

export const adapter: Adapter<framehandle> = {
	createFrame: (
		jsxType: string,
		parentFrame: framehandle,
		{ name, priority, isSimple, ...props }: FrameProps,
	) => {
		let frame: framehandle;
		if (isSimple ?? jsxType === "simple-frame")
			frame = BlzCreateSimpleFrame(name, parentFrame, context);
		else {
			// TODO: we can theoretically type this
			if (priority == null) throw new Error("Expected a priority!");
			frame = BlzCreateFrame(name, parentFrame, priority, context);
		}

		// This type casting is safe here, but may cause bugs later...
		adapter.updateFrameProperties(frame, {}, props);

		return frame;
	},

	cleanupFrame: (frame: framehandle): void => BlzDestroyFrame(frame),

	updateFrameProperties: (
		frame: framehandle,
		prevProps: FrameProps,
		nextProps: FrameProps,
	) => {
		let prop: keyof FrameProps;

		// Clear removed props
		for (prop in prevProps) if (!(prop in nextProps)) setProp(frame, prop);

		// Add new props
		for (prop in nextProps)
			if (nextProps[prop] !== prevProps[prop])
				setProp(frame, prop, nextProps[prop]);
	},

	getParent: (frame: framehandle): framehandle => BlzFrameGetParent(frame),
};
