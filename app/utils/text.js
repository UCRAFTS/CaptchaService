'use strict'

export default class TextUtils {

    /**
     * @param {string} pattern
     * @param {int} length
     * @returns {string}
     */
    static getText(pattern, length) {
        if (length <= 0) {
            length = 5;
        }
        
        let result = ''

        if (pattern.length <= 0) {
            return result
        }
        
        for (let i = 0; i <= length; i++) {
            let item = pattern[Math.floor(Math.random() * pattern.length)]

            if ((Math.random() * 2)> 1) {
                item = item.toUpperCase()
            }

            result += item
        }

        return result
    }
}
