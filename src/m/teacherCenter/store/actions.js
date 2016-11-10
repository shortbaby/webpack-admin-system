/**
 * @file 飞度定制版 gobal actions
 * @author xuguanlong
 */

'use strict';
export default {
	setOpenId({commit}, id) {
		commit('SET_OPEN_ID', id);
	},
	setTeacherId({commit}, id) {
		commit('SET_TEACHER_ID', id);
	},
	setClassId({commit}, id) {
		commit('SET_CLASS_ID', id);
	},
	setStudents({commit}, students) {
		commit('SET_STUDENTS', students);
	}
}