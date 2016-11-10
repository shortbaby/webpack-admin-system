/**
 * @file 飞度定制版 gobal actions
 * @author xuguanlong
 */

'use strict';
export default {
	setClassId({commit}, id) {
		commit('SET_CLASS_ID', id);
	},
	setClassDetail({commit}, detail) {
		commit('SET_CLASS_DETAIL', detail);
	},
	setSignedCount({commit}, count) {
		commit('SET_SIGNED_COUNT', count);
	},
	setStudentList({commit}, list) {
		commit('SET_STUDENT_LIST', list);
	}
}