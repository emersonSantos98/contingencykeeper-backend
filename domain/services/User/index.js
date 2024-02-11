const {create} = require('./create');

module.exports =  new class UserService {
     create = create;
}
