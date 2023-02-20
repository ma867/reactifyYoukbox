import { useState, useEffect } from "react"
import { Table, Container } from "react-bootstrap"
import { faTrashCan, faFileEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export default function Index({ user, setUser, getUser, songs, setSongs }) {




    const deleteSong = async (id) => {
        try {
            await fetch(`/api/songs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            getUser()
        } catch (error) {
            console.error(error)
        }
    }

    return (<>
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
                                                    <div className="flex horizontal icons justify-content-center" >

                                                        <FontAwesomeIcon icon={faTrashCan} onClick={() => { deleteSong(song._id) }} className="icon" />
                                                        {
                                                            !song.spotify ?
                                                                <FontAwesomeIcon icon={faFileEdit} className="icon" />
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




    </>)
}