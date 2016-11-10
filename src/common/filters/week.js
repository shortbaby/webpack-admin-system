/**
 * @fileOverview 格式化时间
 * @author xuguanlong
 */

'use strict';
import Vue from 'vue';

const WEEK_MAP = {
    0: '周日',
    1: '周一',
    2: '周二',
    3: '周三',
    4: '周四',
    5: '周五',
    6: '周六'
};
/**
 * 格式化时间 获取周几
 * @param {string} date   
 * @return {string}         
 */
Vue.filter('week', function(date) {
	if (!date) {
		return '';
	}
    let dd = date;
    if (typeof(dd) === 'number') {
        dd = new Date(date);  
    } 
    return WEEK_MAP[dd.getDay()];
});