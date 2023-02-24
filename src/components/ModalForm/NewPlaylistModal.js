
import { Button, Modal, Form, Container, Col, Row } from "react-bootstrap"
import { UploadButton } from 'react-uploader';
import { Uploader } from 'uploader'
import { upload } from "@testing-library/user-event/dist/upload"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'



export default function NewPlaylistModal({ showUpdatePlaylist,
    setShowUpdatePlaylist, setPlaylistSongs, playlistSongs, songs, showModal, setShowModal, handlePlaylistSubmit, handlePlaylistChange, playlistFormData, setShowNewPlaylist, setPlaylistArtwork, uploader, options }) {

    const handleAddedSongs = (id) => {
        if (playlistSongs.includes(id)) {
            const copyPlaylistSongs = [...playlistSongs]
            copyPlaylistSongs.splice(copyPlaylistSongs.indexOf(id), 1)
            setPlaylistSongs(copyPlaylistSongs)
        }
        else {
            setPlaylistSongs([...playlistSongs, id])
        }
    }
    return (

        <>
            <Modal show={showModal} onHide={() => { setShowModal(false); setShowNewPlaylist(false); }} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="title">New Playlist</Modal.Title>
                </Modal.Header>
                <Form autoComplete='off' onSubmit={handlePlaylistSubmit} className='justify-content-center'>

                    <Modal.Body >

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="title">Title</Form.Label>
                            <Form.Control className='login-input' type="text" name="title" onChange={handlePlaylistChange} value={playlistFormData.title} placeholder="Playlist title goes here" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="title">Description</Form.Label>
                            <Form.Control className='login-input' type="text" name="description" onChange={handlePlaylistChange} value={playlistFormData.description} placeholder="Playlist description goes here" />
                        </Form.Group>
                        <Container>
                            {
                                songs?.map((song) => {

                                    return (

                                        <Row>
                                            <Col lg={1}>
                                                <FontAwesomeIcon icon={faHeart} onClick={() => {
                                                    handleAddedSongs(song._id)
                                                }} className="icon" />
                                            </Col>
                                            <Col lg={2}>
                                                <img src={song.artwork} style={{ width: '60px', height: '60px' }} alt="" />
                                            </Col>
                                            <Col lg={9}>
                                                <b>{song.title}</b><br />
                                                {song.artist[0]}<br /><br />
                                            </Col>
                                        </Row>


                                    )

                                })


                            }
                        </Container>


                        <UploadButton uploader={uploader} options={options} onComplete={(files) => setPlaylistArtwork(files.map((x) => x.fileUrl).join('\n'))}>
                            {({ onClick }) => (<Button className='action' onClick={onClick}>Upload Song Artwork</Button>)}
                        </UploadButton>
                        <br />
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="primary" type="submit" className='submit-form'>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </>
    )
}