import getPersons from './servicios/getPersons'
import { useEffect } from 'react'
import Button from './Button'
const Persons = ({ persons, setPersons, newFilter, setMessage }) => {
  
  useEffect (() => {
    getPersons()
        .then((data) => {
            setPersons(data)
        })
  }, [setPersons])
    
  return (
    <div>
      <h2>Numbers</h2>
      {persons
        .filter(person => {
          if (newFilter === "") return person
          else return person.name.toLowerCase().includes(newFilter.toLowerCase())
        })
        .map((person) => {
          return(
            <div key={person.id}>
              {person.name} {person.number}
              <div>
                <Button setPersons={setPersons} persons={persons} person={person} />
              </div>
              <br/>
            </div>
          )
        }) 
      }
    </div>
  )
}

export default Persons