/**
 * @file 飞度定制版 gobal mutations
 * @author xuguanlong
 */

'use strict';
export default {
	'SHOW_LOADING'(state) {
		state.loading = true;
	},
	'HIDE_LOADING'(state) {
		state.loading = false;
	},
	'UPDATE_ROUTER'(state, router) {
		state.router = router;
	},
	'UPDATE_BREAD_NAVS'(state, navs) {
		state.breadCrumbs = navs;
	}
}
