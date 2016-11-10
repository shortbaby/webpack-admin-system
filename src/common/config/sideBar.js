export default [
	{
		"text": "消息中心",
		"alias": "message",
		"menus": [
			{
				"text": '消息列表',
				"url": '/message/list'
			}
		]
	},
	{
		"text": "报表中心",
		"alias": "report",
		"menus": [
			{
				"text": '机构详情报表',
				"url": '/report/orgdetail'
			},
			{
				"text": '课程消耗列表',
				"url": '/report/course'
			},
			{
				"text": '报班情况报表',
				"url": '/report/joinclass'
			},
			{
				"text": '机构数据报表',
				"url": '/report/orgdata'
			}
		]
	},
	{
		"text": "机构管理",
		"alias": "organization",
		"menus": [
			{
				"text": '我的机构',
				"url": '/org/effective'
			},
			{
				"text": '全部机构',
				"url": '/org/allOrg'
			}
		]
	}, 
	{
		"text": "合同管理",
		"alias": "contract",
		"menus": [
			{
				"text": '合同列表',
				"url": '/contract/list'
			}
		]
	}, 
	{
		"text": "教务管理",
		"alias": "educational",
		"menus": [
			{
				"text": '班级管理',
				"url": '/educational/classes'
			}, 
			{
				"text": '排课管理',
				"url": '/educational/schedule'
			}, 
			{
				"text": '签到管理',
				"url": '/educational/sign'
			}, 
			{
				"text": '课时统计',
				"url": '/educational/periods'
			}
		]
	}, 
	{
		"text": "课程管理",
		"alias": "course",
		"menus": [
			{
				"text": '课程列表',
				"url": '/course/courseList'
			},
			{
				"text": '课程套餐',
				"url": '/course/coursePackage'
			}
		]
	},
	{
		"text": "系统配置",
		"alias": "setting",
		"menus": [
			{
				"text": '角色管理',
				"url": '/setting/role'
			},
			{
				"text": '用户管理',
				"url": '/setting/users'
			},
			{
				"text": '导师管理',
				"url": '/setting/teachers'
			}
		]
	}

];