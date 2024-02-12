const {hashPassword} = require('./encryptPassword');
const {nextPage} = require('./urlNextPage');
module.exports = new class Helpers {
    hashPassword = hashPassword;
   nextPageUrl = nextPage;
}
