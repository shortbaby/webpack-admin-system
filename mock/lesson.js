exports.routes = [
	{
		method: 'POST',
		path: '/lesson/addClassLessons.json',
		handler: function (request, reply) {
			return reply(require('./json/lesson/addClassLessons.json'));
		}
	},
	{
		method: 'POST',
		path: '/lesson/edit.json',
		handler: function (request, reply) {
			return reply(require('./json/lesson/edit.json'));
		}
	},
	{
		method: 'POST',
		path: '/lesson/conflictCheck.json',
		handler: function (request, reply) {
			return reply(require('./json/lesson/conflictCheck.json'));
		}
	},
	{
		method: 'POST',
		path: '/lesson/delLessons.json',
		handler: function (request, reply) {
			return reply(require('./json/lesson/delLessons.json'));
		}
	},
	{
		method: 'POST',
		path: '/lesson/classLessons.json',
		handler: function (request, reply) {
			return reply(require('./json/lesson/classLessons.json'));
		}
	},
	{
		method: 'POST',
		path: '/lesson/searchLessons.json',
		handler: function (request, reply) {
			return reply(require('./json/lesson/searchLessons.json'));
		}
	},
	{
		method: 'POST',
		path: '/lesson/dropDownList.json',
		handler: function (request, reply) {
			return reply(require('./json/lesson/dropDownList.json'));
		}
	},
	{
		method: 'POST',
		path: '/lesson/lessonDetail.json',
		handler: function (request, reply) {
			return reply(require('./json/lesson/lessonDetail.json'));
		}
	}
];