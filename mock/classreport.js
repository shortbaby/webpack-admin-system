exports.routes = [
	{
		method: 'POST',
		path: '/classreport/courseReport.json',
		handler: function(request, reply) {
			return reply(require('./json/classreport/courseReport.json'));
		}
	}, 
	{
		method: 'POST',
		path: '/classreport/joinClassReport.json',
		handler: function(request, reply) {
			return reply(require('./json/classreport/joinClassReport.json'));
		}
	}
];