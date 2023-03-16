
import { Button, Modal, Form } from 'react-bootstrap'
import { UploadButton } from 'react-uploader'

export default function UpdatePlaylistModal({
    updatePlaylistInfo, setUpdatedArtwork, handleChangeUpdate, playlist,
    setShowUpdatePlaylist, showModal, setShowModal, uploader, options
}) {
    return (
        <Modal
            show={showModal} onHide={() => { setShowModal(false); setShowUpdatePlaylist(false) }} size='lg'
            aria-labelledby='contained-modal-title-vcenter'
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className='title'>Update Playlist</Modal.Title>
            </Modal.Header>
            <Form autoComplete='off' onSubmit={updatePlaylistInfo(playlist._id, { title: playlist.title, description: playlist.description })} className='justify-content-center'>

                <Modal.Body>

                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label className='title'>Title</Form.Label>
                        <Form.Control className='login-input' type='text' name='title' onChange={handleChangeUpdate} defaultValue={playlist?.title} placeholder='Playlist title goes here' />
                    </Form.Group>
                    <Form.Group className='mb-3' controlId='formBasicEmail'>
                        <Form.Label className='title'>Description</Form.Label>
                        <Form.Control className='login-input' type='text' name='description' onChange={handleChangeUpdate} defaultValue={playlist?.description} placeholder='Playlist description goes here' />
                    </Form.Group>
                    <UploadButton uploader={uploader} options={options} onComplete={(files) => setUpdatedArtwork(files.map((x) => x.fileUrl).join('\n'))}>
                        {({ onClick }) => (<Button className='action' onClick={onClick}>Upload Playlist Artwork</Button>)}
                    </UploadButton>
                    <br />
                </Modal.Body>
                <Modal.Footer>

                    <Button variant='primary' type='submit' className='submit-form'>
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>

    )
}
