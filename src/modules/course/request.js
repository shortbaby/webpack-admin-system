'use strict';

import {post, postJSON} from '../../common/util/service';

/**
 * 获取课程列表信息
 * @return {Promise}
 */
export function getSingleCourseList(param) {
	return post('/course/single/search.json', param);
}
/**
 * 获取课程组合列表信息
 * @return {Promise}
 */
export function getAssembleCourseList(param) {
	return post('/course/assemble/search.json', param);
}
/**
 * 获取课程套餐列表信息
 * @return {Promise}
 */
export function getPackageCourseList(param) {
	return post('/business/search.json', param);
}
/**
 * 删除课程
 * @return {Promise}
 */
export function deleteSingle(param) {
	return post('/course/single/delete.json', param);
}
/**
 * 删除课程组合
 * @return {Promise}
 */
export function deleteAssemble(param) {
	return post('/course/assemble/delete.json', param);
}
/**
 * 删除课程套餐
 * @return {Promise}
 */
export function deletePackage(param) {
	return post('/business/delete.json', param);
}
/**
 * 添加课程(保存)
 * @return {Promise}
 */
export function addSingleCourse(param) {
	return postJSON('/course/single/add.json', param);
}
/**
 * 添加课程组合(保存)
 * @return {Promise}
 */
export function addCombineCourse(param) {
	return postJSON('/course/assemble/add.json', param);
}
/**
 * 添加课程套餐(保存)
 * @return {Promise}
 */
export function addPackageCourse(param) {
	return postJSON('/business/add.json', param);
}
/**
 * 获取编辑课程信息
 * @return {Promise}
 */
export function getSingleDetail(param) {
	return post('/course/single/detail.json', param);
}
/**
 * 获取编辑课程组合信息
 * @return {Promise}
 */
export function getCombineDetail(param) {
	return post('/course/assemble/detail.json', param);
}
/**
 * 获取编辑课程套餐信息
 * @return {Promise}
 */
export function getPackageDetail(param) {
	return post('/business/detail.json', param);
}
/**
 * 编辑课程(保存)
 * @return {Promise}
 */
export function editSingleCourse(param) {
	return postJSON('/course/single/edit.json', param);
}
/**
 * 编辑课程组合(保存)
 * @return {Promise}
 */
export function editCombineCourse(param) {
	return postJSON('/course/assemble/edit.json', param);
}
/**
 * 编辑课程套餐(保存)
 * @return {Promise}
 */
export function editPackageCourse(param) {
	return postJSON('/business/edit.json', param);
}
/**
 * 搜索课程
 * @return {Promise}
 */
export function getCourseList(param) {
	return post('/common/fuzzyQuery.json', param);
}
/**
 * 搜索标签
 * @return {Promise}
 */
export function getTagList(param) {
	return post('/tag/fuzzyQuery.json', param);
}



