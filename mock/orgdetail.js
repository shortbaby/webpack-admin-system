/**
 * @fileOverview api
 * @author XiaoBin Li(lixiaobin@baijiahulian.com)
 */

exports.routes = [
	{
		method: 'POST',
		path: '/org/profileInfo.json',
        handler: function (request, reply) {
        	return reply(require('./json/orgdetail/orgInfo.json'));
        }
	},
	{
		method: 'POST',
		path: '/org/student/list.json',
        handler: function (request, reply) {
        	return reply(require('./json/orgdetail/studentList.json'));
        }
	},
   
    {
        method: 'POST',
        path: '/org/contractList.json',
        handler: function (request, reply) {
            return reply(require('./json/orgdetail/contractList.json'));
        }
    },
    {
        method: 'POST',
        path: '/org/student/detail.json',
        handler: function (request, reply) {
            return reply(require('./json/orgdetail/studentDetail.json'));
        }
    },
    {
        method: 'POST',
        path: '/org/student/edit.json',
        handler: function (request, reply) {
            return reply(
            {
                "msg":"succ",
                "code":0,
                "data":null,
                "pageDto":null
            });
        }
    },
    {
        method: 'POST',
        path: '/org/student/add.json',
        handler: function (request, reply) {
            return reply(
            {
                "msg":"succ",
                "code":0,
                "data":null,
                "pageDto":null
            });
        }
    },
    {
        method: 'POST',
        path: '/org/student/deleteMy.json',
        handler: function (request, reply) {
            return reply(
            {
                "msg":"succ",
                "code":0,
                "data":null,
                "pageDto":null
            });
        }
    },
	{
		method: 'POST',
		path: '/class/queryJoinLog.json',
        handler: function (request, reply) {
        	return reply(require('./json/orgdetail/recordList.json'));
        }
	},
	{
		method: 'POST',
		path: '/org/quitClassMy.json',
        handler: function (request, reply) {
        	return reply(
        	{
    			"msg":"succ",
    			"code":0,
    			"data":null,
    			"pageDto":null
        	});
        }
	},
    {
        method: 'POST',
        path: '/org/classList.json',
        handler: function (request, reply) {
            return reply(require('./json/orgdetail/classList.json'));
        }
    },
    {
        method: 'POST',
        path: '/org/comment/list.json',
        handler: function (request, reply) {
            return reply(require('./json/orgdetail/followList.json'));
        }
    },
    {
        method: 'POST',
        path: '/org/comment/detail.json',
        handler: function (request, reply) {
            return reply(require('./json/orgdetail/followDetail.json'));
        }
    },
    {
        method: 'POST',
        path: '/org/comment/delete.json',
        handler: function (request, reply) {
            return reply({
                "msg":"succ",
                "code":0,
                "data":null,
                "pageDto":null
            });
        }
    },
    {
        method: 'POST',
        path: '/org/comment/add.json',
        handler: function (request, reply) {
            return reply({
                "msg":"succ",
                "code":0,
                "data":null,
                "pageDto":null
            });
        }
    },
    {
        method: 'POST',
        path: '/org/comment/edit.json',
        handler: function (request, reply) {
            return reply({
                "msg":"succ",
                "code":0,
                "data":null,
                "pageDto":null
            });
        }
    },
    {
        method: 'POST',
        path: '/org/staffList.json',
        handler: function (request, reply) {
            return reply(require('./json/orgdetail/staffList.json'));
        }
    },
    {
        method: 'POST',
        path: '/org/allocateSaleMy.json',
        handler: function (request, reply) {
            return reply({
                "msg":"succ",
                "code":0,
                "data":null,
                "pageDto":null
            });
        }
    },
    {
        method: 'POST',
        path: '/org/allocateHeadquartersMy.json',
        handler: function (request, reply) {
            return reply({
                "msg":"succ",
                "code":0,
                "data":null,
                "pageDto":null
            });
        }
    },
    {
        method: 'POST',
        path: '/org/headerList.json',
        handler: function (request, reply) {
            return reply(require('./json/orgdetail/staffList.json'));
        }
    },
    {
        method: 'POST',
        path: '/org/bindStudentList.json',
        handler: function (request, reply) {
            return reply(require('./json/orgdetail/bindStudents.json'));
        }
    },
    {
        method: 'POST',
        path: '/org/orgInfo.json',
        handler: function (request, reply) {
            return reply(require('./json/orgdetail/addClass.json'));
        }
    },
    {
        method: 'POST',
        path: '/org/orgStudentList.json',
        handler: function (request, reply) {
            return reply(require('./json/orgdetail/orgStudents.json'));
        }
    },
    {
        method: 'POST',
        path: '/class/queryUseableCity.json',
        handler: function (request, reply) {
            return reply(require('./json/orgdetail/orgCity.json'));
        }
    },
    {
        method: 'POST',
        path: '/org/signUpMy.json',
        handler: function (request, reply) {
            return reply({
                "msg":"succ",
                "code":0,
                "data":null
            });
        }
    },
    {
        method: 'POST',
        path: '/org/sendNoticeMy.json',
        handler: function (request, reply) {
            return reply({
                "msg":"succ",
                "code":0,
                "data":null
            });
        }
    },
     {
        method: 'POST',
        path: '/common/progress.json',
        handler: function (request, reply) {
            return reply({
                "msg":"succ",
                "code":0,
                "data": {
                    "totalCount": 100,
                    "successCount": 100,
                    "failCount": 0,
                    "completeCount": 100,
                    "completeRate": 100,
                    "errorFileUrl": "",
                    "exception": null
                }
            });
        }
    }
];

