var express = require('express')
var exphbs = require('express-handlebars')
var home = require('./routes/frontpage') 
var items = require('./routes/items') 
var apiItems = require('./routes/api_items') 

var app = express()

app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

app.use(express.static('public')) 

app.use('/',home)
app.use('/items',items)
app.use('/api/items',apiItems)

app.listen(3000, function(){
	console.log('sv is up and listening')
})
