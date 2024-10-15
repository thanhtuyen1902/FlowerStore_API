
const productRouter = require('./products');
const customerRouter = require('./customers');
const meRouter = require('./me');
const authRouter = require('./auth');
const orderRouter = require('./orders');
const categoryRouter = require('./categories');


function router(app) {
    app.use('/api/v1/categories', categoryRouter);
    app.use('/api/v1/orders', orderRouter);
    app.use('/api/v1/me/profile', meRouter);
    app.use('/api/v1/users', customerRouter);
    app.use('/api/v1/products', productRouter);
    app.use('/api/v1', authRouter);



};

module.exports = router;