const mongoose = require('mongoose');
const User = require('../models/user_model');

exports.getRandomWorldcupUsers = async (req) => {
    try {
        // req.body에서 size 값을 가져옴, 기본값은 32
        const size = req.body.size || 32;

        // MongoDB의 $sample 연산자를 사용하여 joinworldcup:true인 사용자 중 지정된 수만큼 무작위로 선택
        const randomUsers = await User.aggregate([
            { $match: { joinworldcup: true } },  // joinworldcup이 true인 문서만 필터링
            { $sample: { size: parseInt(size) } }  // 무작위로 size 개수만큼 문서 선택
        ]);

        // 충분한 사용자가 없는 경우 에러 처리
        if (randomUsers.length < size) {
            throw new Error(`월드컵 참가 가능한 사용자가 ${size}명 미만입니다.`);
        }

        // size가 1인 경우 객체 반환, 그렇지 않으면 배열 반환
        return size === 1 ? randomUsers[0] : randomUsers;
    } catch (err) {
        throw new Error(err);
    }
};