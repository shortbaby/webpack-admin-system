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
		openId: '',
		teacherId: 0,
		classId: 0,
		students: []
	},
	strict: false,
	mutations,
	actions,
});