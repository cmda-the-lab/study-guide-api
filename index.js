//Require necessary packages
const express = require("express")
const { promisify } = require("util")
const path = require("path")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const debug = require('debug')('API')
require("dotenv").config() //Configure .env so all env vars are loaded

const Faculty = require("./models/faculty")
const Program = require("./models/program")
const Course = require("./models/course")
const Competency = require("./models/competency")
const Indicator = require("./models/indicator")
const Person = require("./models/person")
const testSchemas = require("./test-schemas")
//Run the next line to test the db schemas
//testSchemas.init()

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
const app = express()
app
  .use(express.static("static"))
  .use(bodyParser.urlencoded({ extended: true }))
  .get("/faculty", getFaculties)
  .post("/faculty", postFaculties)
  .get("/faculty/:id", getFaculty)
  .get("/program", getPrograms)
  .post("/program", postPrograms)
  .get("/program/:id", getProgram)
  .get("/person", getPersons)
  .post("/person", postPersons)
  .get("/person/:id", getPerson)
  .get("/course", getCourses)
  .post("/course", postCourses)
  .get("/course/:id", getCourse)
  .get("/course/:id/teachers", getCourseTeachers)
  .listen(8000)

//Some async route functions that get data from the db
async function getFaculties(req, res) {
  const result = await Faculty.find()
  res.send(result)
}

function postFaculties(req, res) {
  let docs = JSON.parse(req.body.faculties)
  Faculty.insertMany(docs, function(error, docs) {
    if (error) {
      debug("Insert into db failed", error)
      res.status(406)
      res.send(error)
    } else {
      res.status(200)
      res.send(docs.length + " docs succesfully inserted into db")
    }
  })
}

async function getPrograms(req, res) {
  const result = await Program.find()
  res.send(result)
}

function postPrograms(req, res) {
  let docs = JSON.parse(req.body.programs)
  Program.insertMany(docs, function(error, docs) {
    if (error) {
      console.error("Insert into db failed", error)
      res.status(406)
      res.send(error)
    } else {
      res.status(200)
      res.send(docs.length + " docs succesfully inserted into db")
    }
  })
}

async function getCourses(req, res) {
  const result = await Course.find()
  res.send(result)
}

function postCourses(req, res) {
  let docs = JSON.parse(req.body.courses)
  Course.insertMany(docs, function(error, docs) {
    if (error) {
      console.error("Insert into db failed", error)
      res.status(406)
      res.send(error)
    } else {
      res.status(200)
      res.send(docs.length + " docs succesfully inserted into db")
    }
  })
}

async function getPersons(req, res) {
  const result = await Person.find()
  res.send(result)
}

function postPersons(req, res) {
  let docs = JSON.parse(req.body.persons)
  Person.insertMany(docs, function(error, docs) {
    if (error) {
      console.error("Insert into db failed", error)
      res.status(406)
      res.send(error)
    } else {
      res.status(200)
      res.send(docs.length + " docs succesfully inserted into db")
    }
  })
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

async function getCourseTeachers(req, res) {
  let id = req.params.id
  console.log("someone requested /Course:id/teachers", id)
  const course = await Course.findOne({
    id
  })
  console.log("teachers for this course: ", course.teachers)
  const teacherIds = course.teachers.map(teacher => mongoose.Types.ObjectId(teacher))
  console.log(teacherIds)
  const result = await Person.find({_id: { $in: teacherIds} })
  res.send(result)
}

//Listeners on the database
db.on("error", console.error.bind(console, "MongoDB connection error:"))
db.once("open", function() {
  debug('Connected to database');
})
