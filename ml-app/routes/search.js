var express = require('express')
var router = express.Router() 
var getItems = require('../middleware/get_data')

const itemsQueryPath = 'https://api.mercadolibre.com/sites/MLA/search?q='

const queryOptions = {
	data : {},
	queryPath: itemsQueryPath,
	limit: 4,
	callback(req){
		return itemsQueryPath+req.query.q+'&limit='+this.limit
	},	
	prepareData(obj){
		let foundItems = { 
			author: { 
				name: 'Gonzalo', 
				lastname:"Rodriguez Isleño"
			},
			categories: [],
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
		});
		return foundItems
	}
}

router.use('/',getItems(queryOptions))

router.get('/', function(req,res,next){
	res.send(queryOptions.data)
})

module.exports = router
