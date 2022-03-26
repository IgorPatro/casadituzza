import { sha256 } from 'js-sha256'
import { encode } from 'js-base64'

const genereateBase64IzzyRestRequest = (
  functionNumber: number,
  additionalParameters?: string
): string => {
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

  const requestParemeter = `fid=${functionNumber}${
    additionalParameters ? `&${additionalParameters}` : ''
  }&user=${user}&vc=${formatedDate}&vh=${hashedString}`

  const encodedRequest = encode(requestParemeter)

  return encodedRequest
}

export default genereateBase64IzzyRestRequest
