const mongoose = require('mongoose')
const FriendRequest = require('../models/friendrequest_model')
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

        // 이미 친구인지 확인
        const existingFriendlist = await Friendlist.findOne({
            useremail: currentUserEmail,
            "friends.email": friendemail
        })

        if (existingFriendlist) {
            return { success: false, message: "이미친구" }
        }

        // 이미 친구 요청을 보냈는지 확인
        const existingRequest = await FriendRequest.findOne({
            recipientEmail: friendemail,
            "requests.email": currentUserEmail
        })

        if (existingRequest) {
            return { success: false, message: "이미요청됨" }
        }

        // 친구 요청 데이터 준비
        const requestData = {
            email: currentUserEmail,
            name: req.user.name || req.user.username || "사용자",
            createdAt: new Date()
        }

        // 친구 요청 목록 업데이트
        let friendRequest = await FriendRequest.findOne({ recipientEmail: friendemail })

        if (friendRequest) {
            // 친구 요청 목록이 있는 경우, 새 요청 추가
            await FriendRequest.updateOne(
                { recipientEmail: friendemail },
                { $push: { requests: requestData } }
            )
        } else {
            // 친구 요청 목록이 없는 경우, 새로운 문서 생성
            friendRequest = new FriendRequest({
                recipientEmail: friendemail,
                requests: [requestData]
            })
            await friendRequest.save()
        }

        return { success: true, message: "친구 요청 완료" }
    } catch (err) {
        return { success: false, message: `친구 요청 실패: ${err.message}` }
    }
}