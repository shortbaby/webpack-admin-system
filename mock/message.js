/**
 * @fileOverview api
 * @author xgl
 */

exports.routes = [
	{
		method: 'POST',
		path: '/stationMessageQuery/queryAllNewCount.json',
		handler: function (request, reply) {
			return reply(require('./json/stationMessageQuery/queryAllNewCount.json'));
		}
	},
	{
		method: 'POST',
		path: '/stationMessageQuery/queryBatch.json',
		handler: function (request, reply) {
			return reply(require('./json/stationMessageQuery/queryBatch.json'));
		}
	},
	{
		method: 'POST',
		path: '/stationMessageQuery/queryNewByMinId.json',
		handler: function (request, reply) {
			return reply(require('./json/stationMessageQuery/queryNewByMinId.json'));
		}
	},
	{
		method: 'POST',
		path: '/stationMessageQuery/readOne.json',
		handler: function (request, reply) {
			return reply(require('./json/stationMessageQuery/readOne.json'));
		}
	},
	{
		method: 'POST',
		path: '/stationMessageQuery/readBatch.json',
		handler: function (request, reply) {
			return reply(require('./json/stationMessageQuery/readBatch.json'));
		}
	},
	{
		method: 'POST',
		path: '/stationMessageQuery/queryNewBell.json',
		handler: function (request, reply) {
			return reply(require('./json/stationMessageQuery/queryNewBell.json'))
		}
	}
];