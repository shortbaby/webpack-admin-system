/**
 * @file 定制版-入口文件
 * @author xuguanlong
 */

'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './route';
import App from './app';
import store from './store/index';
import Element from 'element-ui';
import TxAuthPlugin from './modules/common/TxAuthPlugin';
import TxUpload from './common/components/upload/index';

Vue.use(TxAuthPlugin);
Vue.use(TxUpload);

import 'element-ui/lib/theme-default/index.css';
import './resource/css/main.scss';

require('../dep/date-format');

//dep zoomimage

// 缩略图点击浏览
require('../dep/zoomimage/js/eye');
require('../dep/zoomimage/js/utils');
require('../dep/zoomimage/js/zoomimage');

// filter

require('./common/filters/date');
require('./common/filters/minute');
require('./common/filters/money');
require('./common/filters/week');
require('./common/filters/gender');

//directives
// require('./common/directives/popover');
require('./common/directives/compressImage');
require('./common/directives/zoomimage');
require('./common/directives/clickoutside');

var Loading = require('./common/directives/loading');
Vue.use(VueRouter);
Vue.use(Element);
Vue.use(Loading);

const messageHanlder = Vue.prototype.$message;

const router = new VueRouter({
	routes
});

const app = new Vue({
	store,
  	router,
  	render: h => h(App)
}).$mount('#app');

router.afterEach(route => {
	app.$store.dispatch('updateRouter', route);
});
function removeBodyModal() {
	document.body.style.overflow = 'visible';
}

window.removeBodyModal = removeBodyModal;
window.router = router;
window.toast = function(type, msg) {
	switch(type) 
	{
		case 'error':
			messageHanlder.error(msg);
			break;
		default:
			messageHanlder({
				message: msg,
				type: type
			});
	}
}

