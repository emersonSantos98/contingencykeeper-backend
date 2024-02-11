const express = require('express');
require('./../src/shared/service/translationYup');
const cors = require("cors");
const bodyParser = require('body-parser');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./../swagger-output.json');
const routes = require('../src/app/routes/index');
const { AppError } = require('../error/Errors');
require('dotenv').config();


const baseURLCors = process.env.FRONTEND_URL.split(',')
class App {
    server;
    constructor( ) {
        this.server = express()
        this.middlewares()
        this.router()
        this.errorMiddleware()
    }

    middlewares() {

        this.server.use(helmet())
        this.server.use(cors({
            origin: baseURLCors,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
            credentials: true,
            optionsSuccessStatus: 204,
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Custom-Header']
        }));

        this.server.use(express.json())
        this.server.use(bodyParser.json());
        this.server.use(bodyParser.urlencoded({extended: true}));

        this.server.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

    }

    router() {
        this.server.use('/api/v1', routes)
    }

    errorMiddleware() {
        this.server.use(
            (
                error,
                request,
                response,
                _
            ) => {
                console.log('errorMiddleware', error)
                if (error instanceof AppError) {
                    return response.status(error.statusCode).json({
                        status: 'error',
                        message: error.message,
                    });
                }

                return response.status(500).json({
                    status: "error",
                    message: error.message,
                });
            }
        );
    }


}

module.exports = new App()
