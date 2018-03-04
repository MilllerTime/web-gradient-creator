import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import uiReducer from 'ducks/ui';
import activeGradientReducer from 'ducks/activeGradient';
import savesReducer from 'ducks/saves';
import toastsReducer from 'ducks/toasts';



const rootReducer = combineReducers({
	ui: uiReducer,
	activeGradient: activeGradientReducer,
	saves: savesReducer,
	toasts: toastsReducer
});

const enhancer = compose(
	applyMiddleware(ReduxThunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
);


// Initial state is empty, and each reducer produces its own default state.
const initialState = {};

const store = createStore(rootReducer, initialState, enhancer);

export default store;
