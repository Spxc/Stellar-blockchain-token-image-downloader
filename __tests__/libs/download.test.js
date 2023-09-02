/**
 * File: download.test.js
 * Description: Library unit test for lib/download.js
 * Author: Spxc
 * Github: https://github.com/Spxc/Stellar-blockchain-token-image-downloader
 * Date: September 02, 2023
 */

const { fetchAsset } = require("../../src/libs/download")

test('Download file', () => {
    return fetchAsset('https://clipart-library.com/data_images/320477.png', 'GITHUB_TEST').then(data => {
        expect(data.includes('/downloads')).toBe(true)
    })
})