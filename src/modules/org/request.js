/**
 * @filter 机构管理API
 * @author xujin
 */

'use strict';

import {post, postJSON} from '../../common/util/service';


/**
 * 获取表头设置
 * @return {Promise}
 */
export function getHeaderConfig (param) {
	return post('/common/getConfig.json', param);
}

/**
 * 设置表头
 * @return {Promise}
 */
export function setHeaderConfig (param) {
	return post('/common/setConfig.json', param);
}
/**
 * 获取销售跟进人列表
 * @return {Promise}
 */
export function getSaleStaff (param) {
	return post('/org/saleStaffList.json', param);
}
/**
 * 获取总部跟进人列表
 * @return {Promise}
 */
export function getHeadquarters (param) {
	return post('/org/headquartersList.json', param);
}
/**
 * 获取课程套餐
 * @return {Promise}
 */
export function getPackageCourse (param) {
	return post('/common/fuzzyQuery.json', param);
}
/**
 * 获取城市
 * @return {Promise}
 */
export function getCityList (param) {
	return post('/org/cityList.json', param);
}
/**
 * 获取机构身份
 * @return {Promise}
 */
export function getIdentity (param) {
	return post('/org/identityList.json', param);
}
/**
 * 获取我的机构列表
 * @return {Promise}
 */
export function getMyOrgList (param) {
	return post('/org/myOrgList.json', param);
}
/**
 * 获取全部机构列表
 * @return {Promise}
 */
export function getAllOrgList (param) {
	return post('/org/allOrgList.json', param);
}
/**
 * 删除我的机构
 * @return {Promise}
 */
export function deleteMyOrg (param) {
	return post('/org/deleteMy.json', param);
}
/**
 * 删除全部机构
 * @return {Promise}
 */
export function deleteOrg (param) {
	return post('/org/delete.json', param);
}
/**
 * 保存新增机构
 * @return {Promise}
 */
export function saveAdd (param) {
	return postJSON('/org/add.json', param);
}
/**
 * 获取机构编辑详情
 * @return {Promise}
 */
export function getOrgDetail (param) {
	return post('/org/detail.json', param);
}
/**
 * 保存编辑我的机构
 * @return {Promise}
 */
export function saveEditMy (param) {
	return postJSON('/org/editMy.json', param);
}
/**
 * 保存编辑全部机构
 * @return {Promise}
 */
export function saveEditAll (param) {
	return postJSON('/org/edit.json', param);
}
/**
 * 获取机构详情页表头信息
 * @return {Promise}
 */
export function getOrgInfo (param) {
	return post('/org/profileInfo.json', param);
}
/**
 * 获取机构课程消耗列表
 * @return {Promise}
 */
export function getConsumeList (param) {
	return post('/classhour/courseNum.json', param);
}
/**
 * 获取机构课程消耗详情
 * @return {Promise}
 */
export function getConsumeDetail (param) {
	return post('/classhour/courseNumDetail.json', param);
}
/**
 * 获取机构合同列表
 * @return {Promise}
 */
export function getContractList (param) {
	return post('/org/contractList.json', param);
}
/**
 * 获取机构详情页学员列表
 * @return {Promise}
 */
export function getStudentList (param) {
	return post('/org/student/list.json', param);
}
/**
 * 获取学员详情
 * @return {Promise}
 */
export function getStudentDetail (param) {
	return post('/org/student/detail.json', param);
}
/**
 * 保存编辑学员
 * @return {Promise}
 */
export function saveEditStudent (param) {
	return post('/org/student/editMy.json', param);
}
/**
 * 保存新建学员
 * @return {Promise}
 */
export function saveAddStudent (param) {
	return post('/org/student/addMy.json', param);
}
/**
 * 删除学员
 * @return {Promise}
 */
export function deleteMyStudent (param) {
	return post('/org/student/deleteMy.json', param);
}
/**
 * 保存编辑学员
 * @return {Promise}
 */
export function saveEditAllStudent (param) {
	return post('/org/student/edit.json', param);
}
/**
 * 保存新建学员
 * @return {Promise}
 */
