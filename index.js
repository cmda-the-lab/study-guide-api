//Require necessary packages
const express = require("express")
const fs = require("fs")
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
require("dotenv").config() //Configure .env so all env vars are loaded

const Faculty = require("./models/faculty")
const Program = require("./models/program")
const Course = require("./models/course")
const Competency = require("./models/competency")
const Indicator = require("./models/indicator")
const Person = require("./models/person")
const testSchemas = require("./test-schemas")
//Run the next line to test the db schemas
testSchemas.init()

//Get dburl from .env
const mongooseURL = process.env.MONGO_DB_URL

//Connect to and configure database connection
mongoose.connect(
  mongooseURL,
  {
    useNewUrlParser: true
  }
)
mongoose.Promise = global.Promise
const db = mongoose.connection

//Set up express and routes
//TODO: Move routes to proper router
express()
  .use(express.static("static"))
  .use(bodyParser.urlencoded({extended: true}))
  .get("/faculty", getFaculties)
  .get("/faculty/:id", getFaculty)
  .get("/program", getPrograms)
  .get("/program/:id", getProgram)
  .get("/person", getPersons)
  .get("/person/:id", getPerson)
  .get("/course", getCourses)
  .get("/course/:id", getCourse)
  .post("/course", postCourses)
  .listen(8000)

//Some async route functions that get data from the db
async function getFaculties(req, res) {
  const result = await Faculty.find()
  res.send(result)
}

async function getPrograms(req, res) {
  const result = await Program.find()
  res.send(result)
}

async function getCourses(req, res) {
  const result = await Course.find()
  res.send(result)
}

async function getPersons(req, res) {
  const result = await Person.find()
  res.send(result)
}

async function getFaculty(req, res) {
  let id = req.params.id
  console.log("someone requested /faculty:id", id)
  const result = await Faculty.find({
    id
  })
  res.send(result)
}

async function getProgram(req, res) {
  let id = req.params.id
  console.log("someone requested /program:id", id)
  const result = await Program.find({
    id
  })
  res.send(result)
}

async function getCourse(req, res) {
  let id = req.params.id
  console.log("someone requested /Course:id", id)
  const result = await Course.find({
    id
  })
  res.send(result)
}

async function getPerson(req, res) {
  let id = req.params.id
  console.log("someone requested /Person:id", id)
  const result = await Person.find({
    id
  })
  res.send(result)
}

async function postCourses(req, res) {
  let input = req.body
  console.log(input.courses)
  let courses = JSON.parse(input.courses)
  console.log(typeof courses)
  Course.insertMany(courses, function(error, docs) {
      if (error) {
        console.error('Insert into db failed', error)
        res.status(406)
        res.send(error)
      }
      else {
        res.status(200)
        res.send(docs.length + " docs succesfully inserted into db")
      }
    })
}

//Listeners on the database
db.on("error", console.error.bind(console, "MongoDB connection error:"))
db.once("open", function() {
  console.log("Connected to db")
})