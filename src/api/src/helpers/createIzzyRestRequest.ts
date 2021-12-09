import axios from 'axios'
import { sha256 } from 'js-sha256'

const createIzzyRestRequest = async (
  functionNumber: number,
  additionalParameters?: string
) => {
  const date = new Date(
    new Date().toString().split('GMT')[0] + ' UTC'
  ).toISOString()
  const formatedDate = date.substring(0, date.indexOf('.'))
  const user = process.env.IZZYREST_USER
  const password = process.env.IZZYREST_PASSWORD

  const stringToHash = `fid=${functionNumber}${
    additionalParameters ? `&${additionalParameters}` : ''
  }&user=${user}&vc=${formatedDate}&pwd=${password}`
  const hashedString = sha256(stringToHash)

  const finalUrl = `${process.env.IZZYREST_API_URL}api?fid=${functionNumber}${
    additionalParameters ? `&${additionalParameters}` : ''
  }&user=${user}&vc=${formatedDate}&vh=${hashedString}`

  const izzyRestRequest = await axios
    .get(finalUrl)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err.message)
      return err
    })

  return izzyRestRequest
}

export default createIzzyRestRequest
