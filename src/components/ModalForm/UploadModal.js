
import { Button, Modal, Form } from "react-bootstrap"
import { UploadButton } from 'react-uploader';
import { Uploader } from 'uploader'
import { upload } from "@testing-library/user-event/dist/upload"

export default function UploadModal({ showModal, setShowModal, handleSubmit, handleChange, formData, setShowUpload, setArtwork, uploader, options }) {


    return (

        <>
            <Modal show={showModal} onHide={() => { setShowModal(false); setShowUpload(false); }} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title className="title">Upload Song</Modal.Title>
                </Modal.Header>
                <Form autoComplete='off' onSubmit={handleSubmit} className='justify-content-center'>

                    <Modal.Body >

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="title">Song Title</Form.Label>
                            <Form.Control className='login-input' type="text" name="title" onChange={handleChange} value={formData.title} placeholder="Song title goes here" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label className="title">Artist(s)</Form.Label>
                            <Form.Control className='login-input' type="text" name="artist" onChange={handleChange} value={formData.artist} placeholder="Artist(s) name goes here" />
                        </Form.Group>

                        <Form.Group className="mb-3 pb-3" controlId="formBasicPassword">
                            <Form.Label className="title">Album</Form.Label>
                            <Form.Control className='login-input' type="text" name="album" onChange={handleChange} value={formData.album} placeholder="Album name goes here" />
                        </Form.Group>
                        <Form.Group className="mb-3 pb-3" controlId="formBasicPassword">
                            <Form.Label className="title">MP3 URL</Form.Label>
                            <Form.Control className='login-input' type="text" name="audio" onChange={handleChange} value={formData.audio} placeholder="URL for MP3 goes here" />
                        </Form.Group>

                        <UploadButton uploader={uploader} options={options} onComplete={(files) => setArtwork(files.map((x) => x.fileUrl).join('\n'))}>
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