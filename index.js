//Require necessary packages
const express = require("express")
const { promisify } = require("util")
const path = require("path")
const mongoose = require("mongoose")
const cors = require('cors')
const bodyParser = require("body-parser")
const debug = require("debug")("API")
require("dotenv").config() //Configure .env so all env vars are loaded

mongoose.set("debug", Boolean(process.env.DEBUG))

const Faculty = require("./models/faculty")
const Program = require("./models/program")
const Cluster = require("./models/cluster")
const Module = require("./models/module")
const Competency = require("./models/competency")
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
  .use(cors())  //Needed to allow localhost testing
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .get("/faculty", getFaculties)
  // .post("/faculty", postFaculties)
  // .get("/faculty/:id", getFaculty)
  .get("/program", getPrograms)
  // .post("/program", postPrograms)
  // .get("/program/:id", getProgram)
  .get("/person", getPersons)
  // .post("/person", postPersons)
  // .get("/person/:id", getPerson)
  .get("/cluster", getClusters)
  .post("/cluster", postClusters)
  .get("/module", getModules)
  .post("/module", postModules)
  .get("/module/:id", getModule)
  // .get("/module/:id/teachers", getModuleTeachers)
  .get("/competency", getCompetencies)
  // .post("/competency", postCompetencies)
  // .get("/competency/:id", getCompetency)
  .listen(process.env.PORT || 8000)

//Some async route functions that get data from the db
async function getFaculties(req, res) {
  const result = await Faculty.find()
  res.send(result)
}

function postFaculties(req, res) {
  let faculties = Array.isArray(req.body) ? req.body : [req.body]
  Faculty.insertMany(faculties, function(error, docs) {
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
  let programs = Array.isArray(req.body) ? req.body : [req.body]
  Program.insertMany(programs, function(error, docs) {
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

async function getClusters(req, res) {
  const result = await Cluster.find()
  res.send(result)
}

async function postClusters(req, res) {
  //Convert to array if only one object was sent.
  let clusters = Array.isArray(req.body) ? req.body : [req.body] //TODO: Move this to middleware
  debug("incoming Clusters:", clusters)
  Cluster.insertMany(clusters, function(error, docs) {
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

async function getModules(req, res) {
  const result = await Module.find()
  res.send(result)
}

async function postModules(req, res) {
  //Convert modules to array if only one module was sent.
  let newModules = Array.isArray(req.body) ? req.body : [req.body] //TODO: Move this to middleware
  debug("incoming modules:", newModules)

  const monModules = newModules.map(module => {
    const newModule = new Module(module)
    debug(module.cluster)
    module.cluster.forEach(clusterId => {
      Cluster.update(
        { _id:clusterId}, 
        { $push: { modules: newModule._id } },
        function(error,docs){
          if(error) {
            console.log(error)
          }
      })
    })
    return newModule
  })

  Module.insertMany(monModules, function(error, docs) {
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

async function getCompetencies(req, res) {
  const result = await Competency.find()
  res.send(result)
}

function postCompetencies(req, res) {
  let competencies = Array.isArray(req.body) ? req.body : [req.body]
  Competency.insertMany(competencies, function(error, docs) {
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
  const result = await Person.find().select({ name: 1 });
  res.send(result)
}

function postPersons(req, res) {
  let persons = Array.isArray(req.body) ? req.body : [req.body]
  Person.insertMany(persons, function(error, docs) {
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

async function getCluster(req, res) {
  let id = req.params.id
  console.log("someone requested /Cluster:id", id)
  const result = await Cluster.find({
    id
  })
  res.send(result)
}

async function getModule(req, res) {
  let id = req.params.id
  console.log("someone requested /Module:id", id)
  const result = await Module.find({
    id
  })
  res.send(result)
}

async function getPerson(req, res) {
  let _id = req.params.id

  console.log("someone requested /Person:id", _id)
  const result = await Person.find({
    _id
  })
  res.send(result)
}

async function getCompetency(req, res) {
  let _id = req.params.id

  console.log("someone requested /Competency:id", _id)
  const result = await Competency.find({
    _id
  })
  res.send(result)
}

async function getModuleTeachers(req, res) {
  let id = req.params.id
  console.log("someone requested /Module:id/teachers", id)
  const module = await Module.findOne({
    id
  })
  console.log("teachers for this module: ", module.teachers)
  const teacherIds = module.teachers.map(teacher => mongoose.Types.ObjectId(teacher))
  console.log(teacherIds)
  const result = await Person.find({ _id: { $in: teacherIds } })
  res.send(result)
}

//Listeners on the database
db.on("error", console.error.bind(console, "MongoDB connection error:"))
db.once("open", function() {
  debug("Connected to database")
})