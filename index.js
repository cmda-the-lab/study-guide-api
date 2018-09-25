const express = require('express')
const fs = require('fs')
const path = require('path')

express()
  .use(express.static('static'))
  .get('/faculty/:id', faculty)
  .listen(8000)

function  faculty(req,res){
	let route = req.url
	let id = req.params.id
	console.log("someone requested /faculty:id", id)
	fs.readFile(path.join('static', route + ".json"),'utf8', function(err,data) {
		if (err) throw err;
		let result = JSON.parse(data);
		console.log("Found file: ", result)

	})
}