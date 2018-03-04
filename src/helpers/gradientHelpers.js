import chroma from 'chroma-js';

import ColorSpace from 'enums/ColorSpace';



// Generate array of colors representing a simulated gradient in `colorSpace` through `stops`.
// `stopCount` controls how many additional stops/colors to generate in between predefined stops.
export const gradientSwatchesSelector = (colorSpace, stopCount, stops) => {
	const colors = stops.map(stop => chroma[stop.colorSpace](...stop.color));
	return chroma.scale(colors).mode(colorSpace).colors(stopCount);
};

// Given an array of colors, generate a CSS gradient value.
export const simulatedGradientSelector = (swatches) => {
	const divisor = swatches.length - 1;
	const cssStops = swatches.map((color, i) => `${color} ${(i / divisor * 100).toFixed(1)}%`);
	const css = `linear-gradient(to right, ${cssStops.join(', ')})`;
	return css;
};

// Combines the above two functions. Given a gradient object, generates a CSS gradient.
// Useful for rendering the previews of saved gradients.
export const makeGradientFromSave = ({ colorSpace, stopCount, stops }) => {
	// A color space of "all" can't be rendered, so we'll default that to RGB.
	const safeColorStop = colorSpace === ColorSpace.All ? ColorSpace.RGB : colorSpace;

	return simulatedGradientSelector(
		gradientSwatchesSelector(safeColorStop, stopCount, stops)
	);
};
