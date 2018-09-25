const express = require('express')

express()
  .use(express.static('static'))
  .get('/faculty', faculty)
  .listen(8000)

function  faculty(){
	console.log("someone requested /faculty")
}
