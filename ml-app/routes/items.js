var express = require('express')
var router = express.Router() 
var apiItems = require('./api_items');

// If there is req.query fields "translate" them for the API (API uses ?q= and we access via ?search
router.use((req,res,next) => {
	if( Object.keys(req.query).length !== 0 ){
		req.query.q = req.query.search	
		apiItems(req,res,next)
	} else next()
})

// Catch any request and use apiItems
router.use('/', apiItems)


// Render /items/:id view
router.get('/:id', (req,res,next) => {
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

// render /items?search=:query view
router.get('/', (req,res,next) => {
	let query = req.query.search
	let breadcrumbs = [
		{	name: 'Inicio', link: '/'	},	
		{ name: query,		link: ''	}
	]
	res.render(
		'items',
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
