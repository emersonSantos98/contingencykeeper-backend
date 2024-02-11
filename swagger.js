const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });
require('dotenv').config();

const doc = {
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
    components: {
        schemas: {
            someBody: {
                $name: "Jhon Doe",
                $age: 29,
                about: ""
            },
            someResponse: {
                name: "Jhon Doe",
                age: 29,
                diplomas: [
                    {
                        school: "XYZ University",
                        year: 2020,
                        completed: true,
                        internship: {
                            hours: 290,
                            location: "XYZ Company"
                        }
                    }
                ]
            },
            someEnum: {
                '@enum': [
                    "red",
                    "yellow",
                    "green"
                ]
            }
        },
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/app/routes/index.js'];



swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server/app.js')
});

console.log('endpointsFiles', endpointsFiles);
