/**
 * @file 定制版-移动端学生个人中心入口文件
 * @author xuguanlong
 */

'use strict';

import Vue from 'vue';
import FastClick from 'fastclick';
import './bindTel.scss';
import LoginForm from './common/components/login-form.vue';
import Copyright from './common/components/tx-copyright.vue';

import Toast from 'mint-ui/lib/toast';
import 'mint-ui/lib/toast/style.css';

window.toast = function(type, msg) {
    Toast(msg);
}
const app = new Vue({
    render(h) {
        return (<div id = "app" class = "app">
                    <div class = "logo-wrapper">
                        <div class = "logo"></div> 
                        <p> 让天下没有难做的学校 </p> 
                    </div>
                    <LoginForm></LoginForm> 
                    <Copyright></Copyright>
                </div>
        )
    }
}).$mount('#app');

FastClick.attach(document.body);
