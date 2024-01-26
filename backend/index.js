import express from 'express'
import mongoose from 'mongoose'
import { PORT, mongoDBURL } from './config.js'
import { Book } from './models/bookModel.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/books', async (req, res) => {
  try {
    const books = await Book.find({})
    res.status(200).json({
      count: books.length,
      books: books
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error ' + error.message })
  }
})

app.get('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params

    const book = await Book.findById(id)
    res.status(200).json(book)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error ' + error.message })
  }
})

app.patch('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params

    const book = await Book.findByIdAndUpdate(id, req.body)

    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }

    return res.status(200).json({ message: 'Book updated' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server Error ' + error.message })
  }
})

app.post('/api/books', async (req, res) => {
  try {
    console.log(req.body)
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .json({ message: 'Please fill all required fields' })
    } else {
      const newBook = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear
      }
      const createdBook = await Book.create(newBook)
      res.status(201).send(createdBook)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error ' + error.message })
  }
})

app.delete('/api/books/:id', async (req, res) => {
  try {
    const { id } = req.params

    const book = await Book.findByIdAndDelete(id)

    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }

    return res.status(200).json({ message: 'Book deleted' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server Error ' + error.message })
  }
})

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch(err => console.log(err))
