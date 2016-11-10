exports.routes = [
	{
		method: 'POST',
		path: '/report/categoryReport.json',
		handler: function(request, reply) {
			return reply(require('./json/report/categoryReport.json'));
		}
	}, 
	{
		method: 'POST',
		path: '/report/incomeReport.json',
		handler: function(request, reply) {
			return reply(require('./json/report/incomeReport.json'));
		}
	}, 
	{
		method: 'POST',
		path: '/report/provinceReport.json',
		handler: function(request, reply) {
			return reply(require('./json/report/provinceReport.json'));
		}
	}, 
	{
		method: 'POST',
		path: '/report/cityReport.json',
		handler: function(request, reply) {
			return reply(require('./json/report/cityReport.json'));
		}
	}, 
	{
		method: 'POST',
		path: '/report/increasedComment.json',
		handler: function(request, reply) {
			return reply(require('./json/report/increasedComment.json'));
		}
	}, 
	{
		method: 'POST',
		path: '/report/increasedOrg.json',
		handler: function(request, reply) {
			return reply(require('./json/report/increasedOrg.json'));
		}
	}
];