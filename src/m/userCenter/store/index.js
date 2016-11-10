/**
 * @file 商学院定制版-store
 * @author xuguanlong
 */


'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		classId: 0,
		studentList: [],
		signedCount: 0,
		classDetail: {}
	},
	strict: false,
	mutations,
	actions,
});