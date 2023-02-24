
import NavBar from "../../components/Navbar/Navbar"
import TitleBanner from "../../components/TitleBanner/TitleBanner"
import Index from "../../components/MainPage/Index"
import Footer from "../../components/Footer/Footer"
import UploadModal from "../../components/ModalForm/UploadModal"
import UpdateModal from "../../components/ModalForm/UpdateModal"
import { useState, useEffect } from "react"
import { Table, Container, Button, Modal, Form } from "react-bootstrap"
import { faTrashCan, faFileEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'





export default function MainPage({ setPlaylistSongs, playlistSongs, user, setUser, showModal, setShowModal, showUpdate, setShowUpdate, setShowUpload, showUpload, setShowNewPlaylist, showNewPlaylist, songs,
  setSongs,
  artwork,
  setArtwork,
  formData,
  setFormData,
  getRefreshedUser,
  handleChange,
  handleSubmit,
  uploader,
  options,
  playlistArtwork,
  setPlaylistArtwork,
  playlistFormData,
  setPlaylistFormData,
  handlePlaylistChange,
  handlePlaylistSubmit }) {


  const [updatedArtwork, setUpdatedArtwork] = useState('')
  const [song, setSong] = useState(null)


  const updateSong = async (id, updatedData) => {
    try {
      const response = await fetch(`/api/songs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...updatedData, artwork: updatedArtwork })
      })
      const data = await response.json()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteSong = async (id) => {
    try {
      await fetch(`/api/songs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      getRefreshedUser()
    } catch (error) {
      console.error(error)
    }
  }



  const handleChangeUpdate = (evt) => {
    setSong({ ...song, [evt.target.name]: evt.target.value })

  }


  useEffect(() => {
    getRefreshedUser()
  }, [])

  return (
    <>


      <NavBar page="" user={user} setUser={setUser} setShowModal={setShowModal} setShowUpload={setShowUpload} setShowUpdate={setShowUpdate} setShowNewPlaylist={setShowNewPlaylist} showNewPlaylist={showNewPlaylist} />
      <TitleBanner bannerTitleLight="Song" bannerTitleSolid="Library" user={user} setUser={setUser} getRefreshedUser={getRefreshedUser}
        page="main"
        cover="https://i.imgur.com/g0ar3Jv.png"
        description="" />

      {showModal ?

        showUpdate ?

          <UpdateModal showModal={showModal} setShowModal={setShowModal} setShowUpdate={setShowUpdate} updateSong={updateSong} handleChangeUpdate={handleChangeUpdate} song={song} setUpdatedArtwork={setUpdatedArtwork} uploader={uploader} options={options} />

          :


          <UploadModal showModal={showModal} setShowModal={setShowModal} handleSubmit={handleSubmit} handleChange={handleChange} formData={formData} setShowUpload={setShowUpload} setArtwork={setArtwork} uploader={uploader} options={options} />

        : ""}



      <Container className="mt-5  mb-5">

        <Table responsive="lg">
          <thead>
            <tr>
              <th>#</th>
              <th>ARTWORK</th>
              <th>TITLE</th>
              <th>ALBUM</th>
              <th>DATE ADDED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>

            {
              songs ?

                <>
                  {
                    songs.map((song, idx) => {
                      return (
                        <tr>
                          <td>{idx + 1}</td>
                          <td>
                            <div className="album-wrapper">
                              <img className="rounded-0" src={song.artwork} width="100px" height="100px" />
                              <div className="audio-wrapper">
                                <audio src={song.audio} controls></audio>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="flex vertical text-left">
                              <h5 className="title">{song.title}</h5>
                              <h6>{
                                song.artist.join(" • ")
                              }</h6>
                            </div>

                          </td>
                          <td>{song.album}</td>
                          <td>{song.createdAt.slice(0, 10)}</td>
                          <td>
                            <div className="flex horizontal space-between" >

                              <FontAwesomeIcon icon={faTrashCan} onClick={() => { deleteSong(song._id) }} className="icon" />
                              {
                                !song.spotify ?
                                  <FontAwesomeIcon icon={faFileEdit} onClick={() => { setShowModal(true); setShowUpdate(true); setSong(song); setUpdatedArtwork(song.artwork) }} className="icon" />
                                  : ""


                              }
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  }
                </> :
                "no songs"


            }

          </tbody>
        </Table>



      </ Container>














      {/* <Index user={user} setUser={setUser} songs={songs} setSongs={setSongs} /> */}
      <Footer />

    </>




  )
}