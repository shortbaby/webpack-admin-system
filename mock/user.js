/**
 * @fileOverview api
 * @author xgl
 */

exports.routes = [
	{
		method: 'POST',
		path: '/user/getUserInfoByAccount.json',
		handler: function (request, reply) {
			return reply(require('./json/user/getUserInfoByAccount.json'));
		}
	},
	{
		method: 'POST',
		path: '/user/getUserById.json',
		handler: function (request, reply) {
			return reply(require('./json/user/getUserById.json'));
		}
	},
	{
		method: 'POST',
		path: '/user/save.json',
		handler: function (request, reply) {
			return reply(require('./json/user/save.json'));
		}
	},
	{
		method: 'POST',
		path: '/user/update.json',
		handler: function (request, reply) {
			return reply(require('./json/user/update.json'));
		}
	},
	{
		method: 'POST',
		path: '/user/delete.json',
		handler: function (request, reply) {
			return reply(require('./json/user/delete.json'));
		}
	},
	{
		method: 'POST',
		path: '/user/query.json',
		handler: function (request, reply) {
			return reply(require('./json/user/query.json'));
		}
	},
	{
		method: 'POST',
		path: '/user/queryByName.json',
		handler: function (request, reply) {
			return reply(require('./json/user/queryByName.json'));
		}
	},
	{
		method: 'POST',
		path: '/user/queryByMobile.json',
		handler: function (request, reply) {
			return reply(require('./json/user/queryByMobile.json'));
		}
	},
	{
		method: 'POST',
		path: '/user/getAllRole.json',
		handler: function (request, reply) {
			return reply(require('./json/user/getAllRole.json'));
		}
	},
	{
		method: 'POST',
		path: '/user/getAllRoleToList.json',
		handler: function (request, reply) {
			return reply(require('./json/user/getAllRoleToList.json'));
		}
	},
	{
		method: 'POST',
		path: '/user/getAllCompany.json',
		handler: function (request, reply) {
			return reply(require('./json/user/getAllCompany.json'));
		}
	},
	{
		method: 'POST',
		path: '/user/disable.json',
		handler: function (request, reply) {
			return reply(require('./json/user/disable.json'));
		}
	},
	{
		method: 'POST',
		path: '/user/getAllSaleStaffers.json',
		handler: function (request, reply) {
			return reply(require('./json/user/getAllSaleStaffers.json'))
		}
	}
];