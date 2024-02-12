const { StatusCodes } = require('http-status-codes');
const yup = require('yup');
const { UserService } = require('../../../../domain/services');

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const loginBodyValidation = async (req, res, next) => {
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

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserService.login(email, password);
        return res.status(StatusCodes.OK).json(user);
    } catch (error) {
        return res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

module.exports = {
    login,
    loginBodyValidation
}
