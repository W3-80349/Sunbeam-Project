


const isValidEmail = function (value) {
    const regx = /^([a-z0-9]+@[a-z]+\.[a-z]{2,3})?$/
    return regx.test(value)
};


module.exports = {isValidEmail}