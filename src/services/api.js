import axios from "axios"

//Usando o axios faz o link entre o back e o front end
const api = axios.create({baseURL: "http://localhost:8080"})

export default api