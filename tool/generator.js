/**
 * @file 脚本建立mock数据文件
 * @author xuguanlong
 */

'use strict';

require('shelljs/global')
var fs = require('fs');
var path = require('path');


var mockApis = require('./mockApi');

var mockPath = path.join(__dirname, '../mock');
var mockJsonPath = path.join(__dirname, '../mock/json');
var curPath = __dirname;



function getContent(list) {
    var str = 'exports.routes = [';

    if (Array.isArray(list)) {
        for (var i = 0; i < list.length; i++) {
            var api = list[i];
            var apiJson = api;
            if (api.indexOf('.ajax') > -1) {
                apiJson = apiJson.replace('.ajax', '.json');
            }
            str += "{ method: 'POST', path: '"+ api +"',"
                + "handler: function (request, reply) { return reply(require('./json" 
                + apiJson + "'));}},";
        };
    }
    str = str.substring(0, str.length - 1);
    str += '];'

    return str;
}

function writeTemplateApiFile(file, ext, apiList) {
    var targetFilePath = path.join(mockPath, file + ext);

    var content = getContent(apiList[file]);
    fs.writeFile(targetFilePath, content, function (err) {
        if (err) throw err ;
        console.log("File Saved !");
    });
}

function touchApiFile(name, type) {
    cd(mockPath);
    if (!test('-f', name + type)) {
        touch(name + type);
    }
    cd(curPath);
}
function touchMockJson(folderPath, fileName, ext) {
    mkdir('-p', path.join(mockJsonPath, folderPath));

    cd(path.join(mockJsonPath, folderPath));

    if (!test('-f', fileName + ext)) {
        touch(fileName + ext);
    }
    cd(curPath);
}

var apis = {};

mockApis.forEach(function(item, index) {
    let paths = item.split('/');
    if ( Array.isArray(paths)) {
        if (paths[0] === '') {
            paths.splice(0, 1);
        }
        touchApiFile(paths[0], '.js');

        if (Array.isArray(apis[paths[0]])) {
             apis[paths[0]].push(item);
        } else {
             apis[paths[0]] = [];
             apis[paths[0]].push(item);
        }
        var len = paths.length;
        var fileName = paths[len - 1];
        var index = fileName.indexOf('.');

        if (index > -1) {
            fileName = fileName.substring(0, index);
        }

        paths.splice(len - 1, 1);
        var folderPath = paths.join('/');

        touchMockJson(folderPath, fileName, '.json');
    }
});

for (var key in apis) {
    writeTemplateApiFile(key, '.js', apis);
}