import axios from "axios"

const deletePerson = (id) => {
    const url = "http://localhost:3001/api/persons/".concat(id)
    return axios
        .delete(url)
}

export default deletePerson