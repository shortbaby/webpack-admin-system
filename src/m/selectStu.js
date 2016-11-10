/**
 * @file 定制版-移动端学生个人中心入口文件
 * @author xuguanlong
 */

'use strict';

import Vue from 'vue';
import FastClick from 'fastclick';
import './selectStu.scss';
import Choose from './common/components/choose.vue';
import Copyright from './common/components/tx-copyright.vue';


window.toast = function(type, msg) {
    Toast(msg);
}
const app = new Vue({
    render(h) {
        return (<div id = "app" class = "app">
                    <Choose></Choose> 
                    <Copyright></Copyright>
                </div>
        )
    }
}).$mount('#app');

FastClick.attach(document.body);
