import NavBar from '../../components/Navbar/Navbar'
import TitleBanner from '../../components/TitleBanner/TitleBanner'
import Index from '../../components/MainPage/Index'
import Footer from '../../components/Footer/Footer'
import UploadModal from '../../components/ModalForm/UploadModal'
import UpdateModal from '../../components/ModalForm/UpdateModal'
import { useState, useEffect } from 'react'
import { Table, Container, Button, Modal, Form, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'
import { faTrashCan, faFileEdit, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Main.scss'

export default function MainPage({
  user,
  setUser,
  showModal,
  setShowModal,
  showUpdate,
  setShowUpdate,
  setShowUpload,
  setShowNewPlaylist,
  showNewPlaylist,
  songs,
  setArtwork,
  formData,
  getRefreshedUser,
  handleChange,
  handleSubmit,
  uploader,
  options
}) {
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
      <NavBar
        page=''
        user={user}
        setUser={setUser}
        setShowModal={setShowModal}
        setShowUpload={setShowUpload}
        setShowUpdate={setShowUpdate}
        setShowNewPlaylist={setShowNewPlaylist}
        showNewPlaylist={showNewPlaylist}
      />
      <TitleBanner
        bannerTitleLight='Song'
        bannerTitleSolid='Library'
        user={user}
        setUser={setUser}
        getRefreshedUser={getRefreshedUser}
        page='main'
        cover='https://i.imgur.com/g0ar3Jv.png'
        description=''
      />

      {showModal
        ? (
          showUpdate
            ? (
              <UpdateModal
                showModal={showModal}
                setShowModal={setShowModal}
                setShowUpdate={setShowUpdate}
                updateSong={updateSong}
                handleChangeUpdate={handleChangeUpdate}
                song={song}
                setUpdatedArtwork={setUpdatedArtwork}
                uploader={uploader}
                options={options}
              />
            )
            : (
              <UploadModal
                showModal={showModal}
                setShowModal={setShowModal}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                formData={formData}
                setShowUpload={setShowUpload}
                setArtwork={setArtwork}
                uploader={uploader}
                options={options}
              />
            )
        )
        : (
          ''
        )}

      <Container className='mt-5  mb-5 overflow-auto' style={{ width: '100%', height: '500px' }}>
        <Table responsive='xl'>
          <thead>
            <tr>
              <th>#</th>
              <th>ARTWORK</th>
              <th>TITLE</th>
              <th>ALBUM</th>
              <th>DATE ADDED</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {songs
              ? (
                <>
                  {songs.map((song, idx) => {
                    return (
                      <tr>
                        <td>{idx + 1}</td>
                        <td>
                          <div className='album-wrapper'>
                            <img
                              className='rounded-0'
                              src={song.artwork}
                              width='70px'
                              height='70px'
                            />
                            <div className='audio-wrapper'>
                              <audio src={song.audio} controls />
                            </div>
                          </div>
                        </td>
                        <td className="song-title">
                          <div className='flex vertical text-left'>
                            <h5 className='main-song-title'>{song.title}</h5>
                            <h6 className='main-artist-title'>{song.artist.join(' • ')}</h6>
                          </div>
                        </td>
                        <td className='main-album-title'>{song.album}</td>
                        <td className='main-date-title'>{song.createdAt.slice(0, 10)}</td>
                        <td>


                          <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                              <FontAwesomeIcon icon={faEllipsisVertical} className='icon' />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="" onClick={() => {
                                deleteSong(song._id)
                              }}><FontAwesomeIcon
                                  icon={faTrashCan}

                                  className='icon'
                                />&nbsp;
                                Remove from Library</Dropdown.Item>
                              {!song.spotify
                                ? (
                                  <Dropdown.Item href="" onClick={() => {
                                    setShowModal(true)
                                    setShowUpdate(true)
                                    setSong(song)
                                    setUpdatedArtwork(song.artwork)
                                  }}>
                                    <FontAwesomeIcon
                                      icon={faFileEdit}

                                      className='icon'
                                    />&nbsp;

                                    Edit Song</Dropdown.Item>
                                )
                                : (
                                  ''
                                )}

                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    )
                  })}
                </>
              )
              : (
                'no songs'
              )}
          </tbody>
        </Table>
      </Container>

      {/* <Index user={user} setUser={setUser} songs={songs} setSongs={setSongs} /> */}
      <Footer />
    </>
  )
}
