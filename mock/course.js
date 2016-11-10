/**
 * @fileOverview course
 * @author xujin
 */

exports.routes = [
	{
		method: 'POST',
		path: '/course/single/search.json',
        handler: function (request, reply) {
        	return reply(require('./json/course/singleList.json'));
        }
	},
	{
		method: 'POST',
		path: '/course/assemble/search.json',
        handler: function (request, reply) {
        	return reply(require('./json/course/assembleList.json'));
        }
	},
	{
		method: 'POST',
		path: '/business/search.json',
        handler: function (request, reply) {
        	return reply(require('./json/course/packageList.json'));
        }
	},
	{
		method: 'POST',
		path: '/course/assemble/delete.json',
        handler: function (request, reply) {
        	return reply(
        		{
				    "code": 0,
				    "msg": "",
				    "data": {}
				}
			);
        }
	},
	{
		method: 'POST',
		path: '/course/single/delete.json',
        handler: function (request, reply) {
        	return reply(
        		{
				    "code": 0,
				    "msg": "",
				    "data": {}
				}
			);
        }
	},
	{
		method: 'POST',
		path: '/business/delete.json',
        handler: function (request, reply) {
        	return reply(
        		{
				    "code": 0,
				    "msg": "",
				    "data": {}
				}
			);
        }
	},
	{
		method: 'POST',
		path: '/course/assemble/add.json',
        handler: function (request, reply) {
        	return reply(
        		{
				    "code": 0,
				    "msg": "",
				    "data": {}
				}
			);
        }
	},
	{
		method: 'POST',
		path: '/business/add.json',
        handler: function (request, reply) {
        	return reply(
        		{
				    "code": 0,
				    "msg": "",
				    "data": {}
				}
			);
        }
	},
	{
		method: 'POST',
		path: '/course/single/add.json',
        handler: function (request, reply) {
        	return reply(
        		{
				    "code": 0,
				    "msg": "",
				    "data": {}
				}
			);
        }
	},
	{
		method: 'POST',
		path: '/course/single/detail.json',
        handler: function (request, reply) {
        	return reply(require('./json/course/singleDetail.json'));
        }
	},
	{
		method: 'POST',
		path: '/course/assemble/detail.json',
        handler: function (request, reply) {
        	return reply(require('./json/course/assembleDetail.json'));
        }
	},
	{
		method: 'POST',
		path: '/business/detail.json',
        handler: function (request, reply) {
        	return reply(require('./json/course/packageDetail.json'));
        }
	},
	{
		method: 'POST',
		path: '/course/assemble/edit.json',
        handler: function (request, reply) {
        	return reply(
        		{
				    "code": 0,
				    "msg": "",
				    "data": {}
				}
			);
        }
	},
	{
		method: 'POST',
		path: '/course/single/edit.json',
        handler: function (request, reply) {
        	return reply(
        		{
				    "code": 0,
				    "msg": "",
				    "data": {}
				}
			);
        }
	},
	{
		method: 'POST',
		path: '/business/edit.json',
        handler: function (request, reply) {
        	return reply(
        		{
				    "code": 0,
				    "msg": "",
				    "data": {}
				}
			);
        }
	},
	{
		method: 'POST',
		path: '/tag/fuzzyQuery.json',
        handler: function (request, reply) {
        	return reply(require('./json/course/courseList.json'));
        }
	}
]