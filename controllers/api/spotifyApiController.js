require('dotenv').config()
const btoa = require('btoa')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const getToken = require('../getToken')
const express = require('express')
const router = express.Router()

router.use(getToken)

router.post('/', (req, res, next) => {

    res.locals.data.artist = req.body.artist
    res.locals.data.song = req.body.song
    next()

}, async (req, res, next) => {

    try {
        const artist = res.locals.data.artist
        const song = res.locals.data.song
        const result = await fetch(`https://api.spotify.com/v1/search?q=track:${song}%20artist:${artist}&limit=20&type=track&include_external=audio`, {
            method: "GET",
            headers: {
                Authorization: 'Bearer ' + res.locals.data.token
            }
        })
        const data = await result.json()
        res.locals.data.track = data.tracks.items
        next()
    }
    catch (error) {
        console.error(error)
        res.send(error)
    }
},
    (req, res) => {
        // res.send(res.locals.data.track)
        let tracks = res.locals.data.track
        let results = []
        for (let i = 0; i < tracks.length; i++) {
            let songInfo = [
                res.locals.data.track[i].name,
                res.locals.data.track[i].album.name,
                res.locals.data.track[i].album.artists[0].name,
                res.locals.data.track[i].album.images[0].url,
                res.locals.data.track[i].preview_url

            ]
            results.push(songInfo)



        }
        console.log(results)
        res.locals.data.tracks = results

        res.render(`search/Index.jsx`, res.locals.data)



    })




module.exports = router