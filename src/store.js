import { createStore, combineReducers, compose } from 'redux';

import uiReducer from 'ducks/ui';
import activeGradientReducer from 'ducks/activeGradient';



const rootReducer = combineReducers({
	ui: uiReducer,
	activeGradient: activeGradientReducer
});

const enhancer = compose(
	// applyMiddleware(ReduxThunk),
	// applyMiddleware(ReduxThunk.withExtraArgument(api)),
	window.devToolsExtension ? window.devToolsExtension() : f => f
);


// Initial state is empty, and each reducer produces its own default state.
const initialState = {};

const store = createStore(rootReducer, initialState, enhancer);

export default store;
