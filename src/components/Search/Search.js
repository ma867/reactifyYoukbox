import { Button, Modal, Form } from 'react-bootstrap'
import { useState } from 'react';
export default function Search({ setShowSearch }) {

    const [songTitle, setSongTitle] = useState("");

    const handleChange = (e) => {
        setSongTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (<>
        Find songs:
        {/* 
        <Modal
            show={showModal} onHide={() => { setShowModal(false) }} size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className='title'>New Playlist</Modal.Title>
            </Modal.Header>
            <Form autoComplete='off' onSubmit={handlePlaylistSubmit} className='justify-content-center'>

                <Modal.Body>
                    <Form className="d-flex" onSubmit={handleSubmit}>
                        <Form.Control
                            type="text"
                            placeholder="Search song..."
                            className="me-2"
                            aria-label="Search"
                            onChange={handleChange}
                            value={songTitle}
                        />
                        <Button type="submit" variant="outline-success">
                            Search
                        </Button>
                    </Form>
                    <Container>
                        {
                            songs?.map((song) => {
                                return (

                                    <Row>
                                        <Col lg={1}>
                                            <FontAwesomeIcon
                                                icon={faHeart} onClick={() => {
                                                    handleAddedSongs(song._id)
                                                }} className='icon'
                                            />
                                        </Col>
                                        <Col lg={2}>
                                            <img src={song.artwork} style={{ width: '60px', height: '60px' }} alt='' />
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

                </Modal.Body>
                <Modal.Footer>

                    <Button variant='primary' type='submit' className='submit-form'>
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal> */}

    </>)
}