'use strict';

import {post, postJSON} from '../../common/util/service';

// user request
export function checkinList(params) {
	return post('/wechat/staff/checkinList.ajax', params);
}

export function checkinDetail(params) {
	return post('/wechat/staff/checkinDetail.ajax', params);
}

export function manualSign(params) {
	return postJSON('/wechat/staff/manualSign.ajax', params);
}

export function scanCodeSign(params) {
	return post('/wechat/staff/scanCodeSign', params);
}
