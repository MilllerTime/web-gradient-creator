import { createStore, combineReducers, compose } from 'redux';



const rootReducer = combineReducers({
	test: state => ({})
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
