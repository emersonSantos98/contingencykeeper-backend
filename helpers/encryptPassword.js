const bcrypt = require('bcrypt');


module.exports = {
    async hashPassword(password) {
        return new Promise(async (resolve, reject) => {
            try {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(password, salt);
                resolve(hash)
            } catch (error) {
                reject(error)
            }
        })
    }
}
