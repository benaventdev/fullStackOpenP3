const mongoose = require('mongoose');
const username = encodeURIComponent("");
const password = encodeURIComponent("");
let uri = `mongodb+srv://${username}:${password}@cluster0.grl6dmh.mongodb.net/thePhoneBook?retryWrites=true&w=majority`

console.log('connecting to MongoDB')

mongoose.connect(uri)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB: ', error.message)
    })

const contactInfo = new mongoose.Schema({
    id: String,
    name: String,
    number: String,
  })

//Configure que elimine els valors interns de la ddbb
contactInfo.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Contact', contactInfo)