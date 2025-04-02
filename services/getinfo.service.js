const mongoose = require('mongoose')
const User = require('../models/user_model')

exports.getinfo = async (req) => {
    try {
        console.log('요청옴')
        const datas = await User.find({ email: req.user.email });
        return datas
    }
    catch (err) {
        throw new Error(err)
    }
}