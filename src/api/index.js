import express from 'express'

const PORT = 5000

const app = express()
app.use(express.json())

app.get('/api/test', (req, res) => {
  return res.json({ response: 'This is my response mate!' })
})

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))
