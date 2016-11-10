/**
 * @fileOverview api
 * @author xgl
 */

exports.routes = [
	{
		method: 'POST',
		path: '/class/query.json',
		handler: function (request, reply) {
			return reply(require('./json/class/query.json'));
		}
	},
	{
		method: 'POST',
		path: '/class/add.json',
		handler: function (request, reply) {
			return reply(require('./json/class/add.json'));
		}
	},
	{
		method: 'POST',
		path: '/class/update.json',
		handler: function (request, reply) {
			return reply(require('./json/class/update.json'));
		}
	},
	{
		method: 'POST',
		path: '/class/setJoinReceipt.json',
		handler: function (request, reply) {
			return reply(require('./json/class/setJoinReceipt.json'));
		}
	},
	{
		method: 'POST',
		path: '/class/del.json',
		handler: function (request, reply) {
			return reply(require('./json/class/del.json'));
		}
	},
	{
		method: 'POST',
		path: '/class/batchDel.json',
		handler: function (request, reply) {
			return reply(require('./json/class/batchDel.json'));
		}
	},
	{
		method: 'POST',
		path: '/class/queryUseableCourse.json',
		handler: function (request, reply) {
			return reply(require('./json/class/queryUseableCourse.json'))
		}
	},
	{
		method: 'POST',
		path: '/class/setDefaultReceiptData.json',
		handler: function (request, reply) {
			return reply(require('./json/class/setDefaultReceiptData.json'))
		}
	},
	{
		method: 'POST',
		path: '/class/joinClass.json',
		handler: function (request, reply) {
			return reply(require('./json/class/joinClass.json'));
		}
	},
	{
		method: 'POST',
		path: '/class/leaveClass.json',
		handler: function (request, reply) {
			return reply(require('./json/class/leaveClass.json'));
		}
	},
	{
		method: 'POST',
		path: '/class/students.json',
		handler: function (request, reply) {
			return reply(require('./json/class/students.json'));
		}
	},
	{
		method: 'POST',
		path: '/class/saveOrUpdateReceipt.json',
		handler: function (request, reply) {
			return reply(require('./json/class/saveOrUpdateReceipt.json'));
		}
	},
	{
		method: 'POST',
		path: '/class/detail.json',
		handler: function (request, reply) {
			return reply(require('./json/class/detail.json'));
		}
	},
	{
		method: 'POST',
		path: '/class/queryClassIdAndName.json',
		handler: function(request, reply) {
			return reply(require('./json/class/queryClassIdAndName.json'))
		}
	}

];