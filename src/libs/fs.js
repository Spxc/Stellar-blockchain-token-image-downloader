/**
 * File: fs.js
 * Description: Filesystem utility functions
 * Author: Spxc
 * Github: https://github.com/Spxc/Stellar-blockchain-token-image-downloader
 * Date: September 02, 2023
 */

const fs = require("fs")

const checkDir = (dir) => {
    if (fs.existsSync(dir)) {
        return true
    }
    return false
}

const createDir = (dir) => {
    return new Promise(resolve => {
        try {
            fs.mkdirSync(dir)
            resolve(true)
        } catch (error) {
            console.log('error creating directory', error)
            resolve(false)
        }
    })
}

module.exports = {
    checkDir,
    createDir
}