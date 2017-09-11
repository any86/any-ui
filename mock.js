var fs = require("fs");
var Mock = require("mockjs");
var bodyParser = require("body-parser");
var multiparty = require("multiparty");
var express = require("express");
var app = express();
var Mock = require("mockjs");

/* 上传 */
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// 上传路径
app.use("/uploads", express.static("./uploads/"));
// 上传功能
var uploadDir = "./uploads";

app.post("/upload", function(req, res) {
    
    // 建立上传文件夹
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }
    var form = new multiparty.Form({ uploadDir });
    form.on("error", function(err) {
        console.log("Error parsing form: " + err.stack);
    });
    form.parse(req, function(err, fields, files) {
        console.log(files);
        if (err) {
            console.log("parse error: " + err);
            res.send("写文件操作失败。");
        } else {
            if (!!files.file[0]) {
                var result = {
                    status: 1,
                    data: {
                        url: files.file[0].path,
                        id: Mock.Random.natural()
                    },
                    files
                };
            } else {
                var result = {
                    status: 0,
                    message: "错误了啊!",
                    files
                };
            }
            res.json(result);
        }
    });
});

app.post('/success', (req, res) => {
    res.json({text: 'ok'});
});

app.post('/error', (req, res) => {
    res.json({text: 'error'});
});

app.get("/goods", function(req, res) {
    var data = Mock.mock({
        "array|10": [
            {
                "id|+1": 200,
                "entity_id|+3": 100,
                "final_price_with_tax|10-200": 15,
                "regular_price_with_tax|10-200": 2,
                type_id: "simple",
                title: "@title(3, 8)",
                image_url: "@image('300x300','#ccc', '#FFF', 'png', 'soufeel')"
            }
        ]
    });
    setTimeout(() => {
        res.json(data.array);
    }, 1000);
});

app.listen(3000, () => {
    console.log("done!!!");
});
