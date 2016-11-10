'use strict';

import {post, postJSON} from '../../common/util/service';

export function getContractList(params) {
	return post('/contract/query.json', params);
}

export function getById(params) {
	return post('/contract/getById.json', params);
}

export function relevance(params) {
	return postJSON('/contract/relevance.json', params);
}

export function review(params) {
	return post('/contract/review.json', params);
}

export function queryPackage(params) {
	return post('/business/queryPackage.json', params);
}

export function getOrgByName(params) {
	return post('/org/queryByName.json', params);
}

export function getOrgById(params) {
	return post('/org/queryById.json', params);
}

export function getOrgList(params) {
	return post('/org/contract/orgList.json', params);
}

export function getOrgCityList(params) {
	return post('/org/cityList.json', params);
}

export function getBusniessTags(params) {
	return post('/business/getAllTags.json', params);
}

export function getAllSaleStaffs(params) {
	return post('/user/getAllSaleStaffers.json', params);
}

/**
 * 保存新增机构
 * @return {Promise}
 */
export function saveAdd (param) {
	return postJSON('/org/add.json', param);
}