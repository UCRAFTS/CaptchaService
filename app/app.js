'use strict'

import dotenv from 'dotenv'
import redis from 'redis'
import express from 'express'

import RequestController from "./controllers/request.js";
import CaptchaService from "./service/captcha.js";

export default class App {

    constructor() {
        this.config = dotenv.config()
        this.redis = redis.createClient({
            'host': process.env.REDIS_HOST,
            'port': process.env.REDIS_PORT,
            'db': process.env.REDIS_DB,
            'password': process.env.REDIS_PASS
        });

        this.app = express()
        this.app.listen(process.env.APP_PORT)
    }

    run() {
        let service = new CaptchaService(this.redis)

        this.app.use('/api/v1/captcha', new RequestController(service).getRouter());
    }
}
