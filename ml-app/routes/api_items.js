var express = require('express')
var router = express.Router() 
var getItems = require('../middleware/get_data')

// Definition of ML API endpoints
const itemsQueryPath = 'https://api.mercadolibre.com/sites/MLA/search?q='
const itemQueryPath = 'https://api.mercadolibre.com/items/'
const categoriesQueryPath = 'https://api.mercadolibre.com/categories/'

// options object: 
// @field queryPath - Defines the url that is going to be requested
// @field callback - Function for retrieving the full url for the request
// @field saveData - Function that saves the specified data on res.locals.data
const queryOptions = {
	queryPath: itemsQueryPath,
	limit: 4,
	callback(req,res){
		return itemsQueryPath+req.query.q+'&limit='+this.limit
	},	
	saveData(res,obj){
		const CATEGORIES_INDEX = 0 
		res.locals.data = { 
			author: { 
				name: 'Gonzalo Exequiel', 
				lastname:"Rodriguez IsleÃ±o"
			},
			categories: [],
			items: []
		}
		
		if(obj.available_filters.length){
				obj.available_filters[CATEGORIES_INDEX].values.forEach( (currentValue,index) => { 
					res.locals.data.categories[index] = currentValue.name 
				})
		}

		if( obj.results.length ){
			obj.results.forEach((currentValue,index)=>{
				let splittedPrice=currentValue.price.toString().split('.')
				res.locals.data.items[index] = {
					id: currentValue.id, 
					title: currentValue.title, 
					price: { 
						currency: currentValue.currency_id,
						amount: currentValue.price, 
						decimals: (splittedPrice.length == 1) ? 0 : splittedPrice[1].length 
					},
					picture: currentValue.thumbnail,
					condition: currentValue.condition, 
					free_shipping: currentValue.shipping.free_shipping,
					address: currentValue.address
				}
			})
		}
	}
}

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


// Calls to middleware function which retrieves data.
router.use(getItems(queryOptions))
router.use('/:id',getItems(itemQueryOptions))
router.use('/:id',getItems(itemDescriptionQueryOptions))
router.use('/:id',getItems(itemRoutePathQueryOptions))

router.get('/', (req,res,next) => {
		next()
})

router.get('/:id', (req,res,next) => {
		next()
})

module.exports = router
