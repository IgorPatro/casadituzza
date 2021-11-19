import express from 'express'
import func from './func'

const PORT = 5000

const app = express()
app.use(express.json())

app.get('/', (_req, res) => {
  return res.send('This is API home route!')
})

app.get('/api', (_req, res) => {
  return res.json({ response: func() })
})

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))
