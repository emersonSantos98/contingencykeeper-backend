const {hashPassword} = require('./encryptPassword');

module.exports = new class Helpers {
    hashPassword = hashPassword;
}
