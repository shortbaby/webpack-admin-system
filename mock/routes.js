/**
 * @file 天校路由
 * @author xujin
 */

'use strict';

var routesConfig = [
	require('./api'),
	require('./course'),
	require('./orgdetail'),
	require('./class'),
	require('./classhour'),
	require('./contract'),
	require('./role'),
	require('./user'),
	require('./teacher'),
	require('./org'),
	require('./checkin'),
	require('./lesson'),
	require('./message'),
	require('./wechat'),
	require('./classreport'),
	require('./report')
];

var routes = [];

for (var i = 0, l = routesConfig.length; i < l; i++) {
    routes = routes.concat(routesConfig[i].routes);
}

exports.routes = routes;