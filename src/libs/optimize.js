const sharp = require("sharp")

const resize = () => {
    return new Promise(async resolve => {

    })
}

/**
 * 
 * @param { String } file Local filepath for the image to be compressed and resized
 * @param { Number } size Resize image dimensions
 * @returns 
 */
const run = (file, size) => {
    return new Promise(async resolve => {

        try {
        
            /**
             * Setup filepaths & filenames so it can be 
             * accessed at a later stage
             */
            let filepath = file.split('downloads/')[0]
            let filename = file.split('downloads/')[1]

            /**
             * Resize & compress asset image
             */
            sharp(file)
            .resize(size, size)
            .toFile(`${filepath}downloads/${size}/${filename}`, (error, data) => { 
                if (error) {
                    console.log('error compressing', error)
                    resolve(false)
                }
            })
            .png()
            
            /**
             * Resolve promise
             */
            resolve(true)
        } catch (error) {
            
            /**
             * Handle error
             */
            resolve(false)
        }
    })
}

module.exports = {
    run
}