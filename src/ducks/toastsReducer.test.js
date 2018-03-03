'use strict';

import deepFreeze from 'deep-freeze';
import toastsReducer from './toasts';
import { SHOW_TOAST, HIDE_TOAST } from 'ducks/actionTypes';




describe('toasts reducer', () => {
	it('can add a new toast', () => {
		const initialState = [];
		const nextState = [{
			message: 'hey',
			name: 'test',
			duration: 5000
		}];
		const action = {
			type: SHOW_TOAST,
			payload: {
				message: 'hey',
				name: 'test',
				duration: 5000
			}
		};

		// Enforce immutability
		deepFreeze(initialState);
		deepFreeze(nextState);
		deepFreeze(action);

		expect(toastsReducer(initialState, action)).toEqual(nextState);
	});

	it('adds new toasts to end of queue', () => {
		const initialState = [
			{ message: 'first' }
		];
		const nextState = [
			{ message: 'first' },
			{ message: 'second' }
		];
		const action = {
			type: SHOW_TOAST,
			payload: { message: 'second' }
		};

		// Enforce immutability
		deepFreeze(initialState);
		deepFreeze(nextState);
		deepFreeze(action);

		expect(toastsReducer(initialState, action)).toEqual(nextState);
	});

	it('removes first queued toast by default', () => {
		const initialState = [
			{ message: 'first' },
			{ message: 'second' }
		];
		const nextState = [
			{ message: 'second' }
		];
		const action = { type: HIDE_TOAST };

		// Enforce immutability
		deepFreeze(initialState);
		deepFreeze(nextState);
		deepFreeze(action);

		expect(toastsReducer(initialState, action)).toEqual(nextState);
	});

	it('can remove toast by name', () => {
		const initialState = [
			{ message: 'first', name: 'foo' },
			{ message: 'second', name: 'bar' }
		];
		const nextState = [
			{ message: 'first', name: 'foo' }
		];
		const action = {
			type: HIDE_TOAST,
			payload: 'bar'
		};

		// Enforce immutability
		deepFreeze(initialState);
		deepFreeze(nextState);
		deepFreeze(action);

		expect(toastsReducer(initialState, action)).toEqual(nextState);
	});

	it('updates toast with same name', () => {
		const initialState = [
			{ message: 'first', name: 'foo' },
			{ message: 'second', name: 'bar', duration: 5000 },
		];
		const nextState1 = [
			{ message: 'update 1', name: 'foo' },
			{ message: 'second', name: 'bar', duration: 5000 },
		];
		const nextState2 = [
			{ message: 'update 1', name: 'foo' },
			{ message: 'update 2', name: 'bar', duration: 2000 },
		];

		const action1 = {
			type: SHOW_TOAST,
			payload: { message: 'update 1', name: 'foo' }
		};

		const action2 = {
			type: SHOW_TOAST,
			payload: { message: 'update 2', name: 'bar', duration: 2000 }
		};

		// Enforce immutability
		deepFreeze(initialState);
		deepFreeze(nextState1);
		deepFreeze(nextState2);
		deepFreeze(action1);
		deepFreeze(action2);

		expect(toastsReducer(initialState, action1)).toEqual(nextState1);
		expect(toastsReducer(nextState1, action2)).toEqual(nextState2);
	});
});
