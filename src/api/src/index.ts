const { NODE_ENV = 'production' } = process.env
import express from 'express'
import dotenv from 'dotenv'
dotenv.config({ path: `.env.${NODE_ENV}` })

import createIzzyRestRequest from './helpers/createIzzyRestRequest'

const { API_PORT } = process.env

const app = express()
app.use(express.json())

app.get('/', (_req, res) => {
  return res.send(
    `This is API for casadituzza! We are currently running on ${NODE_ENV} environment.`
  )
})

app.get('/api', (_req, res) => {
  return res.json({
    izzyRestUrl: `${process.env.IZZYREST_API_URL}`,
    env: NODE_ENV,
  })
})

app.get('/api/izzyrest', async (_req, res) => {
  const response = await createIzzyRestRequest(10)
  // await createIzzyRestRequest(10)

  return res.json(response)
})

app.listen(API_PORT, () =>
  console.log(
    `Server is running at port ${API_PORT} in ${NODE_ENV} environment.`
  )
)
