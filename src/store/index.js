/**
 * @file 飞度定制版-store
 * @author xuguanlong
 */


'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import env from '../common/plugin/env';
import login from './modules/login';
import org from './modules/org';
import educational from './modules/educational';
import setting from './modules/setting';
import message from './modules/message';
import report from './modules/report';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		env: env,
		loading: false,
		router: {},
		breadCrumbs: []
	},
	strict: false,
	mutations,
	actions,
	modules: {
		login,
		educational,
		org,
		setting,
		message,
		report
	}
});


