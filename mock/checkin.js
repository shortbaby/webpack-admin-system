/**
 * @fileOverview api
 * @author xgl
 */

exports.routes = [
	{
		method: 'POST',
		path: '/checkin/detail.json',
		handler: function (request, reply) {
			return reply(require('./json/checkin/detail.json'));
		}
	},
	{
		method: 'POST',
		path: '/checkin/manualSign.json',
		handler: function (request, reply) {
			return reply(require('./json/checkin/manualSign.json'));
		}
	},
	{
		method: 'POST',
		path: '/checkin/scanCodeSign.json',
		handler: function (request, reply) {
			return reply(require('./json/checkin/scanCodeSign.json'));
		}
	},
	{
		method: 'POST',
		path: '/checkin/cancelSign.json',
		handler: function(request, reply) {
			return reply(require('./json/checkin/cancelSign.json'));
		}
	},
	{
		method: 'POST',
		path: '/checkin/allSign.json',
		handler: function(request, reply) {
			return reply(require('./json/checkin/allSign.json'));
		}
	}
];