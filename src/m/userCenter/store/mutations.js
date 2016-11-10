/**
 * @file 飞度定制版 gobal mutations
 * @author xuguanlong
 */

'use strict';
export default {
	'SET_CLASS_ID'(state, id) {
		state.classId = id;
	},
	'SET_STUDENT_LIST'(state, list) {
		state.studentList = list;
	},
	'SET_SIGNED_COUNT'(state, count) {
		state.signedCount = count;
	},
	'SET_CLASS_DETAIL'(state, detail) {
		state.classDetail = detail;
	}
}
