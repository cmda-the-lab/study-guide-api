const Person = require('./models/person')

const testSchemas = {
  person() {
  	const laurens = new Person({ id: '1', name: 'Laurens A' })
	console.log(laurens.name)

	laurens.save(function (err, person) {
		if (err) return console.error(err)
		console.log("Person: ", person)
	})
  }
}

module.exports = testSchemas;