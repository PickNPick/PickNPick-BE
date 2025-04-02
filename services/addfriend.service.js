const mongoose = require('mongoose')
const Friendlist = require('../models/friendlist_model')
const User = require('../models/user_model')

exports.addfriend = async (req) => {
    const { friendemail } = req.body
    const currentUserEmail = req.user.email

    try {
        // 자기 자신을 친구로 추가하는지 확인
        if (friendemail === currentUserEmail) {
            return { success: false, message: "자기자신" }
        }

        // 추가하려는 친구가 실제 존재하는 사용자인지 확인
        const friendUser = await User.findOne({ email: friendemail })
        if (!friendUser) {
            return { success: false, message: "존재하지않는사용자" }
        }

        // 현재 사용자의 친구 목록 확인
        let friendlist = await Friendlist.findOne({ useremail: currentUserEmail })

        // 이미 친구로 등록되어 있는지 확인
        if (friendlist && friendlist.friends.some(friend => friend.email === friendemail)) {
            return { success: false, message: "이미친구" }
        }

        const friendData = {
            email: friendemail,
            name: friendUser.name || friendUser.username || "사용자"
        }

        if (friendlist) {
            // 친구 목록이 있는 경우, 새 친구 추가
            await Friendlist.updateOne(
                { useremail: currentUserEmail },
                { $addToSet: { friends: friendData } }
            )
        } else {
            // 친구 목록이 없는 경우, 새로운 문서 생성
            friendlist = new Friendlist({
                useremail: currentUserEmail,
                friends: [friendData]
            })
            await friendlist.save()
        }

        return { success: true, message: "친구 추가 완료" }
    } catch (err) {
        return { success: false, message: `친구 추가 실패: ${err.message}` }
    }
}