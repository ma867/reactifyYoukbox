const Song = require('../../models/song')
const User = require('../../models/user')

const dataController = {

  index (req, res, next) {
    Song.find({}, (err, foundSongs) => {
      if (err) {
        console.error(err)
        res.status(400).send(err)
      } else {
        // res.send({songs:foundSongs })
        res.locals.data.songs = foundSongs
        next()
      }
    })
  },

  delete (req, res, next) {
    Song.findByIdAndDelete(req.params.id, (err, deletedSong) => {
      if (err) {
        console.error(err)
        res.status(400).send(err)
      } else {
        res.locals.data.song = deletedSong
        next()
      }
    })
  },

  update (req, res, next) {
    Song.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedSong) => {
      if (err) {
        console.error(err)
        res.status(400).send(err)
      } else {
        res.locals.data.song = updatedSong
        next()
      }
    })
  },

  async create (req, res, next) {
    try {
      const user = await User.findById(req.params.userId)
      req.body.userId = req.params.userId
      req.body.artwork === '' ? req.body.artwork = 'https://i.imgur.com/0FUT9eJ.png' : req.body.artwork = req.body.artwork

      Song.create(req.body, (err, createdSong) => {
        if (err) {
          console.error(err)
          res.status(400).send(err)
        } else {
          user.songs.addToSet(createdSong._id)
          user.save()
          res.locals.data.song = createdSong
          next()
        }
      })
    } catch {
      res.status(400).json('request didnt go through')
    }
  },

  show (req, res, next) {
    Song.findById(req.params.id, (err, foundSong) => {
      if (err) {
        console.error(err)
        res.status(400).send(err)
      } else {
        res.locals.data.song = foundSong
        next()
      }
    })
  }

}

const apiController = {
  index (req, res, next) {
    res.json(res.locals.data.songs)
  },
  show (req, res, next) {
    res.json(res.locals.data.song)
  }
}

module.exports = {
  apiController,
  dataController
}
