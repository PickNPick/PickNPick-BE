const User = require('../../models/user_model')
const Mailbox = require('../../models/mailbox_model')

module.exports = (socket, userSockets) => {
    socket.on("wantfriend", async (data) => {
        const mailbox = await Mailbox.findOne({ email: data.receiveremail })
        mailbox.mails.push({ sender: data.sender, receiver: data.receiver });
        await mailbox.save();
        const address = userSockets.get(data.receiveremail)
        const datas = await User.find({ email: data.senderemail })
        socket.to(address).emit("wantfriend", {
            sender: data.sender,
            receiver: data.receiver,
            schoolid: datas.schoolid,
            major: datas.major,
            mbti: datas.mbti,
            region: datas.region,
            discription: datas.discription,
            profileImage: datas.profileImage
        });

        // 예: 누군가와 매칭 시도 로직
        // userSockets 등을 사용해서 특정 사용자에게 메시지 보내는 것도 가능
    });
};