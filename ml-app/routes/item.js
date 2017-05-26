var express = require('express')
var router = express.Router() 
var apiItem = require('./api_item');

router.use('/', apiItem)

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

module.exports = router
