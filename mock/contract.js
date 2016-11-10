/**
 * @fileOverview api
 * @author xgl
 */

exports.routes = [
	{
		method: 'POST',
		path: '/contract/getUnCommit.json',
		handler: function (request, reply) {
			return reply(require('./json/contract/getUnCommit.json'));
		}
	},
	{
		method: 'POST',
		path: '/contract/getUnReviewed.json',
		handler: function (request, reply) {
			return reply(require('./json/contract/getUnReviewed.json'));
		}
	},
	{
		method: 'POST',
		path: '/contract/query.json',
		handler: function (request, reply) {
			return reply(require('./json/contract/query.json'));
		}
	},
	{
		method: 'POST',
		path: '/contract/getById.json',
		handler: function (request, reply) {
			return reply(require('./json/contract/getById.json'));
		}
	},
	{
		method: 'POST',
		path: '/contract/relevance.json',
		handler: function (request, reply) {
			return reply(require('./json/contract/relevance.json'));
		}
	},
	{
		method: 'POST',
		path: '/contract/review.json',
		handler: function (request, reply) {
			return reply(require('./json/contract/review.json'));
		}
	},
	{
		method: 'POST',
		path: '/business/queryPackage.json',
		handler: function (request, reply) {
			return reply(require('./json/contract/businessPackage.json'));
		}
	},
	{
		method: 'POST',
		path: '/org/queryByName.json',
		handler: function (request, reply) {
			return reply(require('./json/contract/orgByName.json'));
		}
	},
	{
		method: 'POST',
		path: '/org/queryById.json',
		handler: function (request, reply) {
			return reply(require('./json/contract/orgById.json'));
		}
	},
	{
		method: 'POST',
		path: '/org/contract/orgList.json',
		handler: function(request, reply) {
			return reply(require('./json/contract/orgList.json'));
		}
	},
	{
		method: 'POST',
		path: '/business/getAllTags.json',
		handler: function(request, reply) {
			return reply(require('./json/contract/getAllTags.json'));
		}

	}
];