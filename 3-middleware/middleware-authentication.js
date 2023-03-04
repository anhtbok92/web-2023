/*
* Tạo một middleware authentication để xác thực người dùng.
* Middleware này sẽ kiểm tra xem tên đăng nhập và mật khẩu của người dùng có hợp lệ hay không.
* Nếu hợp lệ, middleware sẽ cho phép yêu cầu được xử lý tiếp, nếu không hợp lệ, middleware sẽ trả về một phản hồi với mã trạng thái 401.
* Middleware authentication chỉ được sử dụng cho các yêu cầu đến đường dẫn /admin.
* Khi một yêu cầu đến đường dẫn /admin được gửi đến server, nó sẽ đầu tiên được xử lý bởi middleware authentication.
* Nếu tên đăng nhập và mật khẩu hợp lệ, yêu cầu sẽ được chuyển tiếp đến xử lý tương ứng cho đường dẫn /admin,
* nếu không hợp lệ, server sẽ trả về một phản hồi với mã trạng thái 401.
* */

var express = require('express');
var app = express();

// Middleware để xác thực người dùng
var authentication = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    // Kiểm tra xem username và password có hợp lệ hay không
    if (username === 'admin' && password === 'admin') {
        next();
    } else {
        res.status(401).send('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
};

// Sử dụng middleware authentication cho các yêu cầu đến /admin
app.use('/admin', authentication);

// Xử lý yêu cầu đến trang chủ
app.get('/', function (req, res) {
    res.send('Trang chủ');
});

// Xử lý yêu cầu đến trang admin
app.get('/admin', function (req, res) {
    res.send('Trang quản trị');
});

// Khởi chạy server trên cổng 3000
app.listen(3000, function () {
    console.log('Server đang chạy trên cổng 3000!');
});
