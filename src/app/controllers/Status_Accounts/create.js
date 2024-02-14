
const {StatusCodes} = require('http-status-codes');
const yup = require('yup');

const {StatusAccountService } = require('../../../../domain/services');




const schema = yup.object().shape({
    descricao: yup.string().required(),
});

const createBodyValidation = async (req, res, next) => {
    try {
        await schema.validate(req.body, { abortEarly: false });
        next();
    } catch (error) {
        const errors = error.inner.map((err) => ({
            message: err.message,
            path: err.path,
        }));
        return res.status(StatusCodes.BAD_REQUEST).json({ errors });
    }
}



const create = async (req, res) => {
    const {descricao } = req.body;
    const user = await StatusAccountService.create({ descricao });
    return res.status(StatusCodes.CREATED).json(user);
}

module.exports = {
    create,
    createBodyValidation,
}
