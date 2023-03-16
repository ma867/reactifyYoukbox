import TitleBanner from '../../components/TitleBanner/TitleBanner'
import NewPlaylistModal from '../../components/ModalForm/NewPlaylistModal'
import NavBar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import UpdatePlaylistModal from '../../components/ModalForm/UpdatePlaylistModal'
import NotFoundBanner from '../../components/NotFoundBanner/NotFoundBanner'
import Search from '../../components/Search/Search'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Table, Container, Button, Modal, Form, Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap'
import { faTrashCan, faFileEdit, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function PlaylistPage({
    showSearch,
    setShowSearch,
    showUpdatePlaylist,
    setShowUpdatePlaylist,
    user,
    getUser,
    setUser,
    showModal,
    setShowModal,
    setShowUpdate,
    setShowUpload,
    setShowNewPlaylist,
    showNewPlaylist,
    songs,
    setSongs,
    uploader,
    options,
    setPlaylistArtwork,
    playlistFormData,
    handlePlaylistChange,
    handlePlaylistSubmit,
    playlistSongs,
    setPlaylistSongs,
}) {
    const params = useParams()
    const navigate = useNavigate()
    const [playlist, setPlaylist] = useState([])
    const [updatedArtwork, setUpdatedArtwork] = useState(playlist?.artwork)

    const playlistId = params.id

    const getPlaylist = async () => {
        try {
            const response = await fetch(`/api/playlists/${playlistId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'

                }
            })
            const data = await response.json()
            setPlaylist(data)
            setSongs(data.songs)
        } catch (error) {
            console.error(error)
        }
    }
    const deletePlaylist = async (id) => {
        try {
            await fetch(`/api/playlists/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            navigate('/playlists')
        } catch (error) {
            console.error(error)
        }
    }

    const updatePlaylistSongs = async (id, songId) => {
        try {
            const copySongs = [...songs]
            copySongs.splice(copySongs.indexOf(songId), 1)
            setSongs(copySongs)
            console.log(songs)

            const response = await fetch(`/api/playlists/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ songs: copySongs })
            })
            const data = await response.json()
            setPlaylist(data)
        } catch (error) {
            console.error(error)
        }
    }

    const updatePlaylistInfo = async (id, updatedData) => {
        try {
            const response = await fetch(`/api/playlists/${id}`, {
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

    const handleChangeUpdate = (evt) => {
        setPlaylist({ ...playlist, [evt.target.name]: evt.target.value })
    }

    useEffect(() => {
        getPlaylist()
    }, [])

    return (
        <>
            <NavBar
                page='playlist'
                user={user}
                setUser={setUser}
                setShowModal={setShowModal}
                setShowUpload={setShowUpload}
                setShowUpdate={setShowUpdate}
                setShowNewPlaylist={setShowNewPlaylist}
                showNewPlaylist={showNewPlaylist}
            />

            <TitleBanner
                playlistLength={playlist?.songs?.length}
                bannerTitleLight=''
                bannerTitleSolid={playlist?.title}
                user={user}
                setUser={setUser}
                getUser={getUser}
                page='playlist'
                cover={playlist?.artwork}
                description={playlist?.description}
                setShowModal={setShowModal}
                setShowUpdatePlaylist={setShowUpdatePlaylist}
                deletePlaylist={deletePlaylist}
                playlistId={playlistId}


            />
            {/* <Button onClick={() => { setShowModal(true); setShowUpdatePlaylist(true) }}>Edit</Button> */}
            {showModal
                ? (
                    showNewPlaylist
                        ? (
                            <NewPlaylistModal
                                showUpdatePlaylist={showUpdatePlaylist}
                                setShowUpdatePlaylist={setShowUpdatePlaylist} setPlaylistSongs={setPlaylistSongs} playlistSongs={playlistSongs} songs={songs} showModal={showModal} setShowModal={setShowModal} handlePlaylistSubmit={handlePlaylistSubmit} handlePlaylistChange={handlePlaylistChange} playlistFormData={playlistFormData} setShowNewPlaylist={setShowNewPlaylist} setPlaylistArtwork={setPlaylistArtwork} uploader={uploader} options={options}
                            />
                        )
                        : <UpdatePlaylistModal
                            setUpdatedArtwork={setUpdatedArtwork} updatedArtwork={updatedArtwork} handleChangeUpdate={handleChangeUpdate} updatePlaylistInfo={updatePlaylistInfo} playlist={playlist} showUpdatePlaylist={showUpdatePlaylist}
                            setShowUpdatePlaylist={setShowUpdatePlaylist} setPlaylistSongs={setPlaylistSongs} playlistSongs={playlistSongs} songs={songs} showModal={showModal} setShowModal={setShowModal} handlePlaylistSubmit={handlePlaylistSubmit} handlePlaylistChange={handlePlaylistChange} playlistFormData={playlistFormData} setShowNewPlaylist={setShowNewPlaylist} setPlaylistArtwork={setPlaylistArtwork} uploader={uploader} options={options}
                        />

                )
                : (
                    ''
                )}



            {
                songs && songs.length > 0 ?
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


                                {
                                    songs.map((song, idx) => {
                                        return (

                                            <tr>
                                                <td>{idx + 1}</td>
                                                <td>

                                                    <div className='album-wrapper'>
                                                        <img className='rounded-0' src={song.artwork} width='70px' height='70px' />
                                                        <div className='audio-wrapper'>
                                                            <audio src={song.audio} controls />
                                                        </div>
                                                    </div>

                                                </td>
                                                <td>
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
                                                            <Dropdown.Item href="" onClick={() => { updatePlaylistSongs(playlist?._id, song._id) }} ><FontAwesomeIcon
                                                                icon={faTrashCan}

                                                                className='icon'
                                                            />&nbsp;
                                                                Remove from playlist</Dropdown.Item>
                                                            {!song.spotify
                                                                ? (
                                                                    <Dropdown.Item href="" onClick={() => { updatePlaylistSongs(playlist?._id, song._id) }} >
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
                                    })
                                }


                            </tbody>
                        </Table>
                    </Container>

                    :

                    <NotFoundBanner message="This is an empty playlists. Add songs below or use the search bar to find your favorites tunes." buttonMessage="Add Songs" buttonAction={setShowSearch(true)} />
            }

            {
                showSearch ?
                    <Search setShowSearch={setShowSearch} /> :
                    ""
            }



            <Footer />
        </>
    )
}
