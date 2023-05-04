const router = require('express').Router();
const thoughtRoute = require('./thought-routes');
const userRoute = require('./user-routes');

router.use('/thoughts', thoughtRoute);
rpouter.use('/users', userRoute);

module.exports = router;