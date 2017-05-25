var express = require('express')
var router = express.Router() 
var getItems = require('../middleware/get_data')

const itemsQueryPath = 'https://api.mercadolibre.com/sites/MLA/search?q='

const queryOptions = {
	queryPath: itemsQueryPath,
	limit: 4,
	callback(req){
		return itemsQueryPath+req.query.q+'&limit='+this.limit
	},	
	prepareData(obj){
		const CATEGORIES_INDEX = 0 
		let foundItems = { 
			author: { 
				name: 'Gonzalo Exequiel', 
				lastname:"Rodriguez Isleño"
			},
			categories: obj.available_filters[CATEGORIES_INDEX].values,
			items: []
		}
		
		obj.results.forEach((currentValue,index)=>{
			let splittedPrice=currentValue.price.toString().split('.')
			foundItems.items[index] = {
				id: currentValue.id, 
				title: currentValue.title, 
				price: { 
					currency: currentValue.currency_id,
					amount: currentValue.price, 
					decimals: (splittedPrice.length == 1) ? 0 : splittedPrice[1].length 
				},
				picture: currentValue.thumbnail,
				condition: currentValue.condition, 
				free_shipping: currentValue.shipping.free_shipping
			}
		})
		return foundItems
	}
}

router.get('/', (req,res,next) => {
		console.log('req en /api/items')
		console.log('route: ' + JSON.stringify(req.route)) 
		console.log('params: ' + JSON.stringify(req.params)) 
		console.log('query: ' + JSON.stringify(req.query)) 
		console.log('body: ' + JSON.stringify(req.body))	
		console.log('options: ' + JSON.stringify(queryOptions))
		console.log(res.locals.data)
		next()
})

module.exports = router
