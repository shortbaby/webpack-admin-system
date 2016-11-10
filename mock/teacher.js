/**
 * @fileOverview api
 * @author xgl
 */

exports.routes = [
	{
		method: 'POST',
		path: '/teacher/getTeacherById.json',
		handler: function (request, reply) {
			return reply(require('./json/teacher/getTeacherById.json'));
		}
	},
	{
		method: 'POST',
		path: '/teacher/query.json',
		handler: function (request, reply) {
			return reply(require('./json/teacher/query.json'));
		}
	},
	{
		method: 'POST',
		path: '/teacher/fuzzyQueryByName.json',
		handler: function (request, reply) {
			return reply(require('./json/teacher/fuzzyQueryByName.json'));
		}
	},
	{
		method: 'POST',
		path: '/teacher/delete.json',
		handler: function (request, reply) {
			return reply(require('./json/teacher/delete.json'));
		}
	},
	{
		method: 'POST',
		path: '/teacher/save.json',
		handler: function (request, reply) {
			return reply(require('./json/teacher/save.json'));
		}
	},
	{
		method: 'POST',
		path: '/teacher/update.json',
		handler: function (request, reply) {
			return reply(require('./json/teacher/update.json'));
		}
	}
];