const mongoose = require('mongoose')
const Friendlist = require('../models/friendlist_model')



exports.getfriendlist = async (req) => {
    try {
        const datas = await Friendlist.find({ useremail: req.body.useremail });
        
        return datas
    }
    catch (err) {
        throw new Error(err)
    }
}