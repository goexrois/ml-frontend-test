var express = require('express')
var router = express.Router() 
var getData = require('../middleware/get_data')

const itemQueryPath = 'https://api.mercadolibre.com/items/'
const categoriesQueryPath = 'https://api.mercadolibre.com/categories/'

const itemQueryOptions = {
	queryPath: itemQueryPath,
	callback(req,res){
		return itemQueryPath+req.params.id 
	},
	saveData(res,obj){
		let splittedPrice = obj.price.toString().split('.')
		let translateCondition = (condition) => { 
			switch(condition){
					case "used": return "Usado"
					case "new": return "Nuevo"
					case "Not specified by seller": return "No especificado por el vendedor"
			} 
		}  
		res.locals.data = { 
			author: { 
				name: 'Gonzalo', 
				lastname: 'Rodriguez IsleÃo'
			},
			item: {
				id: obj.id, 
				title: obj.title, 
				price: { 
					currency: obj.currency_id,
					amount: obj.price, 
					decimals: (splittedPrice.length == 1) ? 0 : splittedPrice[1].length 
				},
				picture: obj.pictures[0].url,
				condition: obj.condition, 
				free_shipping: obj.shipping.free_shipping,
				sold_quantity: obj.sold_quantity,
				description: '',
				condition: translateCondition(obj.condition),
				category: obj.category_id,
				path_from_root: []
			}
		}
	}	
}

const itemDescriptionQueryOptions = {
	queryPath: itemQueryPath,
	callback(req,res){
		return itemQueryPath+req.params.id+'/description'
	},
	saveData(res,obj){
		res.locals.data.item.description = obj.text;	
	}
}

const itemRoutePathQueryOptions = {
	queryPath: categoriesQueryPath,
	callback(req,res){
		return categoriesQueryPath+res.locals.data.item.category
	},
	saveData(res,obj){
		obj.path_from_root.forEach( (currentValue,index) => {
			res.locals.data.item.path_from_root[index] = 
				{ 
					name: currentValue.name, 
					link: ''
				}
		})
	}
}
router.use('/:id',getData(itemQueryOptions))
router.use('/:id',getData(itemDescriptionQueryOptions))
router.use('/:id',getData(itemRoutePathQueryOptions))

router.get('/:id', (req,res,next) => {
		console.log('req en /api/item/:id')
		console.log('route: ' + JSON.stringify(req.route)) 
		console.log('params: ' + JSON.stringify(req.params)) 
		console.log('query: ' + JSON.stringify(req.query)) 
		console.log('body: ' + JSON.stringify(req.body))
		next()
})

module.exports = router
