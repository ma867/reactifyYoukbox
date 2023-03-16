const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: 'Just an awesome playlist by an equally awesome person' },
  artwork: { type: String, default: 'https://i.imgur.com/0FUT9eJ.png' },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

})

const Playlist = mongoose.model('Playlist', playlistSchema)

module.exports = Playlist
