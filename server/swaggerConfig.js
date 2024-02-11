const swaggerJsdoc = require('swagger-jsdoc');

if (process.env.NODE_ENV === 'production') {

}


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Contingency Keeper API',
            description: 'API para o projeto Contingency Keeper',
            version: '1.0.0',
            contact: {
                name: "Emerson Santos",
                email: "emerson.sanatosokl10@gmail.com",
                url: "https://github.com/emersonSantos98/contingencykeeper-backend"
            }
        },
        servers: [
            {
                url: `${process.env.API_URL}:${process.env.PORT}/api/v1`,
                description: 'Servidor local',
            },
            {
                url: `${process.env.API_URL}:${process.env.PORT}/api/v1`,
                description: 'Servidor de produção',
            },
        ],
    },
    apis: ['./src/app/routes/*.js', './src/app/routes/Public/*.js', './src/app/models/*.js', './src/app/controllers/*.js'],
};



const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
