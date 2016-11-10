/**
 * @fileOverview api
 * @author xujin
 */

exports.routes = [
	{
		method: 'POST',
        path: '/common/getConfig.json',
        handler: function (request, reply) {
        	return reply(require('./json/api/headerConfig.json'));
        }
	},
	{
		method: 'POST',
        path: '/common/setConfig.json',
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
		path: '/userinfo.json',
		handler: function (request, reply) {
			return reply(require('./json/api/userInfo.json'));
		}
	}
];