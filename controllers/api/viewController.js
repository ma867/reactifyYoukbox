const SONG_RESOURCE_PATH = '/songs'
const PLAYLIST_RESOURCE_PATH = '/playlists'

const viewController = {

    songIndex(req, res, next) {
        res.render(`songs/Index`, res.locals.data)
    },

    songNew(req, res, next) {
        res.render(`songs/New`)
    },

    songEdit(req, res, next) {
        res.render(`songs/Edit`, res.locals.data)
    },

    songShow(req, res, next) {
        res.render(`songs/Show`, res.locals.data)
    },

    songRedirectHome(req, res, next) {
        res.redirect(SONG_RESOURCE_PATH)
    },

    songRedirectShow(req, res, next) {
        res.redirect(`${SONG_RESOURCE_PATH}/${res.locals.data.song.id}`)
    },

    playlistIndex(req, res, next) {
        res.render(`playlists/Index`, res.locals.data)
    },

    playlistNew(req, res, next) {
        res.render(`playlists/New`, res.locals.data)
    },

    playlistEdit(req, res, next) {
        res.render(`playlists/Edit`, res.locals.data)
    },

    playlistShow(req, res, next) {
        res.render(`playlists/Show`, res.locals.data)
    },

    playlistRedirectHome(req, res, next) {
        res.redirect(PLAYLIST_RESOURCE_PATH)
    },

    playlistRedirectShow(req, res, next) {
        res.redirect(`${PLAYLIST_RESOURCE_PATH}/${res.locals.data.playlist.id}`)
    },
}

module.exports = viewController