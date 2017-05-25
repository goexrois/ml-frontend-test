const express = require('express')
const router = express.Router() 
const apiItems = require('./api_items');
/*
const itemsQueryPath = "http://localhost:3000/api/items/search?q="

const queryOptions = {
	data : {},
	queryPath: itemsQueryPath,
	callback(req){
		return itemsQueryPath+req.query.q
	},	
	prepareData(obj){
		return obj;
	}
}){ 
*/
//router.use('/',(req,res,next) => {apiSearch(req,res,next)})

router.get('/', (req,res,next) => {
		console.log('req en /items')
		console.log('route: ' + JSON.stringify(req.route)) 
		console.log('params: ' + JSON.stringify(req.params)) 
		console.log('query: ' + JSON.stringify(req.query)) 
		console.log('body: ' + JSON.stringify(req.body))
	let query = req.query.search
	req.query.q = query	
	let breadcrumbs = [
		{	name: 'Inicio', link: '/'	},	
		{ name: query,		link: ''	}
	]
	apiItems(
		req,
		res,
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
	) 
	

});

module.exports = router
