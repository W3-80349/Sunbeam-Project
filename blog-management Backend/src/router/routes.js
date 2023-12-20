const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const userController = require('../controllers/userController');



// //User Email Verification
router.post('/verify', userController.userEmailVerification);

//User Regestration api
router.post('/registration',userController.createUser);

// User Login api
 router.post('/login',userController.loginUser);

 router.get('/api-docs', swaggerUi.setup(swaggerDocument));

 

module.exports = router;