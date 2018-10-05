const Person = require('./models/person')
const Course = require('./models/course')
//This fails, I think the syntax is wrong for the type defs in the schemas
// Use this: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#Book_model
const testSchemas = {
	person(){
	  	const laurens = new Person({ id: 'aarnl', name: 'Laurens A' })
		console.log(laurens.name)

		laurens.save().then(person => this.course(person))
	  },
	course(person){
		console.log("person:", person)
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
		coordinators: [person._id],
		coordinatorsSummary: "awesome",
		teachers: [person._id],
		teachersSummary: "awesometeachers",
		competencies: [],
		competenciesSummary: "research",
		objectivesSummary: "Objective! Over ruled!",
		program: person._id,
		faculty: person._id
		})
		console.log(designEthics.coordinators)
		designEthics.save(function (err, course) {
			if (err) return console.error(err)
			return course
		})
	}
}
module.exports = testSchemas;