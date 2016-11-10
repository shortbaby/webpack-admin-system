/**
 * @file 飞度定制版-路由配置
 * @author xuguanlong
 */

'use strict';
	
export default [
	{   path: '/', 
		redirect: '/message/list'
	},
	{
		path: '/message',
		name: 'message',
		component: require('./modules/message/index.vue'),
		children: [
			{
				path: 'list',
				component: require('./modules/message/list.vue')
			}
		]
	},
	{
		path: '/report',
		name: 'report',
		component: require('./modules/report/index.vue'),
		children: [
			{
				path: 'orgdetail',
				component: require('./modules/report/org-detail.vue')
			},
			{
				path: 'course',
				component: require('./modules/report/course.vue')
			},
			{
				path: 'joinclass',
				component: require('./modules/report/join-class.vue')
			},
			{
				path: 'orgdata',
				component: require('./modules/report/org-data.vue')
			}
		]
	},
	{	
		name: 'educational',
		path: '/educational',
		component: require('./modules/educational/index.vue'),
		children: [
			{
				path: 'classes',
				component: require('./modules/educational/classes.vue')
			},
			{
				path: 'schedule',
				component: require('./modules/educational/schedule.vue')
			},
			{
				path: 'sign',
				component: require('./modules/educational/sign.vue')
			},
			{
				path: 'periods',
				component: require('./modules/educational/periods.vue')
			}
		]
	},
	{
		name: 'contract', 
		path: '/contract',
		component: require('./modules/contract/index.vue'),
		children: [
			{
				path: 'list',
				component: require('./modules/contract/list.vue')
			}
		]
	},
	{	
		name: 'setting',
		path: '/setting',
		component: require('./modules/setting/index.vue'),
		children: [
			{
				path: 'role',
				component: require('./modules/setting/role.vue')
			},
			{
				path: 'users',
				component: require('./modules/setting/users.vue')
			},
			{
				path: 'teachers',
				component: require('./modules/setting/teachers.vue')
			}
		]
	},
	{	
		name: 'organization',
		path: '/org',
		component: require('./modules/org/myOrg.vue'),
		children: [
			{
				path: 'effective',
				component: require('./modules/org/components/orgEffective.vue')
			},
			{
				path: 'uneffective',
				component: require('./modules/org/components/unEffective.vue')
			}
		]
	},
	{	
		name: 'organization',
		path: '/org/allOrg',
		component: require('./modules/org/allOrg.vue')
	},
	{	name: 'course',
		path: '/course',
		component: require('./modules/course/index.vue'),
		children: [
			{
				path: 'courseList',
				component: require('./modules/course/components/courseList.vue')
			},
			{
				path: 'combinedCourse',
				component: require('./modules/course/components/combinedList.vue')
			}
		]
	},
	{
		name: 'course',
		path: '/course/coursePackage',
		component: require('./modules/course/components/coursePackage.vue')
	},
	{
		path: '*',
		component: require('./modules/not-found.vue')
	}
]

