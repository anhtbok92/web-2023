/*
# 3. Create a modules
    - Có 2 cách tạo 1 modules
        + Sử dụng module.exports.
        + Sử dụng exports.
* */
// export function
module.exports.getMyDateTime = function () {
    return Date();
}

exports.getDirName = function () {
    return __dirname;
}

// export variable
const MY_AGE = 30;
exports.myAge = MY_AGE;