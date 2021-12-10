const { NODE_ENV = 'production' } = process.env
import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${NODE_ENV}` })

import createIzzyRestRequest from './helpers/createIzzyRestRequest'
import replaceSpaces from './helpers/replaceSpaces'
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
  const response = await createIzzyRestRequest(
    izzyRestFunctions.version,
    'PSID=1'
  )

  return res.json(response)
})

app.get('/api/products', async (_req, res) => {
  const response = await createIzzyRestRequest(
    izzyRestFunctions.productsList,
    'PSID=1'
  )

  return res.json(response)
})

app.post('/api/add-order', async (_req, res) => {
  const response = await createIzzyRestRequest(
    izzyRestFunctions.updateOrCreateNewOrder,
    `data=${replaceSpaces(JSON.stringify(defaultOrder))}`
  )

  return res.json(response)
})

app.listen(API_PORT, () =>
  console.log(
    `Server is running at port ${API_PORT} in ${NODE_ENV} environment.`
  )
)
