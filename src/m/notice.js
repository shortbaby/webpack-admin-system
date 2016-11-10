/**
 * @file 定制版-移动端消息详情页面
 * @author xuguanlong
 */

'use strict';

import Vue from 'vue';
import FastClick from 'fastclick';
import './notice.scss';
import Notice from './common/components/wx-notice.vue';
import Copyright from './common/components/tx-copyright.vue';

import Toast from 'mint-ui/lib/toast';
import 'mint-ui/lib/toast/style.css';

window.toast = function(type, msg) {
    Toast(msg);
}
const app = new Vue({
    render(h) {
        return (<div id = "app" class = "app">
                    <Notice></Notice>
                    <Copyright></Copyright>
                </div>
        )
    }
}).$mount('#app');

FastClick.attach(document.body);
