
/**
 * @file 定制版-错误页入口文件
 * @author xuguanlong
 */
'use strict';

import './resource/css/other.scss';
import redirect from './common/function/redirect';
const logout = function() {
	redirect('/ac/logout.json');
}

document.querySelector('#back').onclick = function (event) {
	logout();
}