var express = require('express')
var router = express.Router() 
var apiItems = require('./api_items');

router.use((req,res,next) => {
	if( Object.keys(req.query).length !== 0 ){
		req.query.q = req.query.search	
		apiItems(req,res,next)
	} else next()
})

router.use('/', apiItems)

router.get('/:id', (req,res,next) => {
		console.log('req en /item/:id')
		console.log('route: ' + JSON.stringify(req.route)) 
		console.log('params: ' + JSON.stringify(req.params)) 
		console.log('query: ' + JSON.stringify(req.query)) 
		console.log('body: ' + JSON.stringify(req.body))
		let breadcrumbs = [
			{	name: 'Inicio', link: '/'	},	
			{ name: 'algo',		link: ''	}
		]
			res.render(
				'item',
				{ title: res.locals.data.title, 
					iconImgPath: `/images/ic_Search.png`,
					placeholder: `Nunca dejes de buscar`,
					value: ``,
					product: res.locals.data.item,
					breadcrumbs: res.locals.data.item.path_from_root
				}
			)
});


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
	
})

module.exports = router
