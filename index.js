const express = require('express')
const fs = require('fs')
const path = require('path')

const db = 'static'

express()
  .use(express.static('static'))
  .get('/faculty', getFaculties)
  .get('/faculty/:id', getFaculty)
  .get('/program', getPrograms)
  .get('/program/:id', getProgram)
  .listen(8000)

//TODO: make this reusable async just like the getRecord function
function  getFaculties(req,res){
	let route = req.url
	let faculties = []
	fs.readdir(db+route, (err, files) => {
	  files.forEach(file => {
	  	let faculty = { id: file}
	    faculties.push(faculty)
	  })
	  res.send(faculties)
	})	
}

function  getPrograms(req,res){
	let route = req.url
	let programs = []
	fs.readdir(db+route, (err, files) => {
	  files.forEach(file => {
	  	let program = { id: file}
	    programs.push(program)
	  })
	  res.send(programs)
	})	
}

async function  getFaculty(req,res){
	let route = req.url
	console.log("someone requested /faculty:id", route)
	result = await getRecord(route)
	res.send(result)
}

async function  getProgram(req,res){
	let route = req.url
	console.log("someone requested /program:id", route)
	result = await getRecord(route)
	res.send(result)
}

function getRecord(table, encoding = "utf8"){
	return new Promise( (resolve,reject) => {
		console.log(db,table)
		fs.readFile(path.join(db, table+".json"), encoding, function(err,data) {
		if (err) throw err;
		resolve (JSON.parse(data));
		})
	})
}