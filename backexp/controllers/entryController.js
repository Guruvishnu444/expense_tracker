import Entry from '../models/Entry.js'

export async function getEntries(req, res, next) {
  try {
    const entries = await Entry.find({ userId: req.user.id }).sort({ date: -1, createdAt: -1 })
    res.json(entries)
  } catch (error) {
    next(error)
  }
}

export async function createEntry(req, res, next) {
  try {
    const { type, category, amount, note, date } = req.body
    if (!type || !category || !amount || !date) {
      return res.status(400).json({ message: 'Missing required entry fields.' })
    }

    const entry = await Entry.create({
      userId: req.user.id,
      type,
      category,
      amount,
      note: note || '',
      date
    })

    res.status(201).json(entry)
  } catch (error) {
    next(error)
  }
}

export async function deleteEntry(req, res, next) {
  try {
    const entry = await Entry.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found.' })
    }
    res.json({ message: 'Deleted' })
  } catch (error) {
    next(error)
  }
}
