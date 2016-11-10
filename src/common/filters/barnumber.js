/**
 * 生成一维码的展示号
 * @author peilonghui
 */

import Vue from 'vue';

Vue.filter('barnumber', function (input) {
    
    if (!input) {
        return '';
    }
    
    input = input.toString();
    return input.match(/.{1,4}/g).join('&nbsp;&nbsp;&nbsp;');
});