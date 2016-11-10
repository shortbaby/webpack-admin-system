/**
 * @file 定制版-移动端导师个人中心入口文件
 * @author xuguanlong
 */

'use strict';

import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

import FastClick from 'fastclick';
import store from './store/index';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import './teacher.scss';
import App from './app.vue';
import Copyright from '../common/components/tx-copyright.vue';

import { Toast, Indicator, MessageBox} from 'mint-ui';

require('../../../dep/date-format');
require('../../common/filters/date');
require('../../common/filters/minute');
require('../../common/filters/money');
require('../../common/filters/gender');

Vue.component('copyright', Copyright);

Vue.use(MintUI);
Vue.use(VueRouter);

window.toast = function(type, msg) {
	Toast(msg);
}

window.showIndicator = function() {
	Indicator.open('加载中...');
}

window.hideIndicator = function() {
	Indicator.close();
}

const router = new VueRouter({
	routes
});

const app = new Vue({
	store,
  	router,
  	render: h => h(App)
}).$mount('#app');

router.afterEach(route => {
	//app.$store.dispatch('updateRouter', route);
})

FastClick.attach(document.body);