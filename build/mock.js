var fs = require('fs');
var Mock = require('mockjs');
var bodyParser = require('body-parser');
var multiparty = require('multiparty');
module.exports = function(express, app) {
    /* 上传 */
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    // 上传路径
    app.use('/uploads', express.static('./uploads/'));
    // 上传功能
    var uploadDir = './uploads';

    app.post('/mock/upload', function(req, res) {
        // 建立上传文件夹
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        var form = new multiparty.Form({ uploadDir });

        form.on('error', function(err) {
            console.log('Error parsing form: ' + err.stack);
        });

        form.parse(req, function(err, fields, files) {
            var filesTmp = JSON.stringify(files, null, 2);
            if (err) {
                console.log('parse error: ' + err);
                res.send("写文件操作失败。");
            } else {
                var result = {
                    status: 1,
                    data: {
                        url: files.file[0].path,
                        id: Mock.Random.natural()
                    }
                };
                res.json(result);
            }
        });
    });

    /**
     * 自动解析mock模板
     */
    var mockDir = './src/mock/';
    if (fs.existsSync(mockDir)) {
        var dir = fs.readdirSync(mockDir);
        dir.forEach(file => {
            if (-1 != file.indexOf('.json')) {
                var name = file.replace('.json', '');
                // 显示mock路径
                console.log('/mock/' + name);
                // 路由
                app.all('/mock/' + name, (req, res) => {
                    var string = fs.readFileSync('./src/mock/' + file, 'utf8');
                    var obj = JSON.parse(string);
                    setTimeout(() => {
                        res.send(obj);
                    }, obj.delay || 300);
                });
            }
        });
    }
    console.log('Mock数据初始化完成!');
}
