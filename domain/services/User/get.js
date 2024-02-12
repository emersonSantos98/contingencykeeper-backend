const { userRepository } = require('../../repositories');
const {AppError} = require('../../../error/Errors');


module.exports = {
    async getAll(query = {}) {
        query = query || {
            page: 1,
            pageSize: 5,
        };

        const page = query.page || 1;
        const pageSize = parseInt(query.pageSize) || 5;

       const {data, meta} = await userRepository.getAll(query, pageSize, page);

            return {
               mensagem: 'Usuários encontrados com sucesso',
                status: 'OK',
                data,
                meta
            }
    },

    async getById(uuid) {
        return userRepository.getById(uuid);
    },

    async getByEmail(email) {
       return  await userRepository.getByEmail(email);
    }
}






