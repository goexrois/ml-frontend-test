var express = require('express')
var router = express.Router() 
var apiItems = require('./api_items');

router.use((req,res,next) => {
	if( Object.keys(req.query).length !== 0 ){
		req.query.q = req.query.search	
		apiItems(req,res,next)
	} else next()
})

router.get('/', (req,res,next) => {
		console.log('req en /items')
		console.log('route: ' + JSON.stringify(req.route)) 
		console.log('params: ' + JSON.stringify(req.params)) 
		console.log('query: ' + JSON.stringify(req.query)) 
		console.log('body: ' + JSON.stringify(req.body))
	let query = req.query.search
	let breadcrumbs = [
		{	name: 'Inicio', link: '/'	},	
		{ name: query,		link: ''	}
	]
			res.render(
				'search',
				{ title: `${query} en MercadoLibre`, 
					iconImgPath: `${req.path}images/ic_Search.png`,
					placeholder: ``,
					value: `${query}`,
					data: res.locals.data,
					breadcrumbs: breadcrumbs
				}
			)
	
});

module.exports = router
