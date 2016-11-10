/**
 * @file 飞度定制版 gobal actions
 * @author xuguanlong
 */

'use strict';
export default {
	setOpenId({commit}, id) {
		commit('SET_OPEN_ID', id);
	},
	setStudentId({commit}, id) {
		commit('SET_STUDENT_ID', id);
	},
	setClassId({commit}, id) {
		commit('SET_CLASS_ID', id);
	},
	setStudentName({commit}, name) {
		commit('SET_STUDENT_NAME', name);
	},
	setHotelType({commit}, type) {
		commit('SET_HOTEL_TYPE', type);
	},
	setClassAddress({commit}, address) {
		commit('SET_CLASS_ADDRESS', address);
	},
	setArriveNum({commit}, num) {
		commit('SET_ARRIVE_NUM', num);
	},
	setLeaveNum({commit}, num) {
		commit('SET_LEAVE_NUM', num);
	},
	setFlightType({commit}, type) {
		commit('SET_FLIGHT_TYPE', type);
	},
	setRecordId({commit}, id) {
		commit('SET_RECORD_ID', id);
	},
	setCourseId({commit}, id) {
		commit('SET_COURSE_ID', id);
	},
	setOrgId({commit}, id) {
		commit('SET_ORG_ID', id);
	},
	setNoticeId({commit}, id) {
		commit('SET_NOTICE_ID', id);
	},
	setReceiptDesc({commit}, desc) {
		commit('SET_RECEIPT_DESC', desc);
	},
	setHotelName({commit}, name) {
		commit('SET_HOTEL_NAME', name);
	},
	setOrgName({commit}, name) {
		commit('SET_ORG_NAME', name);
	},
	setDuty({commit}, duty) {
		commit('SET_DUTY', duty);
	},
	setPic({commit}, pic) {
		commit('SET_PIC', pic);
	},
	setArriveTime({commit}, date) {
		commit('SET_ARRIVE_TIME', date);
	},
	setLeaveTime({commit}, date) {
		commit('SET_LEAVE_TIME', date);
	}
 }