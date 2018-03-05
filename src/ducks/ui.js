import createSimpleAction from 'helpers/createSimpleAction';
import {
	SET_ACTIVE_STOP,
	TOGGLE_DRAWER,
	SET_VIEWPORT_WIDTH
} from 'ducks/actionTypes';



/////////////
// REDUCER //
/////////////

const defaultState = {
	activeStop: null,
	drawerOpen: false,
	viewportWidth: window.innerWidth
};

function uiReducer(state=defaultState, action) {
	switch (action.type) {
		case SET_ACTIVE_STOP:
			return {
				...state,
				activeStop: action.payload
			};

		case TOGGLE_DRAWER:
			return {
				...state,
				drawerOpen: action.payload
			};

		case SET_VIEWPORT_WIDTH:
			return {
				...state,
				viewportWidth: action.payload
			};

		default:
			return state;
	}
}

export default uiReducer;




/////////////
// ACTIONS //
/////////////

export const setActiveStop = createSimpleAction(SET_ACTIVE_STOP);
export const toggleDrawer = createSimpleAction(TOGGLE_DRAWER);
export const setViewportWidth = createSimpleAction(SET_VIEWPORT_WIDTH);




///////////////
// SELECTORS //
///////////////

export const activeStopSelector = state => state.ui.activeStop;
export const drawerOpenSelector = state => state.ui.drawerOpen;
export const viewportWidthSelector = state => state.ui.viewportWidth;
