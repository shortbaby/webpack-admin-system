/**
 * @file 学员个人中心--路由配置
 * @author xuguanlong
 */

'use strict';
	
export default [
	{
		 path: '/', redirect: '/center'
	},
	{
		path: '/center',
		name: 'center',
		alias: '学员中心',
		component: require('./components/center.vue')
	},
	{
		path: '/profile',
		name: 'profile',
		alias: '我的资料',
		component: require('./components/profile.vue')
	},
	{
		path: '/notice',
		name: 'notice',
		alias: '我的资料',
		component: require('./components/notice.vue')
	},
	{
		path: '/noticedetail',
		name: 'noticeDetail',
		alias: '通知详情',
		component: require('./components/notice-detail.vue')
	},
	{
		path: '/mycode',
		name: 'mycode',
		alias: '我的二维码',
		component: require('./components/mycode.vue')
	},
	{
		path: '/sign',
		name: 'sign',
		alias: '签到状态',
		component: require('./components/sign.vue')
	},
	{
		path: '/timetable',
		name: 'timetable',
		alias: '课表',
		component: require('./components/timetable.vue')
	},
	{
		path: '/class',
		name: 'class',
		alias: '我的班级',
		component: require('./components/class.vue')
	},
	{
		path: '/classdetail',
		name: 'classdetail',
		alias: '班级详情',
		component: require('./components/class-detail.vue')
	},
	{
		path: '/receipt',
		name: 'receipt',
		alias: '报班回执',
		component: require('./components/receipt.vue')
	},
	{
		path: '/room',
		name: 'room',
		alias: '订房',
		component: require('./components/room.vue')
	},
	{
		path: '/flight',
		name: 'flight',
		alias: '航班或车次',
		component: require('./components/flight.vue')
	},
	{
		path: '/record',
		name: 'record',
		alias: '上课记录',
		component: require('./components/record.vue')
	},
	{
		path: '/recorddetail',
		name: 'recordDetail',
		alias: '上课记录详情',
		component: require('./components/record-detail.vue')
	},
	{
		path: '/contract',
		name: 'contract',
		alias: '合同',
		component: require('./components/contract.vue')
	}
]

