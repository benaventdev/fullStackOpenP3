import axios from "axios";

const getPersons = () => {
    return axios
        .get('http://localhost:3001/api/persons')
        .then((response) => {
            const { data } = response;
            return data;
        })
}

export default getPersons