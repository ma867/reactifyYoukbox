const Playlist = require('../../models/playlist')
const User = require('../../models/user')

const dataController = {

  index (req, res, next) {
    Playlist.find({}, (err, foundPlaylists) => {
      if (err) {
        console.error(err)
        res.status(400).send(err)
      } else {
        res.locals.data.playlists = foundPlaylists
        next()
      }
    }).populate('songs')
  },

  delete (req, res, next) {
    Playlist.findByIdAndDelete(req.params.id, (err, deletedPlaylist) => {
      if (err) {
        console.error(err)
        res.status(400).send(err)
      } else {
        res.locals.data.playlist = deletedPlaylist
        next()
      }
    })
  },

  update (req, res, next) {
    Playlist.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedPlaylist) => {
      if (err) {
        console.error(err)
        res.status(400).send(err)
      } else {
        res.locals.data.playlist = updatedPlaylist
        next()
      }
    })
  },

  async create (req, res, next) {
    try {
      const user = await User.findById(req.params.userId)
      req.body.userId = req.params.userId
      req.body.artwork === '' ? req.body.artwork = 'https://i.imgur.com/0FUT9eJ.png' : req.body.artwork = req.body.artwork

      Playlist.create(req.body, (err, createdPlaylist) => {
        if (err) {
          console.error(err)
          res.status(400).send(err)
        } else {
          user.playlists.addToSet(createdPlaylist._id)
          user.save()
          res.locals.data.playlist = createdPlaylist
          next()
        }
      }).populate('songs')
    } catch {
      res.status(400).json("request didn't go through")
    }
  },

  show (req, res, next) {
    Playlist.findById(req.params.id).populate('songs').exec((err, foundPlaylist) => {
      if (err) {
        console.error(err)
        res.status(400).send(err)
      } else {
        res.locals.data.playlist = foundPlaylist
        next()
      }
    })
  }

}

const apiController = {
  index (req, res, next) {
    res.json(res.locals.data.playlists)
  },
  show (req, res, next) {
    res.json(res.locals.data.playlist)
  }
}

module.exports = {
  apiController,
  dataController
}
