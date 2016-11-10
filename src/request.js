'use strict';

import {post, postJSON} from './common/util/service';

export function queryAllNewCount(params) {
	return post('/stationMessageQuery/queryAllNewCount.json', params);
}

export function queryNewByMinId(params) {
	return post('/stationMessageQuery/queryNewByMinId.json', params);
}

export function getUserInfo(params) {
	return post('/userinfo.json', params);
}

export function queryNewBell(params) {
	return post('/stationMessageQuery/queryNewBell.json', params);
}