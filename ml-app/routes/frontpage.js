const express = require('express')
const router = express.Router() 

// Render frontpage

router.get('/', (req,res) => {
	res.render(
		'home',
		{ 
			title: `MercadoLibre`, 
			iconImgPath: `${req.path}images/ic_Search.png`,
			placeholder: `Nunca dejes de buscar`,
			value: `` 
		})
});

module.exports = router
