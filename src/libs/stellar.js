/**
 * Import Axios 
 */
const axios = require("axios")

/**
 * Initialize result tokenArray
 */
let tokenArray = []

/**
 * Set base URL for the Horizon API
 */
let baseUrl = 'https://api.stellar.expert'

/**
 * Fetch token's and it's logo asset from the Horizon API
 * @param { String } page Pagination cursor 
 * @returns Array
 */
const tvlTokens = (nextUrl) => {

    /**
     * Setup `page`variable and append it 
     * with the `nextUrl` params
     */
    var page = nextUrl

    /**
     * Set first url cursor
     */
    if (!nextUrl) {
        page = '/explorer/public/liquidity-pool?limit=200&order=desc&sort=tvl'
    }
    
    /**
     * Fetch the tokens from the using the url
     * and append the cursor if present
     */
    return axios.get(`${baseUrl}${page}`).then(async (response) => {
        
        /**
         * Map current cursor document and 
         * append the objects to array, then use that array to 
         * concat with exsiting one
         */
        let tempArray = []
        await Promise.all(response.data._embedded.records.map(asset => {

            /**
             * Create a JSON Object to be pushed into the
             * result Array which will be resolved
             */
            let object = {
                asset_a_code: asset?.assets[0]?.toml_info?.code || "XLM",
                asset_b_code: asset?.assets[1]?.toml_info?.code || "XLM",
                asset_a_image: asset?.assets[0]?.toml_info?.image,
                asset_b_image: asset?.assets[1]?.toml_info?.image
            }

            /**
             * Push to `tempArray`
             */
            tempArray.push(object)
        }))

        /**
         * Append array to existing one
         */
        tokenArray = tokenArray.concat(tempArray)

        /**
         * If the cursor isn't EOD we will re run our 
         * query
         */
        if (nextUrl != response.data._links.next.href) {
            console.log(`Processing ${page}`)
            return tvlTokens(response.data._links.next.href)
        } 

        /**
         * Our cursor is EOD which means we can 
         * returned our `concat()` array, containing
         * the full list of assets
         */
        console.log(`Returned length ${tokenArray.length}`)
        return tokenArray
    }).catch(function() {
        return tokenArray
    })
}

module.exports = {
    tvlTokens
}