var express = require('express')
var router = express.Router() 
var getData = require('../middleware/get_data')

const itemQueryPath = 'https://api.mercadolibre.com/items/'

const itemQueryOptions = {
	data: {},
	queryPath: itemQueryPath,
	callback(req){
		return itemQueryPath+req.params.id 
	},
	prepareData(obj){
		let splittedPrice = obj.price.toString().split('.')
		let item = { 
			author: { 
				name: 'Gonzalo', 
				lastname: 'Rodriguez Isle√o'
			},
			item: {
				id: obj.id, 
				title: obj.title, 
				price: { 
					currency: obj.currency_id,
					amount: obj.price, 
					decimals: (splittedPrice.length == 1) ? 0 : splittedPrice[1].length 
				},
				picture: obj.thumbnail,
				condition: obj.condition, 
				free_shipping: obj.shipping.free_shipping,
				sold_quantity: obj.sold_quantity,
				description: ''
			}
		}
		return item
	}	
}

const itemDescriptionQueryOptions = {
	data: {},
	queryPath: itemQueryPath,
	callback(req){
		return itemQueryPath+req.params.id+'/description'
	},
	prepareData(obj){
		return obj.text
	}
}

router.use('/:id',getData(itemQueryOptions))
router.use('/:id',getData(itemDescriptionQueryOptions))

router.get('/:id', function (req,res,next){
	itemQueryOptions.data.item.description = itemDescriptionQueryOptions.data 
	res.send(itemQueryOptions.data)
})

module.exports = router
