'use strict';

import {post, postJSON} from '../../common/util/service';

// user request
export function teacherInfo(params) {
	return post('/wechat/teacher/teacherInfo.ajax', params);
}

export function teacherClasses(params) {
	return post('/wechat/teacher/classes.ajax', params);
}

export function teacherLessons(params) {
	return post('/wechat/teacher/lessons.ajax', params);
}

export function teacherClassDetail(params) {
	return post('/wechat/teacher/classDetail.ajax', params);
}

export function teacherRecord(params) {
	return post('/wechat/teacher/consumeRecord.ajax', params);
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