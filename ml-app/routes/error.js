var express = require('express')
var router = express.Router()

router.get('/',(err,res,req,next) => {
	console.log("entramos")
	if ( res.status >= 400 && res.status <= 500 ) {
			res.render( 'error', {
				code: res.status
			})
	}
	res.send(res.status + 'ouch')
	next()
})

module.exports = router
