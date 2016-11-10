/**
 * @file 商学院定制版-store
 * @author xuguanlong
 */


'use strict';
import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		openId: '',
		studentId: 0,
		classId: 0,
		studentName: '',
		hotelType: -1,
		address: '',
		arriveNum: '',
		leaveNum: '',
		flightType: 1,
		recordId: 0,
		courseId: 0,
		orgId: 0,
		noticeId: 0,
		receiptDesc: '',
		hotelName: '',
		orgName: '',
		duty: '',
		arriveTime: '',
		leaveTime: '',
		pic: ''

	},
	strict: false,
	mutations,
	actions,
});


