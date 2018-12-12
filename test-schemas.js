const Faculty = require("./models/faculty")
const Program = require("./models/program")
const Module = require("./models/module")
const Competency = require("./models/competency")
const Person = require("./models/person")
//This fails, I think the syntax is wrong for the type defs in the schemas
// Use this: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#Book_model
const testSchemas = {
  async init() {
    //Create a mock database
    let db = {}
    //Fill it with a faculty if there isn;t one already
    //The reason I wait on the faculty function and then await finding it again
    // is because I want to be able to add extra faculties later and then db.faculty
    // would wait on Faculty.find()
    await this.faculty()
    db.faculty = await Faculty.findOne()
    //console.log("faculty:", db.faculty)
    await this.program()
    db.program = await Program.findOne()
    await this.competency(db)
    db.competencies = await Competency.find()
    //Fill it with a person if there isn't one already
    //console.log(db.faculty)
    await this.person()
    db.persons = await Person.find()
    //console.log(db.persons)
    await this.module(db)
    db.modules = await Module.find()
    //console.log(db.modules)
  },
  async faculty() {
    let faculty = await Faculty.findOne()
    if (faculty) return faculty

    const fdmci = new Faculty({
      id: "fdmci",
      name: [
        {
          language: "nl",
          value: "Digitale Media en Creatieve Industrie"
        },
        {
          language: "en",
          value: "Digital Media and Creative Industry"
        }
      ]
    })
    console.log("New faculty created with id:", fdmci.id)
    await fdmci.save()
    return
  },
  async program() {
    let program = await Program.findOne()
    if (program) return program

    const cmd = new Program({
      id: "cmd-vt",
      name: [
        {
          language: "nl",
          value: "Communicatie en Multimedia Design"
        },
        {
          language: "en",
          value: "Communcation and Multimedia Design"
        }
      ],
      competencies: [],
      faculty: db.faculty
    })
    console.log("New program created with id:", cmd.id)
    await cmd.save()
    return
  },
  async module(db) {
    let module = await Module.findOne()
    if (module) return module
    const designEthics = new Module({
      id: "257651",
      name: [
        {
          language: "nl",
          value: "Design Ethics"
        }
      ],
      description:
        "Today, designed objects, services and processes surround us: design has the potential to improve or worsen our lives and the world we live in and designers, by playing a key role in the development of this designed world, are in a position to have a significant influence on people, society, culture and the world. Sometimes this influence may not have moral implications, but on occasions it will. The design ethics module will examine this issue by asking and examining possible answers to the following questions:",
      year: "2018-2019",
      credits: 3,
      start: null,
      end: null,
      languages: ["nl"],
      coordinators: db.persons[0],
      coordinatorsSummary: "awesome",
      teachers: db.persons[0],
      teachersSummary: "awesometeachers",
      competencies: db.competencies,
      competenciesSummary: "research",
      objectivesSummary: "Objective! Over ruled!",
      program: db.program,
      faculty: db.faculty
    })
    //console.log(designEthics.coordinators)
    await designEthics.save(function(err, module) {
      if (err) return console.error(err)
      return module
    })
    console.log("New Module created with desc:", designEthics.description)
    return
  },
  async competency(db) {
    let competency = await Competency.findOne()
    if (competency) return competency

    const evalueren = new Competency({
      id: "4",
      name: [
        {
          language: "nl",
          value: "Evalueren"
        },
        {
          language: "en",
          value: "Evaluation"
        }
      ],
      description: "",
      programs: db.program
    })
    console.log("New competency created with id:", evalueren.id)
    await evalueren.save()
    return
  },
  async person() {
    let person = await Person.findOne()
    if (person) return person

    const laurens = new Person({
      id: "aarnl",
      name: "Laurens A"
    })
    await laurens.save()
    console.log("New Person created with name:", laurens.name)
    return
  }
}
module.exports = testSchemas