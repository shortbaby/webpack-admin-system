
'use strict';

export default {
	state: {
		newClazzVisiable: false,
		lessons: []
	},
	mutations: {
		'SHOW_NEW_CLAZZ' (state) {
			state.newClazzVisiable = true;
		},
		'HIDE_NEW_CLAZZ' (state) {
			state.newClazzVisiable = false;
		},
		'SET_LESSONS' (state, lessons) {
			state.lessons = lessons;
		}
	}
}