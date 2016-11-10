/**
 * @fileOverview api
 * @author xgl
 */

exports.routes = [
	{
		method: 'POST',
		path: '/role/getPermissions.json',
		handler: function (request, reply) {
			return reply(require('./json/role/getPermissions.json'));
		}
	},
	{
		method: 'POST',
		path: '/role/list.json',
		handler: function (request, reply) {
			return reply(require('./json/role/list.json'));
		}
	}, 
	{
		method: 'POST',
		path: '/role/detail.json',
		handler: function (request, reply) {
			return reply(require('./json/role/detail.json'));
		}
	},
	{
		method: 'POST',
		path: '/role/add.json',
		handler: function (request, reply) {
			return reply(require('./json/role/add.json'));
		}
	},
	{
		method: 'POST',
		path: '/role/edit.json',
		handler: function (request, reply) {
			return reply(require('./json/role/edit.json'));
		}
	},
	{
		method: 'POST',
		path: '/role/del.json',
		handler: function (request, reply) {
			return reply(require('./json/role/del.json'));
		}
	},
	{
		method: 'POST',
		path: '/role/getModules.json',
		handler: function (request, reply) {
			return reply(require('./json/role/getModules.json'));
		}
	},
	{
		method: 'POST',
		path: '/role/getOwnPermissions.json',
		handler: function (request, reply) {
			return reply(require('./json/role/getOwnPermissions.json'));
		}
	},
	{
		method: 'POST',
		path: '/role/savePermission.json',
		handler: function (request, reply) {
			return reply(require('./json/role/add.json'));
		}
	},
	{
		method: 'POST',
		path: '/role/detailPermission.json',
		handler: function (request, reply) {
			return reply(require('./json/role/detailPermission.json'));
		}
	}

];