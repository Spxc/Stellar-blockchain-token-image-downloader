/**
 * File: stellar.test.js
 * Description: Library unit test for lib/stellar.js
 * Author: Spxc
 * Github: https://github.com/Spxc/Stellar-blockchain-token-image-downloader
 * Date: September 02, 2023
 */

const { tvlTokens } = require("../../src/libs/stellar")

test('Fetching token images', () => {
    return tvlTokens(false).then(data => {
        expect(Array.isArray(data)).toBe(true)
    })
})