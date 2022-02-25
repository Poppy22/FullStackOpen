const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://usernameFSO:${password}@cluster0.rh19d.mongodb.net/phonebookApp?retryWrites=true&w=majority`
mongoose.connect(url)

const peopleSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', peopleSchema)

const person = new Person({
  name: name,
  number: number,
})

if (process.argv.length == 5) {
  person.save().then(result => {
    console.log(`Added ${name}, number ${number}, to phonebook!`)
    mongoose.connection.close()
  })
} else {
  Person
    .find({})
    .then(persons => {
      persons.forEach(p => {
        console.log(`${p.name}, ${p.number}`)
      })
      mongoose.connection.close()
  })
}
