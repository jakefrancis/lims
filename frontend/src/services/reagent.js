import axios from 'axios'
const baseUrl = '/api/reagents'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

export default {setToken, getAll}