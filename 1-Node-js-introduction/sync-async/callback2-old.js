// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function doAsync(url, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => onSuccess(xhr.responseText);
    xhr.onerror = () => onError(xhr.statusText);
    xhr.send();
}

// Usage:
doAsync("https://api.github.com/users/anhtbok92", value => {
    console.log(value);
  },
    error => {
    // 'error' is corresponding with 'xhr.statusText'
    console.log(error);
  }
);

// doAsync("https://api.github.com/users/anhtbok92", (value) => {
//         console.log(value);
//     },
//     (error) => {
//         // 'error' is corresponding with 'xhr.statusText'
//         console.log(error);
//     }
// );

// doAsync("https://api.github.com/users/anhtbok92", callback1_success, callback2_error);
//
// function callback1_success(value) {
//     console.log(value);
// }
//
// function callback2_error(error) {
//     console.log(error);
// }