exports.routes = [
	{
		method: 'POST',
		path: '/wechat/staff/checkinList.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/staff/checkinList.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/staff/checkinDetail.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/staff/checkinDetail.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/staff/manualSign.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/staff/manualSign.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/staff/scanCodeSign.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/staff/scanCodeSign.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/student/studentInfo.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/student/studentInfo.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/student/readMsg.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/student/readMsg.json'));
		}
	},{
		method: 'POST',
		path: '/wechat/student/lessons.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/student/lessons.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/student/myOrganizations.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/student/myOrganizations.json'))
		}
	},{
		method: 'POST',
		path: '/wechat/student/classes.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/student/classes.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/student/classDetail.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/student/classDetail.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/student/modifyReceipt.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/student/modifyReceipt.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/student/contracts.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/student/contracts.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/student/consumeRecord.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/student/consumeRecord.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/student/msgList.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/student/msgList.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/student/msgDetail.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/student/msgDetail.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/teacher/teacherInfo.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/teacher/teacherInfo.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/teacher/classes.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/teacher/classes.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/teacher/lessons.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/teacher/lessons.json'));
		}
	},{
		method: 'POST',
		path: '/wechat/teacher/consumeRecord.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/teacher/consumeRecord.json'));
		}
	},{
		method: 'POST',
		path: '/wechat/teacher/classDetail.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/teacher/classDetail.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/webauth/selectStu.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/webauth/selectStu.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/webauth/studentCenter.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/webauth/studentCenter.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/webauth/staffCenter.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/webauth/staffCenter.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/webauth/bind.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/webauth/bind.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/common/unbind.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/common/unbind.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/common/modifyHeadImg.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/common/modifyHeadImg.json'));
		}
	}, {
		method: 'POST',
		path: '/wechat/common/upload.ajax',
		handler: function(request, reply) {
			return reply(require('./json/wechat/common/upload.json'));
		}
	}
];