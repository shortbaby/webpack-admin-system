'use strict';

import {post, postJSON} from '../../common/util/service';

// user request
export function getUserInfoByAccount(params) {
	return post('/user/getUserInfoByAccount.json', params);
}

export function getUserById(params) {
	return post('/user/getUserById.json', params);
}

export function userSave(params) {
	return post('/user/save.json', params);
}

export function userUpdate(params) {
	return post('/user/update.json', params);
}

export function userDelete(params) {
	return post('/user/delete.json', params);
}

export function userDisable(params) {
	return post('/user/disable.json', params);
}

export function userQuery(params) {
	return post('/user/query.json', params);
}

export function userQueryByName(params) {
	return post('/user/queryByName.json', params);
}

export function userQueryByMobile(params) {
	return post('/user/queryByMobile.json', params);
}

export function userGetAllRoles(params) {
	return post('/user/getAllRoleToList.json', params);
}

export function allRoles(params) {
	return post('/user/getAllRole.json', params);
}
export function userGetAllCompany(params) {
	return post('/user/getAllCompany.json', params);
}

//teacher request

export function getTeacherById(params) {
	return post('/teacher/getTeacherById.json', params);
}

export function teacherQuery(params) {
	return post('/teacher/query.json', params);
}

export function teacherDelete(params) {
	return post('/teacher/delete.json', params);
}

export function teacherSave(params) {
	return post('/teacher/save.json', params);
}

export function teacherUpdate(params) {
	return post('/teacher/update.json', params);
}

// role request

export function getPermissions(params) {
	return post('/role/getPermissions.json', params);
}

export function detailPermissions(params) {
	return post('/role/detailPermission.json', params);
}

export function savePermissions(params) {
	return post('/role/savePermission.json', params);
}

export function getRoleList(params) {
	return post('/role/list.json', params);
}

export function roleDetail(params) {
	return post('/role/detail.json', params);
}

export function roleAdd(params) {
	return post('/role/add.json', params);
}

export function roleEdit(params) {
	return post('/role/edit.json', params);
}

export function roleDel(params) {
	return post('/role/del.json', params);
}

export function getModules(params) {
	return post('/role/getModules', params);
}