const {User} = require('../../models');


module.exports = {
    async getAll(filter,  pageSize, page) {
        return new Promise(async (resolve, reject) => {
            try {
                let where = null;

                if (filter) {
                    where = {};
                    if (filter.uuid) {
                        console.log('uuid');
                        where.uuid = filter.uuid;
                    }
                    if (filter.email) {
                        console.log('email');
                        where.email = filter.email;
                    }
                    if (filter.name) {
                        console.log('name');
                        where.name = filter.name;
                    }
                }
                const { count, rows: users } = await User.findAndCountAll({
                    where,
                    limit: pageSize,
                    offset: (page - 1) * pageSize,
                    order: [['created_at', 'DESC']],
                });

                 const totalPages = Math.ceil(count / pageSize);

                 const nextPage = page < totalPages ? `${process.env.API_URL}:${process.env.PORT}/api/v1/user/private/getAll?page=${page + 1}&pageSize=${pageSize}` : null;

                resolve({
                    data: users,
                    meta: {
                        total: count,
                        totalPages,
                        page,
                        pageSize,
                        nextPage
                    }
                });

            } catch (error) {
                reject(error);
            }
        });
    },
    async getById(uuid) {
        return await User.findByPk(uuid);
    },

    async getByEmail(email) {
        return await User.findOne({where: {email}});
    }
}
