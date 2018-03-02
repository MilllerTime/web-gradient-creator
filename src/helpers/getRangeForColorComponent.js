import ColorSpace from 'enums/ColorSpace';



// helper
const makeRange = (min, max) => ({ min, max });

const rangeMap = {
	[ColorSpace.RGB]: [
		makeRange(0, 255),
		makeRange(0, 255),
		makeRange(0, 255)
	],
	[ColorSpace.HSL]: [
		makeRange(0, 360),
		makeRange(0, 1),
		makeRange(0, 1)
	],
	[ColorSpace.LAB]: [
		makeRange(0, 100),
		makeRange(-250, 250),
		makeRange(-250, 250)
	],
	[ColorSpace.HCL]: [
		makeRange(0, 255),
		makeRange(0, 150),
		makeRange(0, 150)
	]
};

export default function getRangeForColorComponent(colorSpace, index) {
	const range = rangeMap[colorSpace];
	if (!range) {
		throw new Error('Unsupported color space');
	}
	return range[index];
}
