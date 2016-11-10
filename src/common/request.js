
'use strict';

import {post, get} from './util/service';

/**
 * 获取微信api签名
 */
export function getWechatSignature (params) {
	return post('/wechat/common/getJsticket.ajax', params);
}

export function getModules (params) {
	return post('/role/getModules.json', params);
}
