const { NODE_ENV = 'production' } = process.env
import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${NODE_ENV}` })

import genereateBase64IzzyRestRequest from './helpers/genereateBase64IzzyRestRequest'
import sendIzzyRestRequest from './helpers/sendIzzyRestRequest'
// import replaceSpaces from './helpers/replaceSpaces'
import izzyRestFunctions from './data/izzyRestFunctions'
import defaultOrder from './data/defaultOrder'

const { API_PORT } = process.env

const app = express()
app.use(express.json())

app.get('/api', (_req, res) => {
  return res.send(
    `This is API for casadituzza! We are currently running on ${NODE_ENV} environment.`
  )
})

app.get('/api/version', async (_req, res) => {
  const request = genereateBase64IzzyRestRequest(
    izzyRestFunctions.version,
    'PSID=1'
  )

  const response = await sendIzzyRestRequest(request)
  // There is data and status parameter to handle error

  return res.json(response)
})

app.get('/api/products', async (_req, res) => {
  const request = genereateBase64IzzyRestRequest(
    izzyRestFunctions.productsList,
    'PSID=1'
  )

  const response = await sendIzzyRestRequest(request)
  // There is data and status parameter to handle error

  return res.json(response)
})

app.post('/api/create-order', async (_req, res) => {
  const requestParameter = genereateBase64IzzyRestRequest(
    izzyRestFunctions.updateOrCreateNewOrder,
    `data=${JSON.stringify(defaultOrder)}`
  )

  return res.json({ status: 200, data: requestParameter })
})

app.listen(API_PORT, () =>
  console.log(
    `Server is running at port ${API_PORT} in ${NODE_ENV} environment.`
  )
)
