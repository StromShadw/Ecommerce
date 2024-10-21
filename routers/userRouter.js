const router = require('express').Router()
const userCtrl = require('../controllers/UserCtrl');
const auth = require('../middleware/auth')

router.post('/register',userCtrl.register)
router.post('/login',userCtrl.login)
router.post('/logout',userCtrl.logout)
router.post('/refresh_token',userCtrl.refreshToken)
router.post('/infor',auth,userCtrl.getUser)

module.exports = router