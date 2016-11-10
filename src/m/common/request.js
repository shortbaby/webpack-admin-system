'use strict';

import {post, postJSON} from '../../common/util/service';

// user request
export function bind(params) {
	return post('/wechat/webauth/bind.ajax', params);
}

export function sendCode(params) {
	return post('/sms/send.ajax', params);
}

export function getOrgList(params) {
	return post('/wechat/student/myOrganizations.ajax', params);
}

export function getMsgDetail(params) {
	return post('/wechat/student/msgDetail.ajax', params);
}