/**
 * File: download.js
 * Description: Image download library
 * Author: Spxc
 * Github: https://github.com/Spxc/Stellar-blockchain-token-image-downloader
 * Date: September 02, 2023
 */

const axios = require('axios')
const mime = require('mime')
const fs = require('fs')

/**
 * Download token asset image & store it to disk
 * @param { String } remoteLocationPath Remote image URL
 * @param { String } token Token asset code
 * @returns { String } Local image path
 */
const fetchAsset = (remoteLocationPath, token) => {
    return new Promise( async(resolve, reject) => {

        console.log('Asset', token)
        console.log('Downloading', remoteLocationPath)

        try {
            /**
             * Fetch token asset and stream it to 
             * our FileSystem in order to further store &
             * compress it
             */
            let response = await axios.get(remoteLocationPath, { responseType: 'stream' })

            /**
             * Get the file extension in order to save it
             * in the correct format
             */
            const extension = mime.getExtension(response.headers['content-type'])

            /**
             * Set filename
             */
            const file = `${token}.${extension}`

            /**
             * Debugging
             */
            console.log(`Writing ${response.headers['content-length']} bytes to file ${file}`)

            /**
             * Stream & pipe the image stream into 
             * createWriteStream to save the image 
             * to our disk
             */
            let stream = response.data
            .pipe(fs.createWriteStream(`${__dirname}/../../downloads/${file}`))
            
            stream.on('finish', () => { 
                console.log("Finished downloading")
                resolve(`${__dirname}/../../downloads/${file}`)
            })
            

            /**
             * Resolve the full asset path, so it can 
             * easily be accessed for image optimization
             * at a later stage
             */
            
        } catch (error) {

            /**
             * Debugging
             */
            console.log('error fetching image', error)
            /**
             * Resolve as `false` if the request
             * fails
             */
            resolve(false)
        }
        // resolve("path")
    })
}

module.exports = {
    fetchAsset
}