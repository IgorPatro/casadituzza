import axios from 'axios'
import { decode } from 'js-base64'

const sendIzzyRestRequest = async (request: string) => {
  let isRequestSuccessful = true

  const response = await axios
    .get(`${process.env.IZZYREST_API_URL}api?request=${request}`)
    .then((res) => {
      isRequestSuccessful = true
      return res.data
    })
    .catch((err) => {
      isRequestSuccessful = false
      console.log(err)
      return err
    })

  return {
    data: isRequestSuccessful ? JSON.parse(decode(response)) : null,
    status: isRequestSuccessful ? 200 : 400,
  }
}

export default sendIzzyRestRequest
