const getmyinfo_service = require('../services/getmyinfo.service')

exports.getmyinfo = async (req, res) => {
    try{
        console.log(`${req.user.email}님께서 getmyinfo 요청`)
        const result = await getmyinfo_service.getmyinfo(req);
        res.status(200).json(result)
    }
    catch(err){
        res.send(err)
    }
}