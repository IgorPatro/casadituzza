import axios from 'axios'
import { sha256 } from 'js-sha256'

const createIzzyRestRequest = async (functionNumber: number) => {
  const date = new Date(
    new Date().toString().split('GMT')[0] + ' UTC'
  ).toISOString()
  const formatedDate = date.substring(0, date.indexOf('.'))
  const user = process.env.IZZYREST_USER
  const password = process.env.IZZYREST_PASSWORD

  const stringToHash = `fid=${functionNumber}&user=${user}&vc=${formatedDate}&pwd=${password}`
  const hashedString = sha256(stringToHash)

  const finalUrl = `${process.env.IZZYREST_API_URL}/api?fid=${functionNumber}&user=${user}&vc=${formatedDate}&vh=${hashedString}`

  const izzyRestPing = await axios
    .get(finalUrl)
    .then((res) => res.data)
    .catch((err) => err)

  console.log(finalUrl)

  return izzyRestPing
}

export default createIzzyRestRequest
