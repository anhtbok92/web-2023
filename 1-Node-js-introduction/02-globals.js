/*
# 1. Global Object
- Global (toàn cục) : Mọi nơi đều có thể truy xuất vào đc.
- Chúng ta không cần khai báo, không cần import, không cần required mà được sử dụng
trực tiếp
- Các đối tượng có thể sử dụng
+ Các module
+ Các hàm
+ Các chuỗi
+ Các object khác.
- Tham khảo
https://nodejs.org/api/globals.html
 */
// __filename
console.log('filename: ', __filename);

// __dirname
console.log('dirname: ', __dirname);

// - setTimeout(callback, milliseconds);
function printHelloWorld() {
    console.log('Hello world !!!');
}
setTimeout(printHelloWorld, 2000);


// setInterval
setInterval(printHelloWorld, 1000);