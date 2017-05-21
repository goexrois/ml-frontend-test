var express = require('express')
var app = express()
var search = require('./routes/search')
var item = require('./routes/item')

app.use('/api/items/search',search);
app.use('/api/items',item);

app.listen(3000, function(){
	console.log('sv is up and listening')
})
