var express = require('express')
var router = express.Router() 
var apiItems = require('./api_items');

router.use((req,res,next) => {
	res.locals.renderSearchForm = true
	if( Object.keys(req.query).length !== 0 ){
		req.query.q = req.query.search	
		apiItems(req,res,next)
	} else next()
})

router.use('/',(req,res,next) => {
	res.locals.renderSearchForm = true
	apiItems(req,res,next) 
})

module.exports = router
