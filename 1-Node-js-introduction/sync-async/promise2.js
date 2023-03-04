// Function returl về Promise
// Promise có 1 executor là 1 function callback
// resolve và reject là 2 hàm sẽ được gọi vào khi executor chạy xong

function doAsync(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = () => {
            return resolve(xhr.responseText);
        };
        xhr.onerror = () => {
            console.log(reject(xhr.statusText));
            return reject(xhr.statusText);
        }
        xhr.send();
    });
}

doAsync("https://api.github.com/users/anhtbok92")
    .then(value => {
        console.log(value);
    })
    .catch(error => {
        console.log(error);
    });