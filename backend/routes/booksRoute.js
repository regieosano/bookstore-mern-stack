import express from 'express'
import { Book } from '../models/bookModel.js'

const router = express.Router()

router.get('/', async (req, res) => {
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

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const book = await Book.findById(id)
    res.status(200).json(book)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Server Error ' + error.message })
  }
})

router.patch('/:id', async (req, res) => {
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

router.post('/', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
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

export default router
