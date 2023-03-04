// 1. Ban đầu khi chưa gọi resolve và reject thì trạng thái của promise là pending
var promise_pending = new Promise((resolve, reject) => {

})
console.log("1. Trạng thái Promise ban đầu :", promise_pending);

// 2. Khi resolve đc gọi thì trạng thái của promise là fullfilled
var promise_fulfilled = new Promise((resolve, reject) => {
    resolve();
})
console.log("2. Trạng thái Promise khi resolve :", promise_fulfilled);

// 3.Khi reject đc gọi thì trạng thái của promise là reject
// Nếu reject phải sử dụng catch để bắt lỗi, nếu không browser sẽ tự catch lỗi và bắn ra log
var promise_reject = new Promise((resolve, reject) => {
    reject("Xảy ra lỗi");
})
console.log("3. Trạng thái Promise khi reject :", promise_reject);


// 4. Dữ liệu trả về của promise khi resolve
var promise_data = new Promise((resolve, reject) => {
    resolve(123);
})
console.log("4. Promise data nếu resolve: ", promise_data);
console.log("4. Typeof của result từ promise:", typeof promise_data);


// 5. Promise method
var promise_method1 = new Promise((resolve, reject) => {
    // resolve();
    reject();
})

promise_method1
    .then(function () {
        console.log("5. Promise method then called when resolve called: ", 'success');
    })
    .catch(function () {
        console.log("5. Promise method then called when reject called: ", 'failure');
    })
    .finally(function () {
        console.log("5. Promise method then called in case both resolve or reject: ", 'done');
    })


// 6. Promise method get data from resolve
var promise_method2 = new Promise((resolve, reject) => {
    const jsonData = {
        "Name": "Nguyễn Tuấn Anh",
        "Age": 18,
        "Job title": "Web FullStack"
    };
    const arrayCourse = [
        {
            "Course name": "Lập trình node js",
            "Price": 1800000
        },
        {
            "Course name": "Lập trình React",
            "Price": 20000000
        }
    ]
    resolve(arrayCourse);
})

promise_method2
    .then(function (data) {
        console.log("6. Data get when resolve called : ", data);
    })
    .catch(function () {
        console.log("6. Promise method then called when reject called: ", 'failure');
    })
    .finally(function () {
        console.log("6. Promise method then called in case both resolve or reject: ", 'done');
    })


// Promise all 1
function doAsync(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send();
    })
}

Promise.all([
    doAsync('./index.html'),
    doAsync('./style.css'),
    doAsync('./script.js'),
]).then(function (data) {
    console.log(data);
}).catch(function (error) {
    console.log(error);
});