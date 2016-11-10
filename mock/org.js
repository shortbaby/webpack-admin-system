/**
 * @fileOverview course
 * @author xujin
 */

exports.routes = [
	{
		method: 'POST',
		path: '/org/saleStaffList.json',
        handler: function (request, reply) {
        	return reply(require('./json/org/saleStaffList.json'));
        }
	},
	{
		method: 'POST',
		path: '/common/fuzzyQuery.json',
        handler: function (request, reply) {
        	return reply(require('./json/course/courseList.json'));
        }
	},
	{
		method: 'POST',
		path: '/org/cityList.json',
        handler: function (request, reply) {
        	return reply(require('./json/org/cityList.json'));
        }
	},
	{
		method: 'POST',
		path: '/org/identityList.json',
        handler: function (request, reply) {
        	return reply(require('./json/org/identityList.json'));
        }
	},
	{
		method: 'POST',
		path: '/org/headquartersList.json',
        handler: function (request, reply) {
        	return reply(require('./json/org/headquartersList.json'));
        }
	},
	{
		method: 'POST',
		path: '/org/myOrgList.json',
        handler: function (request, reply) {
        	return reply(require('./json/org/myList.json'));
        }
	},
	{
		method: 'POST',
		path: '/org/allOrgList.json',
        handler: function (request, reply) {
        	return reply(require('./json/org/allOrgList.json'));
        }
	},
	{
		method: 'POST',
		path: '/org/deleteMy.json',
        handler: function (request, reply) {
        	return reply(
        	{
			    "msg":"succ",
			    "code": 0,
			    "data": {}
			});
        }
	},
	{
		method: 'POST',
		path: '/org/delete.json',
        handler: function (request, reply) {
        	return reply(
        	{
			    "msg":"succ",
			    "code": 0,
			    "data": {}
			});
        }
	},
	{
		method: 'POST',
		path: '/org/add.json',
        handler: function (request, reply) {
        	return reply(
        	{
			    "msg":"succ",
			    "code": 0,
			    "data": 
			    {
			        "id":123,
			        "city":"武汉",
			        "category":"出国留学"
			    }
			});
        }
	},
	{
		method: 'POST',
		path: '/org/detail.json',
        handler: function (request, reply) {
        	return reply(require('./json/org/orgDetail.json'));
        }
	},
	{
		method: 'POST',
		path: '/org/sign/orgList.json',
		handler: function (request, reply) {
			return reply(require('./json/org/signOrgList.json'));
		}
	},
	{
		method: 'POST',
		path: '/org/editMy.json',
        handler: function (request, reply) {
        	return reply(
        	{
			    "msg":"succ",
			    "code": 0,
			    "data": null
			});
        }
	}
]