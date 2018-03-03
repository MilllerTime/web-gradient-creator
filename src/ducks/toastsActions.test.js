'use strict';

import store from 'store';
import { defaultDuration, showToast, hideToast, toastsSelector } from './toasts';


//////////
// NOTE //
//////////

// Jest renamed runTimersToTime to advanceTimersByTime in Jest 22.0.0
// When create react app upgrades jest, this will need to be changed.


const { dispatch, getState } = store;

jest.useFakeTimers();

describe('toast system', () => {
	it('automatically hides a toast', () => {
		const toast = { message: 'A Toast!' };

		dispatch(showToast(toast));
		expect(toastsSelector(getState())).toEqual([toast]);

		jest.runTimersToTime(defaultDuration);
		expect(toastsSelector(getState())).toEqual([]);
	});

	it('hides a toast given a custom duration', () => {
		const toast = {
			message: 'A Toast!',
			duration: defaultDuration + 2000 // Longer than default
		};

		dispatch(showToast(toast));
		expect(toastsSelector(getState())).toEqual([toast]);

		// Toast should still exist after default duration
		jest.runTimersToTime(defaultDuration);
		expect(toastsSelector(getState())).toEqual([toast]);

		jest.runTimersToTime(2000);
		expect(toastsSelector(getState())).toEqual([]);
	});

	it('builds up and tears down a simple queue of toasts over time', () => {
		const toast1 = { message: 'Toast One' };
		const toast2 = { message: 'Toast Two', duration: 8200 };
		const toast3 = { message: 'Toast Three' };

		// Queue up toasts syncronously
		dispatch(showToast(toast1));
		dispatch(showToast(toast2));
		dispatch(showToast(toast3));
		expect(toastsSelector(getState())).toEqual([toast1, toast2, toast3]);

		jest.runTimersToTime(defaultDuration);
		expect(toastsSelector(getState())).toEqual([toast2, toast3]);
		jest.runTimersToTime(8200);
		expect(toastsSelector(getState())).toEqual([toast3]);
		jest.runTimersToTime(defaultDuration);
		expect(toastsSelector(getState())).toEqual([]);
	});

	it('does not interrupt running timer when queuing new toast after delay', () => {
		const toast1 = {
			message: 'Toast One',
			duration: 5000
		};
		const toast2 = {
			message: 'Toast Two',
			duration: 5000
		};

		dispatch(showToast(toast1));
		jest.runTimersToTime(4000);
		// Queue second toast after a delay, but before first toast is dismissed.
		dispatch(showToast(toast2));
		expect(toastsSelector(getState())).toEqual([toast1, toast2]);

		jest.runTimersToTime(1000);
		expect(toastsSelector(getState())).toEqual([toast2]);
		jest.runTimersToTime(4000);
		// At this point, 5000ms have passed since queuing second toast. However, it should still be in queue
		// since the first toast had 1000ms remaining time.
		expect(toastsSelector(getState())).toEqual([toast2]);
		jest.runTimersToTime(1000);
		// After another 1000ms, the queue should be empty
		expect(toastsSelector(getState())).toEqual([]);
	});

	it('starts next countdown when manually removing current toast', () => {
		const toast1 = {
			message: 'Toast One',
			name: 'toast1',
			duration: 5000
		};
		const toast2 = {
			message: 'Toast Two',
			duration: 5000
		};

		dispatch(showToast(toast1));
		dispatch(showToast(toast2));
		expect(toastsSelector(getState())).toEqual([toast1, toast2]);
		// After partially advancing time and then forcefully dismissing the current toast,
		// timer for next toast should start immediately.
		jest.runTimersToTime(2000);
		dispatch(hideToast('toast1'));
		expect(toastsSelector(getState())).toEqual([toast2]);
		// Also ensure next toast gets its full duration
		jest.runTimersToTime(3000);
		expect(toastsSelector(getState())).toEqual([toast2]);
		jest.runTimersToTime(2000);
		expect(toastsSelector(getState())).toEqual([]);
	});

	it('does not affect current countdown to remove a toast later in the queue', () => {
		const toast1 = {
			message: 'Toast One',
			duration: 5000
		};
		const toast2 = {
			message: 'Toast Two',
			name: 'hiddenToast',
			duration: 20000
		};
		const toast3 = {
			message: 'Toast Three',
			duration: 5000
		};


		// Add two toasts and allow some time to pass (not enough to dismiss any toasts).
		dispatch(showToast(toast1));
		dispatch(showToast(toast2));
		jest.runTimersToTime(2000);
		expect(toastsSelector(getState())).toEqual([toast1, toast2]);
		// Add a third toast and remove the second one by name
		dispatch(showToast(toast3));
		dispatch(hideToast('hiddenToast'));
		expect(toastsSelector(getState())).toEqual([toast1, toast3]);
		// First toast's timer should not have been affected
		jest.runTimersToTime(3000);
		expect(toastsSelector(getState())).toEqual([toast3]);
		// Finally last toast uses its own duration
		jest.runTimersToTime(5000);
		expect(toastsSelector(getState())).toEqual([]);
	});

	it('updates an existing action with the same name', () => {
		const toast1 = {
			message: 'Toast One',
			duration: 5000
		};

		const toast2 = {
			name: 'namedToast',
			message: 'Toast Two',
			duration: 5000
		};

		const toast3 = {
			name: 'namedToast',
			message: 'Updated Toast',
			duration: 10000
		};

		// Add two toasts and allow some time to pass (not enough to dismiss any toasts).
		dispatch(showToast(toast1));
		dispatch(showToast(toast2));
		jest.runTimersToTime(2000);
		expect(toastsSelector(getState())).toEqual([toast1, toast2]);
		// Update the second toast (same name)
		dispatch(showToast(toast3));
		expect(toastsSelector(getState())).toEqual([toast1, toast3]);
		// First toast's timer should not have been affected
		jest.runTimersToTime(3000);
		expect(toastsSelector(getState())).toEqual([toast3]);
	});

	it('extends timer when updating current action', () => {
		const toast1 = {
			name: 'namedToast',
			message: 'Toast One',
			duration: 5000
		};

		const toast2 = {
			message: 'Toast Two',
			duration: 5000
		};

		const toast3 = {
			name: 'namedToast',
			message: 'Updated Toast',
			duration: 10000
		};

		// Add two toasts and allow some time to pass (not enough to dismiss any toasts).
		dispatch(showToast(toast1));
		dispatch(showToast(toast2));
		jest.runTimersToTime(2000);
		// Update first toast, extending its display time
		expect(toastsSelector(getState())).toEqual([toast1, toast2]);
		dispatch(showToast(toast3));
		// By this time the original toast would have expired, but the updated toast should still exist.
		jest.runTimersToTime(5000);
		expect(toastsSelector(getState())).toEqual([toast3, toast2]);
		// Updated toast is dismissed
		jest.runTimersToTime(5000);
		expect(toastsSelector(getState())).toEqual([toast2]);
	});
});
