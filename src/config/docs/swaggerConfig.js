
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'FlowerStore API',
            version: '1.0.0',
            description: 'API FlowerStore Management',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Chỉ định file chứa routes sẽ được Swagger quét

};

// Tạo Swagger docs
const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;