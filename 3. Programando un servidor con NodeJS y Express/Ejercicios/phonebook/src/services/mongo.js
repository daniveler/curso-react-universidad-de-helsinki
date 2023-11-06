const mongoose = require('mongoose')

if (process.argv.length < 2) {
  console.log('ERROR: Incorrect format. Example: \"node mongo.js <password> <name> <phone_number>\"')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://daniel01velerdas:${password}@cluster0.4yzjqrj.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  console.log("phonebook:")

  Person.find().then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.phoneNumber}`)
    })
    mongoose.connection.close()
  })
}
else {
  const name = process.argv[3]
  const phoneNumber = process.argv[4]

  const person = new Person({
    name: name,
    phoneNumber: phoneNumber,
  })

  person.save().then(result => {
    console.log(`Added ${name} with number: ${phoneNumber} to the phonebook`)
    mongoose.connection.close()
  })
} 
