const express = require('express')
const router = express.Router() 

router.get('/', (req,res) => {
		console.log('req en /')
		console.log('route: ' + JSON.stringify(req.route)) 
		console.log('params: ' + JSON.stringify(req.params)) 
		console.log('query: ' + JSON.stringify(req.query)) 
		console.log('body: ' + JSON.stringify(req.body))

	res.render(
		'home',
		{ title: `${req.query.search} en MercadoLibre`, 
			iconImgPath: `${req.path}images/ic_Search.png`,
			placeholder: `Nunca dejes de buscar`,
			value: `` 
		})
});

module.exports = router
