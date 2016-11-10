'use strict';
import Vue from 'vue';
import Login from './login.vue';

import Element from 'element-ui';
import store from './store/index';

import 'element-ui/lib/theme-default/index.css';
import './resource/css/login.scss';

Vue.use(Element);

Vue.config.debug = true;

new Vue({
	store,
  	render: h => h(Login)
}).$mount('#login');
