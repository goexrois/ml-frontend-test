var https = require('https')

module.exports = function (options){
	return function (req,res,next){
			https.get(options.callback(req),(apiResponse) => {
			const { statusCode } = apiResponse
			const contentType = apiResponse.headers['content-type']

			let error
			if (statusCode !== 200) {
				error = new Error(`Request Failed.\n` +
													`Status Code: ${statusCode}`)
			} else if (!/^application\/json/.test(contentType)) {
				error = new Error(`Invalid content-type.\n` +
													`Expected application/json but received ${contentType}`)
			}
			if (error) {
				console.error(error.message)
				// consume response data to free up memory
				apiResponse.resume()
				return
			}

			apiResponse.setEncoding('utf8')
			let rawData = ''
			apiResponse.on('data', (chunk) => { rawData += chunk })
			apiResponse.on('end', () => {
				try {
					const parsedData = JSON.parse(rawData)
					options.data = options.prepareData(parsedData) 
				} catch (e) {
					console.error(e.message)
				}
			})
		}).on('error', (e) => {
			console.error(`Got error: ${e.message}`)
		})
		next()	
	}
}