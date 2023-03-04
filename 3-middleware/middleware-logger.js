/*
* Viết 1 middleware in ra URL và method khi user request đến trang chủ và trang about
* */
var express = require('express');
var app = express();

// Middleware để in ra thông tin của yêu cầu
var requestInfo = function (req, res, next) {
    console.log('URL:', req.url);
    console.log('Method:', req.method);
    next();
};

// Sử dụng middleware requestInfo cho tất cả các yêu cầu
app.use(requestInfo);

// Xử lý yêu cầu đến trang chủ
app.get('/', function (req, res) {
    res.send('Trang chủ');
});

// Xử lý yêu cầu đến trang about
app.get('/about', function (req, res) {
    res.send('Trang about');
});

// Khởi chạy server trên cổng 3000
app.listen(3000, function () {
    console.log('Server đang chạy trên cổng 3000!');
});