export function saveAddAllStudent (param) {
	return post('/org/student/add.json', param);
}
/**
 * 删除学员
 * @return {Promise}
 */
export function deleteAllStudent (param) {
	return post('/org/student/delete.json', param);
}
/**
 * 获取报班详情列表
 * @return {Promise}
 */
export function getRecordList (param) {
	return post('/class/queryJoinLog.json', param);
}
/**
 * 获取班级列表
 * @return {Promise}
 */
export function getClassList (param) {
	return post('/org/classList.json', param);
}
/**
 * 退班
 * @return {Promise}
 */
export function quitMyClass (param) {
	return post('/org/quitClassMy.json', param);
}
/**
 * 退班
 * @return {Promise}
 */
export function quitClass (param) {
	return post('/org/quitClass.json', param);
}
/**
 * 跟进记录列表
 * @return {Promise}
 */
export function followList (param) {
	return post('/org/comment/list.json', param);
}
/**
 * 获取单条跟进记录详情
 * @return {Promise}
 */
export function followDetail (param) {
	return post('/org/comment/detail.json', param);
}
/**
 * 删除单条跟进记录
 * @return {Promise}
 */
export function delFollow (param) {
	return post('/org/comment/delete.json', param);
}
/**
 * 保存编辑跟进记录
 * @return {Promise}
 */
export function editFollow (param) {
	return post('/org/comment/edit.json', param);
}
/**
 * 保存新增跟进记录
 * @return {Promise}
 */
export function addFollow (param) {
	return post('/org/comment/add.json', param);
}
/**
 * 获取销售跟进人列表
 * @return {Promise}
 */
export function getStaffList (param) {
	return post('/org/staffList.json', param);
}
/**
 * 分配销售跟进人
 * @return {Promise}
 */
export function allocateSale (param) {
	return post('/org/allocateSaleMy.json', param);
}
/**
 * 分配销售跟进人
 * @return {Promise}
 */
export function allocateAll (param) {
	return post('/org/allocateSale.json', param);
}
/**
 * 分配总部跟进人
 * @return {Promise}
 */
export function allocateHeadquarters (param) {
	return post('/org/allocateHeadquartersMy.json', param);
}
/**
 * 分配总部跟进人
 * @return {Promise}
 */
export function allocateHeadquartersAll (param) {
	return post('/org/allocateHeadquarters.json', param);
}
/**
 * 获取总部跟进人列表
 * @return {Promise}
 */
export function getHeaderList (param) {
	return post('/org/headerList.json', param);
}
/**
 * 获取微信绑定学院列表
 * @return {Promise}
 */
export function getBindStudent (param) {
	return post('/org/bindStudentList.json', param);
}
/**
 * 获取微信绑定学院列表
 * @return {Promise}
 */
export function getAddInfo (param) {
	return post('/org/orgInfo.json', param);
}
/**
 * 获取报班学员列表
 * @return {Promise}
 */
export function getAddStudents (param) {
	return post('/org/orgStudentList.json', param);
}
/**
 * 获取报班班级列表
 * @return {Promise}
 */
export function getAddClass (param) {
	return post('/class/query.json', param);
}
/**
 * 获取报班班级列表可用课程
 * @return {Promise}
 */
export function getUseableCourse (param) {
	return post('/class/queryUseableCourse.json', param);
}
/**
 * 获取报班班级城市
 * @return {Promise}
 */
export function getUseableCity (param) {
	return post('/class/queryUseableCity.json', param);
}
/**
 * 机构报班
 * @return {Promise}
 */
export function signUpMy (param) {
	return post('/org/signUpMy.json', param);
}
/**
 * 机构报班
 * @return {Promise}
 */
export function signUp (param) {
	return post('/org/signUp.json', param);
}
/**
 * 机构发通知
 * @return {Promise}
 */
export function noticeMy (param) {
	return postJSON('/org/sendNoticeMy.json', param);
}
/**
 * 机构发通知
 * @return {Promise}
 */
export function noticeAll (param) {
	return postJSON('/org/sendNotice.json', param);
}
/**
 * 导入进度
 * @return {Promise}
 */
export function checkUploadProcessStatus (param) {
	return post('/common/progress.json', param);
}













