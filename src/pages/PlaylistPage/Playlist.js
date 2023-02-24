import TitleBanner from "../../components/TitleBanner/TitleBanner"
import NewPlaylistModal from "../../components/ModalForm/NewPlaylistModal"
import NavBar from "../../components/Navbar/Navbar"
import Footer from "../../components/Footer/Footer"
import UpdatePlaylistModal from "../../components/ModalForm/UpdatePlaylistModal"

import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Table, Container, Button, Modal, Form } from "react-bootstrap"
import { faTrashCan, faFileEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function PlaylistPage({ showUpdatePlaylist,
    setShowUpdatePlaylist,
    user,
    getUser,
    setUser,
    showModal,
    setShowModal,
    showUpdate,
    setShowUpdate,
    setShowUpload,
    showUpload,
    setShowNewPlaylist,
    showNewPlaylist,
    songs,
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
    handlePlaylistSubmit,
    playlistSongs,
    setPlaylistSongs,
    playlists }) {

    const params = useParams()
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

        }
        catch (error) {
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
                page="playlist"
                user={user}
                setUser={setUser}
                setShowModal={setShowModal}
                setShowUpload={setShowUpload}
                setShowUpdate={setShowUpdate}
                setShowNewPlaylist={setShowNewPlaylist}
                showNewPlaylist={showNewPlaylist}

            />

            <TitleBanner
                bannerTitleLight=""
                bannerTitleSolid={playlist?.title}
                user={user}
                setUser={setUser}
                getUser={getUser}
                page="playlist"
                cover={playlist?.artwork}
                description={playlist?.description}
            />
            <Button onClick={() => { setShowModal(true); setShowUpdatePlaylist(true) }}>Edit</Button>
            {showModal ? (
                showNewPlaylist ? (
                    <NewPlaylistModal showUpdatePlaylist={showUpdatePlaylist}
                        setShowUpdatePlaylist={setShowUpdatePlaylist} setPlaylistSongs={setPlaylistSongs} playlistSongs={playlistSongs} songs={songs} showModal={showModal} setShowModal={setShowModal} handlePlaylistSubmit={handlePlaylistSubmit} handlePlaylistChange={handlePlaylistChange} playlistFormData={playlistFormData} setShowNewPlaylist={setShowNewPlaylist} setPlaylistArtwork={setPlaylistArtwork} uploader={uploader} options={options} />
                ) : <UpdatePlaylistModal setUpdatedArtwork={setUpdatedArtwork} updatedArtwork={updatedArtwork} handleChangeUpdate={handleChangeUpdate} updatePlaylistInfo={updatePlaylistInfo} playlist={playlist} showUpdatePlaylist={showUpdatePlaylist}
                    setShowUpdatePlaylist={setShowUpdatePlaylist} setPlaylistSongs={setPlaylistSongs} playlistSongs={playlistSongs} songs={songs} showModal={showModal} setShowModal={setShowModal} handlePlaylistSubmit={handlePlaylistSubmit} handlePlaylistChange={handlePlaylistChange} playlistFormData={playlistFormData} setShowNewPlaylist={setShowNewPlaylist} setPlaylistArtwork={setPlaylistArtwork} uploader={uploader} options={options} />

            ) : (
                ""
            )}

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

                                                            <FontAwesomeIcon icon={faTrashCan} onClick={() => { updatePlaylistSongs(playlist?._id, song._id) }} className="icon" />
                                                            {
                                                                !song.spotify ?
                                                                    <FontAwesomeIcon icon={faFileEdit} onClick={() => { updatePlaylistSongs(playlist?._id, song._id) }} className="icon" />
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


            <Footer />
        </>
    )


}