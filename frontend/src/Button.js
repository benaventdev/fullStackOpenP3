import deletePerson from "./servicios/deletePerson"

const Button = (({persons, person, setPersons, message}) => {
  
    const handleDelete = (event) => {
        event.preventDefault()
        if (window.confirm(`Delete ${person.name}?`)) {
            deletePerson(person.id).then(
                setPersons(persons.filter(tmp => tmp.id !== person.id))
                )
                message = "user deleted"
        } else {
          console.log("no se ha borrado nada")
        }
      }

      return <button type="submit" onClick={handleDelete} id={person.id} name={person.name}>Delete</button>

})


export default Button