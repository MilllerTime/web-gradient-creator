import { createSelector } from 'reselect';
import chroma from 'chroma-js';

import Theme from 'enums/Theme';
import ColorSpace from 'enums/ColorSpace';
import createSimpleAction from 'helpers/createSimpleAction';

import {
	SET_BACKGROUND,
	SET_COLOR_SPACE,
	SET_STOP_COUNT,
	// ADD_STOP,
	UPDATE_STOP
	// REMOVE_STOP
} from 'ducks/actionTypes';



/////////////
// REDUCER //
/////////////

const defaultState = {
	background: Theme.Dark,
	colorSpace: ColorSpace.HCL,
	stopCount: 8,
	stops: [
		{
			colorSpace: ColorSpace.LAB,
			l: 68,
			a: 17,
			b: 95
		},
		{
			colorSpace: ColorSpace.LAB,
			l: 11,
			a: 80,
			b: -108
		}
	]
};

function activeGradientReducer(state=defaultState, action) {
	switch (action.type) {
		case SET_BACKGROUND:
			return {
				...state,
				background: action.payload
			};

		case SET_COLOR_SPACE:
			return {
				...state,
				colorSpace: action.payload
			};

		case SET_STOP_COUNT:
			return {
				...state,
				stopCount: action.payload
			};

		case UPDATE_STOP:
			return updateStop(state, action)

		default:
			return state;
	}
}

export default activeGradientReducer;


// Helpers

function updateStop(state, action) {
	const { stopIndex, patch } = action.payload;

	return {
		...state,
		stops: state.stops.map((stop, i) => {
			if (i === stopIndex) {
				return { ...stop, ...patch };
			}
			return stop;
		})
	};
}




/////////////
// ACTIONS //
/////////////

const createUpdateStopAC = key => (stopIndex, value) => ({
	type: UPDATE_STOP,
	payload: {
		stopIndex,
		patch: { [key]: value }
	}
});

export const setBackground = createSimpleAction(SET_BACKGROUND);
export const setColorSpace = createSimpleAction(SET_COLOR_SPACE);
export const setStopCount = createSimpleAction(SET_STOP_COUNT);

export const setStopColorSpace = createUpdateStopAC('colorSpace');
export const setStopL = createUpdateStopAC('l');
export const setStopA = createUpdateStopAC('a');
export const setStopB = createUpdateStopAC('b');




///////////////
// SELECTORS //
///////////////

const rootSelector = state => state.activeGradient;

export const backgroundSelector = state => rootSelector(state).background;
export const colorSpaceSelector = state => rootSelector(state).colorSpace;
export const stopCountSelector = state => rootSelector(state).stopCount;

// Selected stops contain a computed `css` property based on the current target color space.
export const stopsSelector = createSelector(
	rootSelector,
	colorSpaceSelector,
	(root, colorSpace) => root.stops.map(stop => {
		return {
			...stop,
			css: chroma.lab(stop.l, stop.a, stop.b).css()
		};
	})
);

export const stopSelector = (state, stopIndex) => stopsSelector(state)[stopIndex];

// Simulated gradient computation (CSS gradient)
export const simulatedGradientSelector = createSelector(
	colorSpaceSelector,
	stopCountSelector,
	stopsSelector,
	(colorSpace, stopCount, stops) => {
		const colors = stops.map(stop => chroma.lab(stop.l, stop.a, stop.b));
		const scale = chroma.scale(colors).mode(colorSpace).colors(stopCount);
		const divisor = stopCount - 1;
		const cssStops = scale.map((color, i) => `${color} ${(i / divisor * 100).toFixed(1)}%`);
		const css = `linear-gradient(to right, ${cssStops.join(', ')})`;
		return css;
	}
);
