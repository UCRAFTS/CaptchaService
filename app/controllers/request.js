'use strict'

import CaptchaService from '../service/captcha.js'
import express from 'express';

export default class RequestController {

    /**
     * @param {CaptchaService} service
     */
    constructor(service) {
        this.service = service
        this.router = express.Router()
        this.router.get('/create', (req, res) => this.createCaptcha(req, res))
    }

    getRouter() {
        return this.router
    }

    createCaptcha(req, res) {
        this.service.createCaptcha().then((result) => {
            res.send(result)
        });
    }
}
