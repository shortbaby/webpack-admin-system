
'use strict';

export default {
	state: {
		errorTimes: 0
	},
	mutations: {
		'INCREMENT_ERROR_TIMES' (state) {
			state.errorTimes = 3;
		}
	}
}