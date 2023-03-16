import { Button, Modal, Form } from "react-bootstrap";
import { UploadButton } from "react-uploader";

export default function UpdateModal({
    showModal,
    setShowModal,
    setShowUpdate,
    updateSong,
    handleChangeUpdate,
    song,
    setUpdatedArtwork,
    uploader,
    options,
}) {
    return (
        <Modal
            show={showModal}
            onHide={() => {
                setShowModal(false);
                setShowUpdate(false);
            }}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title className="title">Update Song</Modal.Title>
            </Modal.Header>
            <Form
                autoComplete="off"
                onSubmit={updateSong(song?._id, {
                    title: song.title,
                    artist: song.artist,
                    album: song.album,
                    audio: song.audio,
                })}
                className="justify-content-center"
            >
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="title">Song Title</Form.Label>
                        <Form.Control
                            className="login-input"
                            type="text"
                            name="title"
                            onChange={handleChangeUpdate}
                            defaultValue={song?.title}
                            placeholder="Song title goes here"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="title">Artist(s)</Form.Label>
                        <Form.Control
                            className="login-input"
                            type="text"
                            name="artist"
                            onChange={handleChangeUpdate}
                            defaultValue={song?.artist}
                            placeholder="Artist(s) name goes here"
                        />
                    </Form.Group>

                    <Form.Group className="mb-3 pb-3" controlId="formBasicPassword">
                        <Form.Label className="title">Album</Form.Label>
                        <Form.Control
                            className="login-input"
                            type="text"
                            name="album"
                            onChange={handleChangeUpdate}
                            defaultValue={song?.album}
                            placeholder="Album name goes here"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3 pb-3" controlId="formBasicPassword">
                        <Form.Label className="title">MP3 URL</Form.Label>
                        <Form.Control
                            className="login-input"
                            type="text"
                            name="audio"
                            onChange={handleChangeUpdate}
                            defaultValue={song?.audio}
                            placeholder="URL for MP3 goes here"
                        />
                    </Form.Group>

                    <UploadButton
                        uploader={uploader}
                        options={options}
                        onComplete={(files) =>
                            setUpdatedArtwork(files.map((x) => x.fileUrl).join("\n"))
                        }
                    >
                        {({ onClick }) => (
                            <Button className="action" onClick={onClick}>
                                Upload Song Artwork
                            </Button>
                        )}
                    </UploadButton>
                    <br />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" className="submit-form">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}
