import { UploadButton } from 'react-uploader';
import { Uploader } from 'uploader'
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Form, Container, Col, Row } from 'react-bootstrap'
import { useState } from 'react';

export default function UploadModal({ user, show, setShow, handleClose, handleShow, setUser }) {

    const [artwork, setArtwork] = useState('https://i.imgur.com/0FUT9eJ.png')
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        album: '',
        audio: '',
        userId: user._id

    })

    const navigate = useNavigate()

    const getUser = async () => {
        try {
            const response = await fetch(`/api/users/${user._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json()
            setUser(data)
        } catch (error) {
            console.error(error)
        }
    }


    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })

    }
    const handleSubmit = async (evt) => {
        evt.preventDefault()
        try {
            const formDataCopy = { ...formData, artwork }

            const response = await fetch(`/api/songs/${user._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...formDataCopy })
            })
            setFormData({
                title: '',
                artist: '',
                album: '',
                audio: '',
                userId: user._id

            })

            setShow(false)
            getUser()
            navigate('/songs')


        }
        catch (error) {
            console.error(error)
        }

    }

    const uploader = Uploader({
        apiKey: 'free' // Get production API keys from Upload.io
    })

    const options = {
        multi: false,
        maxFileCount: 1,
        editor: {
            images: {
                crop: true,
                cropShape: 'circ', // "rect" also supported.
                cropRatio: 1 / 1 // "1" is enforced for "circ".
            }
        }
    }

    const uploadFile = () => {
        uploader.open(options)
            .then((file) => {
                file
                    ? setArtwork(file[0].fileUrl)
                    : setArtwork('')
            }
            )
    }


    return (

        <>
            <Modal show={show} onHide={handleClose} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered


            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Song</Modal.Title>
                </Modal.Header>
                <Form autoComplete='off' onSubmit={handleSubmit} className='justify-content-center'>

                    <Modal.Body >

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Song Title</Form.Label>
                            <Form.Control className='login-input' type="text" name="title" onChange={handleChange} value={formData.title} placeholder="Song title goes here" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Artist(s)</Form.Label>
                            <Form.Control className='login-input' type="text" name="artist" onChange={handleChange} value={formData.artist} placeholder="Artist(s) name goes here" />
                        </Form.Group>

                        <Form.Group className="mb-3 pb-3" controlId="formBasicPassword">
                            <Form.Label>Album</Form.Label>
                            <Form.Control className='login-input' type="text" name="album" onChange={handleChange} value={formData.album} placeholder="Album name goes here" />
                        </Form.Group>
                        <Form.Group className="mb-3 pb-3" controlId="formBasicPassword">
                            <Form.Label>MP3 URL</Form.Label>
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