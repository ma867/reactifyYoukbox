import NavBar from "../../components/Navbar/Navbar";
import TitleBanner from "../../components/TitleBanner/TitleBanner";
import Footer from "../../components/Footer/Footer";
import NewPlaylistModal from "../../components/ModalForm/NewPlaylistModal";
import { useState, useEffect } from "react";
import { Table, Container, Button, Modal, Form, Row, Col, Card } from "react-bootstrap";
import { faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";


export default function Playlists({
    showUpdatePlaylist,
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
    playlists
}) {

    const navigate = useNavigate()

    const deletePlaylist = async (id) => {
        try {
            await fetch(`/api/playlists/${id}`, {
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


    useEffect(() => {
        getRefreshedUser();
    }, []);
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
                bannerTitleLight="Your"
                bannerTitleSolid="Playlists"
                user={user}
                setUser={setUser}
                getUser={getUser}
                page=""
                cover=""
                description=""

            />

            {showModal ? (
                showNewPlaylist ? (
                    <NewPlaylistModal showUpdatePlaylist={showUpdatePlaylist}
                        setShowUpdatePlaylist={setShowUpdatePlaylist} setPlaylistSongs={setPlaylistSongs} playlistSongs={playlistSongs} songs={songs} showModal={showModal} setShowModal={setShowModal} handlePlaylistSubmit={handlePlaylistSubmit} handlePlaylistChange={handlePlaylistChange} playlistFormData={playlistFormData} setShowNewPlaylist={setShowNewPlaylist} setPlaylistArtwork={setPlaylistArtwork} uploader={uploader} options={options} />
                ) : ""
            ) : (
                ""
            )}
            <Container className="mb-3 mt-3 ">
                <Row className="justify-content-md-center">

                    {

                        playlists ?




                            playlists.map((foundPlaylist, idx) => {


                                return (
                                    <Col xs={12} md={6} lg={3} className="mb-3" key={idx}>
                                        <Card className="shadow-sm border-0 rounded-0" style={{ width: '100%' }}>

                                            <div className="album-wrapper">
                                                <Card.Img variant="top" className="rounded-0" src={foundPlaylist.artwork} />
                                                <div className="audio-wrapper">
                                                    <audio src="" controls></audio>
                                                </div>
                                            </div>
                                            <Card.Body>
                                                <Card.Title className="flex horizontal space-between">
                                                    <div className="title">{foundPlaylist.title}</div>

                                                    <div className="flex horizontal icon-gap">

                                                        <div><FontAwesomeIcon icon={faTrashCan} onClick={() => { deletePlaylist(foundPlaylist._id) }} className="icon" /></div>
                                                        <div> <FontAwesomeIcon icon={faEye} onClick={() => { navigate(`/playlist/${foundPlaylist._id}`) }} className="icon" /></div>

                                                    </div>

                                                </Card.Title>
                                                <Card.Text>
                                                    {foundPlaylist.description}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                )


                            })

                            : <></>
                    }
                </Row>
            </Container>

            <Footer />
        </>
    );
}
