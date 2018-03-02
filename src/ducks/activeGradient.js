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
			color: [68, 17, 95]
		},
		{
			colorSpace: ColorSpace.LAB,
			color: [11, 80, -108]
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
		{
			const { stopIndex, patch } = action.payload;

			const stop = state.stops[stopIndex];
			const stopUpdate = {
				...stop,
				...patch
			};

			// If color space changed but color did not, convert color.
			const colorSpaceChanged = patch.hasOwnProperty('colorSpace') && patch.colorSpace !== stop.colorSpace;
			const colorChanged = patch.hasOwnProperty('color') && patch.color !== stop.color;
			if (colorSpaceChanged && !colorChanged) {
				const parsedColor = chroma[stop.colorSpace](...stop.color);
				stopUpdate.color = parsedColor[patch.colorSpace]();
			}

			return {
				...state,
				stops: state.stops.map((stop, i) => i === stopIndex ? stopUpdate : stop)
			};
		}

		default:
			return state;
	}
}

export default activeGradientReducer;




/////////////
// ACTIONS //
/////////////

const createUpdateStopAction = key => (stopIndex, value) => ({
	type: UPDATE_STOP,
	payload: {
		stopIndex,
		patch: { [key]: value }
	}
});

export const setBackground = createSimpleAction(SET_BACKGROUND);
export const setColorSpace = createSimpleAction(SET_COLOR_SPACE);
export const setStopCount = createSimpleAction(SET_STOP_COUNT);

export const setStopColorSpace = createUpdateStopAction('colorSpace');
export const setStopColor = createUpdateStopAction('color');





///////////////
// SELECTORS //
///////////////

const rootSelector = state => state.activeGradient;

export const backgroundSelector = state => rootSelector(state).background;
export const colorSpaceSelector = state => rootSelector(state).colorSpace;
export const stopCountSelector = state => rootSelector(state).stopCount;

// Selected stops contain a computed `css` property based on the current target color space.
// This could be sped up by memoizing the map function by both stop reference and index.
export const stopsSelector = createSelector(
	rootSelector,
	root => root.stops.map(stop => {
		const chromaColor = chroma[stop.colorSpace](...stop.color);
		return {
			...stop,
			color: stop.color,
			css: chromaColor.css()
		};
	})
);

export const stopSelector = (state, stopIndex) => stopsSelector(state)[stopIndex];
