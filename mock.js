var fs = require("fs");
var Mock = require("mockjs");
var bodyParser = require("body-parser");
var multiparty = require("multiparty");
var express = require("express");
var app = express();
var Mock = require("mockjs");

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
