//Import thư viện Express.js
const express = require('express');
const morgan = require('morgan')
const handlebars = require('express-handlebars')
const path = require('path');  // Import thư viện path để sử dụng các đường dẫn tĩnh
const route = require('./routes/index');
// const route = require('./routes');

const methodOverride = require('method-override')
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerDocs = require('./config/docs/swaggerConfig');
const db = require('./config/db')
//connect to db
db.connect();

// Tạo một ứng dụng Express.
const app = express();
const port = 3000;


//apply middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs/flower-store-management', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// console.log(swaggerDocs)



//Route init
route(app);


//Bắt đầu lắng nghe các yêu cầu trên cổng 3000
app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
})