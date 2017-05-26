var express = require('express')
var exphbs = require('express-handlebars')
var home = require('./routes/frontpage') 
var items = require('./routes/items') 
var apiItems = require('./routes/api_items') 
var error = require('./routes/error')

var app = express()

app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public')) 

app.use('/',home)
app.use('/items',items)
app.use('/api/items',apiItems)

// Catch any other route that is not defined.
app.use( (req,res,next) => {
	res.status(404) 
	res.render('error', { 
		title: "Mercado Libre - Parece que esta página no existe", 
		iconImgPath: `/images/ic_Search.png`,
		placeholder: `Nunca dejes de buscar`,
		value: ``,
		code: '404',
		url: req.url 
	}) 
})

app.listen(3000, function(){
	console.log('sv is up and listening')
})
