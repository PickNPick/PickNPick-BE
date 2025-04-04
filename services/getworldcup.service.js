const mongoose = require('mongoose');
const User = require('../models/user_model');

exports.getRandomWorldcupUsers = async (req) => {
    try {
        // MongoDB의 $sample 연산자를 사용하여 joinworldcup:true인 사용자 중 32명을 무작위로 선택
        const randomUsers = await User.aggregate([
            { $match: { joinworldcup: true } },  // joinworldcup이 true인 문서만 필터링
            { $sample: { size: 32 } }            // 무작위로 32개 문서 선택
        ]);

        // 충분한 사용자가 없는 경우 에러 처리
        if (randomUsers.length < 32) {
            throw new Error('월드컵 참가 가능한 사용자가 32명 미만입니다.');
        }

        return randomUsers;
    } catch (err) {
        throw new Error(err.message);
    }
};