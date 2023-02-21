import axios from "axios"

const BASE_URL = 'http://localhost:3000'
export const  getDbList = async () =>{
return await axios.get(`${BASE_URL}/metadatas`).then(response => response).catch(err => err)
}