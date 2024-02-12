const {User} = require('../../models');
const {nextPageUrl} = require('../../../helpers');
module.exports = {
    async getAll(filter,  pageSize, page) {
        return new Promise(async (resolve, reject) => {

            try {
                let where = null;

                if (filter) {
                    where = {};
                    if (filter.uuid) {
                        where.uuid = filter.uuid;
                    }
                    if (filter.email) {
                        where.email = filter.email;
                    }
                    if (filter.name) {
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

                 const nextPage =   await nextPageUrl(totalPages, page, pageSize, 'user/private/getAll');

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


async function createUrl(totalPages, page, pageSize, url) {
    const URL =  page < totalPages ? `${process.env.API_URL}:${process.env.PORT}/api/v1/${url}?page=${page + 1}&pageSize=${pageSize}` : null;
    return URL;
}
