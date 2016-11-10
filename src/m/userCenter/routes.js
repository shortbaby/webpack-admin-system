/**
 * @file 导师个人中心--路由配置
 * @author xuguanlong
 */

'use strict';
	
export default [
	{
		 path: '/', redirect: '/sign'
	},
	{
		path: '/sign',
		name: 'sign',
		alias: '签到',
		component: require('./components/sign.vue')
	},
	{
		path: '/signdetail',
		name: 'signdetail',
		alias: '班级签到',
		component: require('./components/sign-detail.vue')
	},
	{
		path: '/manualsign',
		name: 'manualsign',
		alias: '手动签到',
		component: require('./components/manual-sign.vue')
	}
]

