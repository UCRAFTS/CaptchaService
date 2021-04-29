'use strict'

import redis from 'redis'
import GmCaptcha from 'gm-captcha'
import TextUtils from "../utils/text.js";

export default class CaptchaService {

    /**
     * @param {RedisClient} redis
     */
    constructor(redis) {
        this.redis = redis
    }

    createCaptcha() {
        let text = TextUtils.getText(process.env.CAPTCHA_PATTERN, process.env.CAPTCHA_LENGTH);
        let captcha  = new GmCaptcha({
            width: process.env.CAPTCHA_WIDTH,
            height: process.env.CAPTCHA_HEIGHT,
            text: text,
            background: process.env.CAPTCHA_BACKGROUND,
            wordSpacing: process.env.CAPTCHA_WORLD_SPACING,
            maxSwirl: process.env.CAPTCHA_MAX_SWIRL,
            maxShear: process.env.CAPTCHA_MAX_SHEAR,
            lineCount: -1,
            lineWidth: -1,
            pointCount: -1,
            fontSize: process.env.CAPTCHA_FONT_SIZE
        })

        return new Promise((resolve) => {
            captcha.gmBuffer(captcha.generator(), 'JPEG', async (buffer) => {
                let base64 = buffer.toString('base64')

                await this.redis.hset(text, base64)
                await this.redis.expire(text, process.env.REDIS_EXPIRE)

                resolve(text)
            })
        })
    }
}
