const { fetchAsset } = require("./libs/download")
const optimize = require("./libs/optimize")
const { fetchTokens, fetchPoolProvidersB, tvlTokens } = require("./libs/stellar")

/**
 * Set the compressions resize size
 */
const resizeSize = 30

/**
 * Start the download function which will do
 * 1. Fetch token asset URL
 * 2. Download the assets
 * 3. Compress and resize the images
 * 4. Save compressed version in it's own folder
 */
tvlTokens(false)
.then(async data => {
    await Promise.all(data.map(async asset => {
        setTimeout(async () => {

            /**
             * Setup variables to more easily access them
             * and use data
             */
            let { 
                asset_a_code,
                asset_b_code,
                asset_a_image,
                asset_b_image
            } = asset

            if (asset_a_image && !asset_a_image.includes('.svg')) {

                /**
                 * Compress token A logo from pool assets
                 */
                
                let path = await fetchAsset(asset_a_image, asset_a_code)
                if (path) {
                    optimize.run(path, resizeSize)
                }
            }

            if (asset_b_image && !asset_b_image.includes('.svg')) {

                /**
                 * Compress token B logo from pool assets
                 */
                let path = await fetchAsset(asset_b_image, asset_b_code)
                if (path) {
                    optimize.run(path, resizeSize)
                }
            }
        }, 2000)
    }))
})
