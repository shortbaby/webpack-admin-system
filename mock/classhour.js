/**
 * @fileOverview api
 * @author xgl
 */

exports.routes = [
	{
        method: 'POST',
        path: '/classhour/courseNum.json',
        handler: function (request, reply) {
            return reply(require('./json/orgdetail/consumeList.json'));
        }
    },
    {
        method: 'POST',
        path: '/classhour/courseNumDetail.json',
        handler: function (request, reply) {
            return reply(require('./json/orgdetail/consumeDetail.json'));
        }
    },
    {
    	method: 'POST',
    	path: '/classhour/teacherStatisticSearch.json',
    	handler: function(request, reply) {
    		return reply(require('./json/classhour/teacherStatisticSearch.json'))
    	}
    },
    {
    	method: 'POST',
    	path: '/classhour/teacherStatisticDetail.json',
    	handler: function(request, reply) {
    		return reply(require('./json/classhour/teacherStatisticDetail.json'))
    	}
    }
]