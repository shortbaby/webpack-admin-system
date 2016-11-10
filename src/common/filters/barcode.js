/**
 * @fileOverview 获取某个数字的一位码
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

'use strict';

import Vue from 'vue';
/**
 * 格式化时间 
 * @param {string} date  
 * @param {string} pattern  
 * @return {string}         
 */
Vue.filter('barcode', function(code) {
	if (!code) {
		return '';
	}
 	return 'http://m.genshuixue.com/static/barcode?size=6&margin=0'
        + '&code=' + code;
});