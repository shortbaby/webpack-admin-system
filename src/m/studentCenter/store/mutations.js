/**
 * @file 飞度定制版 gobal mutations
 * @author xuguanlong
 */

'use strict';
export default {
	'SET_OPEN_ID' (state, id) {
		state.openId = id;
	},
	'SET_STUDENT_ID'(state, id) {
		state.studentId = id;
	},
	'SET_CLASS_ID'(state, id) {
		state.classId = id;
	},
	'SET_STUDENT_NAME' (state, name) {
		state.studentName = name;
	},
	'SET_HOTEL_TYPE' (state, type) {
		state.hotelType = type;
	},
	'SET_CLASS_ADDRESS' (state, address) {
		state.address = address;
	},
	'SET_ARRIVE_NUM' (state, num) {
		state.arriveNum = num;
	},
	'SET_LEAVE_NUM' (state, num) {
		state.leaveNum = num;
	},
	'SET_FLIGHT_TYPE'(state, type) {
		state.flightType = type;
	},
	'SET_RECORD_ID'(state, id) {
		state.recordId = id;
	},
	'SET_COURSE_ID'(state, id) {
		state.courseId = id;
	},
	'SET_ORG_ID'(state, id) {
		state.orgId = id;
	},
	'SET_NOTICE_ID'(state, id) {
		state.noticeId = id;
	},
	'SET_HOTEL_NAME'(state, name) {
		state.hotelName = name;
	},
	'SET_RECEIPT_DESC'(state, desc) {
		state.receiptDesc = desc;
	},
	'SET_DUTY'(state, duty) {
		state.duty = duty;
	},
	'SET_ORG_NAME'(state, name) {
		state.orgName = name;
	},
	'SET_PIC'(state, pic) {
		state.pic = pic;
	},
	'SET_ARRIVE_TIME'(state, date) {
		state.arriveTime = date;
	},
	'SET_LEAVE_TIME'(state, date) {
		state.leaveTime = date;
	}
}
