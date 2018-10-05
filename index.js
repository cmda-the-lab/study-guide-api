//Require necessary packages
const express = require('express')
const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
require('dotenv').config()	//Configure .env so all env vars are loaded

const Person = require('./models/person')
const Course = require('./models/course')
const testSchemas = require('./test-schemas')
const pers = testSchemas.person()
//console.log(testSchemas.course(pers))
//Get dburl from .env
const mongooseURL = process.env.MONGO_DB_URL

//Connect to and configure database connection
mongoose.connect(mongooseURL, { useNewUrlParser: true })
mongoose.Promise = global.Promise
const db = mongoose.connection

//Set up express and routes
//TODO: Move routes to proper router
express()
  .use(express.static('static'))
  .get('/faculty', getFaculties)
  .get('/faculty/:id', getFaculty)
  .get('/program', getPrograms)
  .get('/program/:id', getProgram)
  .get('/person', getPersons)
  .get('/person/:id', getPerson)
  .get('/course', getCourses)
  .get('/course/:id', getCourse)
  .listen(8000)

//Some async route functions that get data from the db
async function  getFaculties(req,res){
	let route = req.url
	result = await getRecords(route)
	res.send(result)
}

async function  getPrograms(req,res){
	let route = req.url
	result = await getRecords(route)
	res.send(result)
}

async function  getCourses(req,res){
	let route = req.url
	result = await getRecords(route)
	res.send(result)
}

async function  getPersons(req,res){
	let route = req.url
	result = await getRecords(route)
	res.send(result)
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

async function  getCourse(req,res){
	let id = req.params.id
	console.log("someone requested /course:id", id)
	result = await Course.find({id:id})
	res.send(result)
}

async function  getPerson(req,res){
	let route = req.url
	let id = req.params.id
	console.log("someone requested /person:id", id)
	result = await Person.find({id:id})
	res.send(result)
}

//Returns the contents of a record
function getRecord(record, encoding = "utf8"){
	return new Promise( (resolve,reject) => {
		fs.readFile(path.join(db, record+".json"), encoding, function(err,data) {
		if (err) throw err;
		resolve (JSON.parse(data));
		})
	})
}

//Returns matching record names
function getRecords(table){
	return new Promise( (resolve,reject) => {
		let results = []
		fs.readdir(db+table, (err, files) => {
		  files.forEach(file => {
		  	console.log(db+table+file.replace(".json",""))
		  	// let temp = table+file.replace(".json","")
		  	// let result = getRecord(temp)

		  	let result = { id: file}
		    results.push(result)
		  })
		  resolve(results)
		})
	})
}

//Listeners on the database
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
db.once('open', function() {
  console.log("Connected to db")
})