/*
- Để include 1 modules từ 1 file : sử dụng hàm require();
Module là gì ? có bao nhiêu loại
- Core Modules (module của nodejs)
- Local Modules (module tự tạo )
- Third Party Modules (module người khác viết và đẩy lên npmjs.com )
- Tham khảo : Tham khảo: https://www.w3schools.com/nodejs/ref_modules.asp
* */

// build-in module
// ++++++++++++++++++++ path module ++++++++++++++++++++
const path = require('path')
console.log(path.sep)

const filePath = path.join('/content/', 'subfolder', 'test.txt')
console.log(filePath)

const base = path.basename(filePath)
console.log(base)

const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt')
console.log(absolute)

// ++++++++++++++++++++ os Module ++++++++++++++++++++
const os = require('os')
// info about current user
const user = os.userInfo()
console.log(user)

// method returns the system uptime in seconds
console.log(`The System Uptime is ${os.uptime()} seconds`)

const currentOS = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
}
console.log(currentOS)

// ++++++++++++++++++++ fs Module Sync ++++++++++++++++++++
// Chạy đồng bộ từ trên xuống dưới, đọc file First rồi đến file Second
const { readFileSync, writeFileSync } = require('fs')
console.log('start')
const first = readFileSync('./content/first.txt', 'utf8')
const second = readFileSync('./content/second.txt', 'utf8')

writeFileSync(
    './content/result-sync.txt',
    `Here is the result : ${first}, ${second}`,
    { flag: 'a' }
)
console.log('done with this task')
console.log('starting the next one')

// ++++++++++++++++++++ fs Module Async ++++++++++++++++++++
// Chạy bất đồng bộ, sử dụng callback, đọc xong file 1 rồi đến file 2
console.log('start')
readFile('./content/first.txt', 'utf8', (err, result) => {
    if (err) {
        console.log(err)
        return
    }
    const first = result
    readFile('./content/second.txt', 'utf8', (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        const second = result
        writeFile(
            './content/result-async.txt',
            `Here is the result : ${first}, ${second}`,
            (err, result) => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log('done with this task')
            }
        )
    })
})
console.log('starting next task')