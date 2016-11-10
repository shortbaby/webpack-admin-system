
/**
 * @fileOverview 性别
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

import Vue from 'vue';

const GENDER_MAP = {
    0: '男',
    1: '女'
};

/**
 * 格式化时间 
 * @param {string} date  
 * @param {string} pattern  
 * @return {string}         
 */
Vue.filter('gender', function(input) {
	return GENDER_MAP[input];
});