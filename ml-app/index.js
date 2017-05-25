var express = require('express')
var exphbs = require('express-handlebars')
var home = require('./routes/frontpage') 
var items = require('./routes/items') 
//var item = require('./routes/item')
var apiItems = require('./routes/api_items') 
var apiItem = require('./routes/api_item') 

var app = express()

app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public')) 

app.use('/',home)
app.use('/items',items)
//app.use('/api/items',apiItems)
app.use('/api/item',apiItem)
//app.use('/item',item)

app.listen(3000, function(){
	console.log('sv is up and listening')
})
