const Faculty = require('./models/faculty')
const Person = require('./models/person')
const Course = require('./models/course')
//This fails, I think the syntax is wrong for the type defs in the schemas
// Use this: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#Book_model
const testSchemas = {
	async init(){
		//Create a mock database
		let db = {}
		//Fill it with a faculty if there isn;t one already
		//The reason I wait on the faculty function and then await finding it again
		// is because I want to be able to add extra faculties later and then db.faculty
		// would wait on Faculty.find()
		await this.faculty()
		db.faculty = await Faculty.findOne()
		//Fill it with a person if there isn't one already
		console.log(db.faculty)
		await this.person()
		db.persons = await Person.find()
		//console.log(db.persons)
		await this.course(db)
		db.courses = await Course.find()
		console.log(db.courses)
	},
	async faculty(){
		let faculty = await Faculty.findOne()
		if (faculty) return faculty

		const fdmci = new Faculty(
		{"id": "fdmci",
  		"name": [
    		{"language": "nl", "value": "Digitale Media en Creatieve Industrie"},
    		{"language": "en", "value": "Digital Media and Creative Industry"}
  		]
  		})
  		console.log("New faculty created with id:",fdmci.id)
  		await fdmci.save()
		return Faculty.findOne()
	},
	async person(){
	  	let person = await Person.findOne()
		if (person) return person

	  	const laurens = new Person({ id: 'aarnl', name: 'Laurens A' })
		await laurens.save()
		console.log("New Person created with name:",laurens.name)
		return Person.find()

	  },
	async course(db){
		let course = await Course.findOne()
		if (course) return course
		const designEthics = new Course(
	  	{
		id: "257651",
	  	name: [{
	      "language": "nl",
	      "value": "Design Ethics"
	    }],
	  	description: "Today, designed objects, services and processes surround us: design has the potential to improve or worsen our lives and the world we live in and designers, by playing a key role in the development of this designed world, are in a position to have a significant influence on people, society, culture and the world. Sometimes this influence may not have moral implications, but on occasions it will. The design ethics module will examine this issue by asking and examining possible answers to the following questions:",
		year: "2018-2019",
	  	credits: 3,
		start: null,
		end: null,
	  	languages: ["nl"],
		coordinators: db.persons[0],
		coordinatorsSummary: "awesome",
		teachers: db.persons[0],
		teachersSummary: "awesometeachers",
		competencies: [],
		competenciesSummary: "research",
		objectivesSummary: "Objective! Over ruled!",
		program: db.persons[0],
		faculty: db.faculty
		})
		//console.log(designEthics.coordinators)
		await designEthics.save(function (err, course) {
			if (err) return console.error(err)
			return course
		})
		console.log("New Course created with desc:",designEthics.description)
		return Course.findOne()
	}
}
module.exports = testSchemas;