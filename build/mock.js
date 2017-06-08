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
     * 图片列表
     */


    app.get('/mock/imgs', function(req, res) {
        var string = fs.readFileSync('./static/imgs.json', 'utf8');
        var imgs = JSON.parse(string).imgs;

        var page = req.query.page;
        var limit = req.query.limit;


        var array = [];
        var length = imgs.length;

        var start = length - 1 - ((page - 1) * limit);
        var end = start - limit;

        for (var i = start; i > end; i--) {
            if (!!imgs[i]) {
                array.push({
                    id: i,
                    img: imgs[i],
                    title: Mock.mock('@title(1, 2)'),
                    price: Mock.mock('@float(30, 1000, 2)')
                });
            } else {
                break;
            }
        }

        var pageCount = Math.ceil(length / limit);

        if (page > pageCount) {
            var data = { status: 0, message: "没数据了!" };
        } else {
            var data = { status: 1, content: array };
        }

        setTimeout(() => {
            res.send(data);
        }, 1000);
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
                    obj = Mock.mock(obj);
                    setTimeout(() => {
                        res.send(obj);
                    }, obj.delay || 300);
                });
            }
        });
    }
    console.log('Mock数据初始化完成!');
}
