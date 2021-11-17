import express from 'express'

const PORT = 5000

const app = express()
app.use(express.json())

app.get('/api', (req, res) => {
  return res.json({ response: 'This is API!' })
})

app.get('/api/test', (req, res) => {
  return res.json({ response: 'This is test route!' })
})

app.get('/api/new-route', (req, res) => {
  return res.json({
    response: 'This is new route to test out is pipeline working!',
  })
})

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))
