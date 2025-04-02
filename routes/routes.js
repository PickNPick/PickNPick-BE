const express = require('express')
const router = express.Router();
const googlelogin_controller = require('../controller/googlelogin.controller')
const getinfo_controller = require('../controller/getinfo.controller')
const authMiddleware = require('../middleware/tokenverify')
const updateinfo_controller = require('../controller/updateinfo.controller')
const wantfriend_controller = require('../controller/wantfriend.controller')
const getmailbox_controller = require('../controller/getmailbox.controller')

//구글로그인 API
router.get('/googlelogin',googlelogin_controller.googlelogin)
router.get('/googlelogin/callback',googlelogin_controller.googlelogin_callback)


//회원정보 API
router.post('/getinfo',authMiddleware,getinfo_controller.getinfo)

//회원정보수정 API
router.post('/updateinfo',authMiddleware,updateinfo_controller.updateinfo)

//추파함조회
router.get('/getmailbox',authMiddleware,getmailbox_controller.getmailbox)

module.exports = router