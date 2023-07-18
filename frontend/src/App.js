import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Notification from './Notification'
import Persons from "./Persons"
import './App.css'

function App() {
  const [newFilter, setNewFilter] = useState("")
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(``)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter setNewFilter={setNewFilter} />
      <h2>Add a new:</h2>
      <PersonForm persons={persons} setPersons={setPersons} setMessage={setMessage}/>
      <Persons persons={persons} newFilter={newFilter} setPersons={setPersons} setMessage={setMessage}/>
    </div>
  );
}

export default App;