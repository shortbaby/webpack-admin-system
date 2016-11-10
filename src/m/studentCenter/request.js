'use strict';

import {post, postJSON} from '../../common/util/service';

// user request
export function studentInfo(params) {
	return post('/wechat/student/studentInfo.ajax', params);
}

export function getOrgList(params) {
	return post('/wechat/student/myOrganizations.ajax', params);
}

export function studentLessons(params) {
	return post('/wechat/student/lessons.ajax', params);
}

export function studentClasses(params) {
	return post('/wechat/student/classes.ajax', params);
}

export function studentReadMsg(params) {
	return post('/wechat/student/readMsg.ajax', params);
}

export function studentClassDetail(params) {
	return post('/wechat/student/classDetail.ajax', params);
}

export function studentModifyReceipt(params) {
	return postJSON('/wechat/student/modifyReceipt.ajax', params);
}

export function studentMsgList(params) {
	return post('/wechat/student/msgList.ajax', params);
}

export function studentMsgDetail(params) {
	return post('/wechat/student/msgDetail.ajax', params);
}

export function studentContracts(params) {
	return post('/wechat/student/contracts.ajax', params);
}

export function studentConsumeRecord(params) {
	return post('/wechat/student/consumeRecord.ajax', params);
}

export function unbind(params) {
	return post('/wechat/common/unbind.ajax', params);
}

export function modifyHeadImg(params) {
	return post('/wechat/common/modifyHeadImg.ajax', params);
}

export function upload(params) {
	return post('/wechat/common/upload.ajax', params);
}