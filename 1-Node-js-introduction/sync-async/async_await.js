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

// Cách sử dụng promise
// doAsync("https://api.github.com/users/anhtbok92")
//     .then(value => {
//         console.log(value);
//     })
//     .catch(error => {
//         console.log(error);
//     });

// cách sử dụng với asyn/awaith
async function run() {
    let responseDataTuanAnh;
    let responseDataDung123;

    try {
        responseDataTuanAnh = await doAsync("https://api.github.com/users/anhtbok92");
        responseDataDung123 = await doAsync("https://api.github.com/users/dung123");

        console.log(responseDataTuanAnh);
        console.log(responseDataDung123);
    } catch (error) {
        console.log(error)
    }
}

run();