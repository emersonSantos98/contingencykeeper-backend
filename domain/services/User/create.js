const { userRepository } = require('../../repositories');



module.exports = {
    async create(user) {
        console.log('user', user);

        return userRepository.create({...user, hash_senha: user.password});
    }
}



