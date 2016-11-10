/**
 * @file 飞度定制版 gobal mutations
 * @author xuguanlong
 */

'use strict';
export default {
	'SET_OPEN_ID' (state, id) {
		state.openId = id;
	},
	'SET_TEACHER_ID'(state, id) {
		state.teacherId = id;
	},
	'SET_CLASS_ID'(state, id) {
		state.classId = id;
	},
	'SET_STUDENTS'(state, array) {
		state.students = array;
	}
}
