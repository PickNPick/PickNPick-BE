const mongoose = require('mongoose');
const Mailbox = require('./models/mailbox_model'); // 모델 경로를 적절히 수정하세요


// 이수현님에게 온 친구 요청 데이터 추가 함수
async function addFriendRequestsToSuhyun() {
    try {
        // 이수현님의 이메일
        const suhyunEmail = '2suhyni@khu.ac.kr';

        // 친구 요청 데이터 (sender만 다르고 receiver는 모두 이수현)
        const friendRequests = [
            {
                sender: '김민준',
                receiver: '이수현'
            },
            {
                sender: '박지훈',
                receiver: '이수현'
            },
            {
                sender: '신예은',
                receiver: '이수현'
            },
            {
                sender: '도규리',
                receiver: '이수현'
            },
            {
                sender: '여동건',
                receiver: '이수현'
            }
        ];

        // 1. 이수현님의 메일박스가 이미 있는지 확인
        let mailbox = await Mailbox.findOne({ email: suhyunEmail });

        if (mailbox) {
            // 2A. 메일박스가 있으면 친구 요청을, 기존 mails 배열에 추가
            const result = await Mailbox.findOneAndUpdate(
                { email: suhyunEmail },
                { $push: { mails: { $each: friendRequests } } },
                { new: true } // 업데이트된 문서 반환
            );

            console.log('이수현님의 메일박스에 친구 요청이 추가되었습니다:', result);
            return result;
        } else {
            // 2B. 메일박스가 없으면 새로 생성
            const newMailbox = new Mailbox({
                email: suhyunEmail,
                mails: friendRequests
            });

            const savedMailbox = await newMailbox.save();
            console.log('이수현님의 메일박스가 생성되었습니다:', savedMailbox);
            return savedMailbox;
        }
    } catch (error) {
        console.error('친구 요청 추가 중 오류 발생:', error);
        throw error;
    }
}


exports.addFriendRequestsToSuhyun = addFriendRequestsToSuhyun;


// 함수 실행
addFriendRequestsToSuhyun()
    .then(result => {
        console.log('작업 완료!');

    })
    .catch(err => {
        console.error('최종 오류:', err);

    });