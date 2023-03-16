import { useEffect, useState, useRef } from 'react'
import { Col, Row, Container, Button, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import NavBar from '../../components/Navbar/Navbar'
import TitleBanner from '../../components/TitleBanner/TitleBanner'

export default function SearchPage({ user, setUser }) {
  const params = useParams()
  const artistRef = useRef(null)
  const song = params.songTitle

  const [foundSongs, setFoundSongs] = useState([])
  const [foundSongsAudio, setFoundSongsAudio] = useState([])
  const [foundAlbums, setFoundAlbums] = useState([])
  const [ids, setIds] = useState('')

  const [artwork, setArtwork] = useState('https://i.imgur.com/0FUT9eJ.png')

  const addMarqueeOnMouseOver = () => {
    artistRef.current.classList.add("red")
  }
  const removeMarqueeOnMouseLeave = () => {
    artistRef.current.classList.remove('cssmarquee')
  }

  const addSong = async (songData) => {
    try {
      const response = await fetch(`/api/songs/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...songData })
      })
      const data = await response.json()
    } catch (error) {
      console.error(error)
    }
  }

  const findSong = async () => {
    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/search/?q=${song}&type=multi&offset=0&limit=20&numberOfTopResults=5`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '721e6a3327mshe34359d3563d7e7p1f7ccejsn1d1230e5e489',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      }

      )
      const data = await response.json()
      setFoundSongs(data.tracks.items)
      setFoundAlbums(data.albums.items)
      let ids = ''
      data.tracks.items.map((foundSong, idx) => {
        if (idx === data.tracks.items.length - 1) {
          ids += foundSong.data.id
        } else {
          ids += foundSong.data.id + ','
        }
      })
      setIds(ids)
      findSongAudio(ids)
    } catch (error) {
      console.error(error)
    }
  }

  const findSongAudio = async (ids) => {
    try {
      const response = await fetch(
        `https://spotify23.p.rapidapi.com/tracks/?ids=${ids}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '721e6a3327mshe34359d3563d7e7p1f7ccejsn1d1230e5e489',
          'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
      }

      )
      const data = await response.json()
      setFoundSongsAudio(data.tracks)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    findSong()
  }, [song])
  return (
    <>
      <NavBar page='' user={user} setUser={setUser} />
      <TitleBanner bannerTitleLight='Search' bannerTitleSolid='Track' user={user} setUser={setUser} />

      <Container className='mb-3 mt-3 '>
        <Row className='justify-content-md-center'>
          {
            foundSongs && foundSongsAudio

              ? foundSongs.map((foundSong, idx) => {
                const title = foundSong.data.name
                const artists = foundSong.data.artists.items
                const artistsNames = []
                const album = foundSong.data.albumOfTrack.name
                const artwork = foundSong.data.albumOfTrack.coverArt.sources[0].url
                const audio = foundSongsAudio[idx]?.preview_url
                return (
                  <Col xs={12} md={6} lg={3} className='mb-3' key={idx}>
                    <Card className='shadow-sm border-0 rounded-0' style={{ width: '100%' }}>

                      <div className='album-wrapper'>
                        <Card.Img variant='top' className='rounded-0' src={artwork} />
                        <div className='audio-wrapper'>
                          <audio src={audio} controls />
                        </div>
                      </div>
                      <Card.Body>
                        <Card.Title className='card-text-custom'>{title}</Card.Title>
                        <Card.Text className='card-text-custom'>
                          {album}

                        </Card.Text >

                        <Card.Text className='card-text-custom' >

                          <p>

                            {

                              artists.map((artist, idx) => {
                                artistsNames.push(artist.profile.name)

                                if (idx !== artists.length - 1)
                                  return (
                                    <>
                                      {artist.profile.name + ", "}
                                    </>
                                  )
                                else {
                                  return (
                                    <>
                                      {artist.profile.name}
                                    </>

                                  )
                                }
                              })

                            }

                          </p>



                        </Card.Text>
                        <Button className='action' onClick={() => { addSong({ title, album, artist: artistsNames, artwork, audio, spotify: true }) }} variant='primary'>Add to Library</Button>
                      </Card.Body>
                    </Card>
                  </Col>

                )
              })

              : 'no found songs try again'
          }
        </Row>
      </Container>

      FOUND SONGS
    </>
  )
}
