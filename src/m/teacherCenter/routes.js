/**
 * @file 导师个人中心--路由配置
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
		alias: '导师中心',
		component: require('./components/center.vue')
	},
	{
		path: '/profile',
		name: 'profile',
		alias: '我的资料',
		component: require('./components/profile.vue')
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
		path: '/allstudents',
		name: 'allstudents',
		alias: '全部学员',
		component: require('./components/all-students.vue')
	},
	{
		path: '/timetable',
		name: 'timetable',
		alias: '课表',
		component: require('./components/timetable.vue')
	},
	{
		path: '/record',
		name: 'record',
		alias: '上课记录',
		component: require('./components/record.vue')
	}
]

