import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { PORT, mongoDBURL } from './config.js'
import booksRoute from './routes/booksRoute.js'

const app = express()

app.use(cors({
	origin: 'http://localhost:5173',
	methods: ['GET', 'POST', 'PATCH', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization']
}))


app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/books', booksRoute)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(err => console.log(err))
