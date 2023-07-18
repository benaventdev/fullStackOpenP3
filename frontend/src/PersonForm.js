import { useState } from "react"
import addPerson from "./servicios/addPerson"
import modifyPerson from "./servicios/modifyPerson"
import { v4 as uuidv4 } from 'uuid';

const PersonForm = ({ persons, setPersons, setMessage }) => {
    const [newName, setNewName] = useState("")
    const [newNumber, setNewNumber] = useState("")

    const handleName = (event) => {
        setNewName(event.target.value)
    }

    const handleNumber = (event) => {
        setNewNumber(event.target.value)
    }

    const handlePerson = (event) => {
        const newPerson = {
            name: newName,
            number: newNumber,
            id: uuidv4()
        }

        let existentUser = persons.find((person) => {
            if (newPerson.number === person.number) {
                return person;
            } else return 0;
        })
        if (existentUser) {
            existentUser.name = newPerson.name
            modifyPerson(newPerson, existentUser);
        } else {
            persons.find((person) => {
                return (newPerson.name.toLocaleLowerCase() === person.name.toLocaleLowerCase())
            })
                ? setMessage(`Error, ${newPerson.name} ya existe`)
                : addPerson(newPerson)
                    .then(() => {
                        setPersons(persons.concat(newPerson))
                        setMessage(`Añadido ${newPerson.name} con el número ${newPerson.number}`)
                        setNewNumber("")
                        setNewName("")
                    })
        }
    }

    return (
        <form onSubmit={handlePerson}>
            <div> name: <input onChange={handleName} value={newName} /> </div>
            <div> number: <input onChange={handleNumber} value={newNumber} /> </div>
            <div> <button type="submit">add</button> </div>
        </form>
    )
}

export default PersonForm