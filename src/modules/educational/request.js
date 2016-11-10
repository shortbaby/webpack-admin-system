
'use strict';

import {post, postJSON} from '../../common/util/service';
import $ from 'jquery';
// class request
export function getClassesList(params) {
	return post('/class/query.json', params);
}

export function classAdd(params) {
	return postJSON('/class/add.json', params);
}

export function classUpdate(params) {
	return postJSON('/class/update.json', params);
}

export function classDel(params) {
	return post('/class/del.json', params);
}

export function classBatchDel(params) {
	return post('/class/batchDel.json', params);
}

export function fuzzyQuery(params) {
	return post('/common/fuzzyQuery.json', params);
}

export function classLessons(params) {
	return post('/lesson/classLessons.json', params);
}

export function dropDownList(params) {
	return post('/lesson/dropDownList.json', params);
}

export function searchLessons(params) {
	return post('/lesson/searchLessons.json', params);
}

export function classStudents(params) {
	return post('/class/students.json', params);
}

export function lessonDel(params) {
	return post('/lesson/delLessons.json', params);
}

export function lessonAdd(params) {
	return post('/lesson/addClassLessons.json', params);
}

export function lessonEdit(params) {
	return post('/lesson/edit.json', params);
}

export function lessonDetail(params) {
	return post('/lesson/lessonDetail.json', params);
}

export function classDetail(params) {
	return post('/class/detail.json', params);
}

export function allOrgList(params) {
	return post('/org/allOrgList.json', params);
}

export function signOrgList(params){
	return post('/org/sign/orgList.json', params);
}

export function orgCityList(params) {
	return post('/org/cityList.json', params);
}

export function orgStudentsList(params) {
	return post('/org/student/list.json', params);
}

export function joinClass(params) {
	return post('/class/joinClass.json', params);
}

export function setJoinReceipt(params) {
	return post('/class/setJoinReceipt.json', params);
}

export function setDefaultReceiptData(params) {
	return post('/class/setDefaultReceiptData.json', params);
}

export function queryClass(params) {
	return post('/class/queryClassIdAndName.json', params);
}

export function queryTeacher(params) {
	return post('/teacher/fuzzyQueryByName.json', params);
}

export function exportClassStudents(params) {
	window.location.href = '/class/exportClassStudent.json' + '?classId=' + params.classId;
}

export function checkinList(params) {
	return post('/checkin/detail.json', params);
}

export function manualSign(params) {
	return postJSON('/checkin/manualSign.json', params);
}

export function cancelSign(params) {
	return post('/checkin/cancelSign.json', params);
}

export function allSign(params) {
	return post('/checkin/allSign.json', params);
}

export function teacherStatisticSearch(params) {
	return post('/classhour/teacherStatisticSearch.json', params);
}

export function teacherStatisticDetail(params) {
	return post('/classhour/teacherStatisticDetail.json', params);
}

export function teacherStatisticSearchExport(params) {
	window.location.href = "/classhour/teacherStatisticSearchExport.json?" + $.param(params);
}

export function teacherStatisticDetailExport(params) {
	window.location.href = "/classhour/teacherStatisticDetailExport.json?" + $.param(params);
}

export function getTeacherById(params) {
	return post('/teacher/getTeacherById.json', params);
}

export function queryAllClass(params) {
	return post('/class/query.json', params)
}
