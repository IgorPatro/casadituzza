import express from 'express'
import func from './func'

const PORT = 5000

const app = express()
app.use(express.json())

app.get('/api', (req, res) => {
  func()

  return res.json({ response: func() })
})

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))
