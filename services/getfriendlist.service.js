const mongoose = require('mongoose');
const Friendlist = require('../models/friendlist_model');

exports.getfriendlist = async (req, res) => {
    try {
        // Find the friendlist for the current user
        const friendlist = await Friendlist.findOne({ useremail: req.user.email });

        if (!friendlist) {
            // If no friendlist found, return an empty friends array
            return res.status(200).json({ friends: [] });
        }

        // Return the friends array from the friendlist document
        return res.status(200).json({ friends: friendlist.friends });
    }
    catch (err) {
        console.error('Error in getfriendlist:', err);
        return res.status(500).json({ message: '친구 목록을 가져오는 중 오류가 발생했습니다.' });
    }
}