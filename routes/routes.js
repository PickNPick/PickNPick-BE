const express = require('express')
const router = express.Router();
const googlelogin_controller = require('../controller/googlelogin.controller')
const authMiddleware = require('../middleware/tokenverify')


router.get('/googlelogin',googlelogin_controller.googlelogin)
router.get('/googlelogin/callback',googlelogin_controller.googlelogin_callback)


module.exports = router