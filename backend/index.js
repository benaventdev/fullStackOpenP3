const express = require("express")
const morgan = require("morgan")
const fs = require('fs')
const app = express()
const path = require('path')
const cors = require('cors')
const Contact = require('./models/contact')

let persons = []
Contact.find({}).then(result => {
    persons = result
})

//Obtener datos de la base de datos

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', { stream: accessLogStream }))
app.use(cors())
app.use((req, res, next) => {
    console.log(req.method),
    console.log(req.path),
    console.log(req.body), 
    console.log('--------'),
    next()
})
app.use(express.static('build'))

morgan.token('body', req => {
    return JSON.stringify(req.body)
})
const token = morgan.token('type', function (req, res) { return req.headers['content-type'] })

app.get("/api/persons", (request, response) => {
    Contact.find({}).then(result => {
        response.json(result);
    })
})

app.get("/api/persons/:id", (request, response, next) => {
    Contact.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end() 
      }
    })
    .catch(error => next(error))
})

app.get("/info", (request, response) => {
    const date = new Date()
    console.log('El valor de persons es:', persons.length)
    response.send(`<p>Phonebook has info for ${persons.length} people</p> ${date}`)
})

app.put("/api/persons/:id", (request, response) => {
    Contact.findOne({ number: request.body.number }).then( person => {
        console.log("valor de person: ",person)
        console.log("valor del header: ", request.body.name)
        person.name = request.body.name 
        person.save().then(s => {
            console.log("saved new name")
        })
        .catch(error => next(error))
    })
    
})

app.delete("/api/persons/:id", (request, response) => {
    Contact.findById(request.params.id).then( contact => {
        if(contact) {
            Contact.deleteOne(contact._id).then(
                response.status(200).end()
            )
            .catch(error => next(error))
        }
    })
    .catch((error) => {
        console.error(error)
    })
})

app.post("/api/persons", (request, response) => {
    const person = request.body
    if (!person.name || !person.number || !person) {
        response.status(400).json({
            error: "person.name or person.number is missing"
        })
        .catch(error => next(error))
    }

    const newPerson = new Contact ({
        name: person.name,
        number: person.number
    })

    if (persons.map(person => person.name).includes(person.name)) {
        response.status(400).json({
            error: "name must be unique"
        })
    } else {
        newPerson.save().then(savedPerson => {
            console.log('number saved')
          })
          .catch(error => next(error))
    }
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})