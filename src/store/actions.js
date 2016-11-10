/**
 * @file 定制版 gobal actions
 * @author xuguanlong
 */

'use strict';
export default {
	incrementErrorTimes({commit}) {
		commit('INCREMENT_ERROR_TIMES');
	},
	updateRouter({commit}, router) {
		commit('UPDATE_ROUTER', router);
	},
	showNewClazzDialog( {commit}) {
		commit('SHOW_NEW_CLAZZ');
	},
	hideNewClazzDialog({commit}) {
		commit('HIDE_NEW_CLAZZ');
	},
	setHeader({commit}) {
		commit('SET_HEADER');
	},
	hideSetHeader({commit}) {
		commit('HIDE_SET_HEADER');
	},
	batchImport({commit}) {
		commit('BATCH_IMPORT');
	},
	hideBatchImport({commit}) {
		commit('HIDE_BATCH_IMPORT');
	},
	showAddStudent({commit}) {
		commit('SHOW_ADDSTUDENT');
	},
	hideAddStudent({commit}) {
		commit('HIDE_ADDSTUDENT');
	},
	showRecords({commit}) {
		commit('SHOW_RECORDS');
	},
	hideRecords({commit}) {
		commit('HIDE_RECORDS');
	},
	setScheduleLessons({commit}, array) {
		commit('SET_LESSONS', array);
	},
	showLoading({commit}) {
		commit('SHOW_LOADING');
	},
	hideLoading({commit}) {
		commit('HIDE_LOADING');
	},
	updateBreadNavs({commit}, array) {
		commit('UPDATE_BREAD_NAVS', array);
	}
}