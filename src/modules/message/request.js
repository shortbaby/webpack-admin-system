'use strict';

import {post, postJSON} from '../../common/util/service';

export function queryBtach(params) {
	return post('/stationMessageQuery/queryBatch.json', params);
}

export function readOne(params) {
	return post('/stationMessageQuery/readOne.json', params);
}

export function readBatch(params) {
	return post('/stationMessageQuery/readBatch.json', params);
}

export function queryNewCount(params) {
	return post('/stationMessageQuery/queryAllNewCount.json', params);
}

export function queryNewByMinid(params) {
	return post('/stationMessageQuery/queryNewByMinId.json', params);
}

export function queryNewBell(params) {
	return post('/stationMessageQuery/queryNewBell.json', params);
}

