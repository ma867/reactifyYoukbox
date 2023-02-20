import { Button } from 'react-bootstrap'
import { useState } from 'react';

import UploadModal from '../UploadModal/UploadModal';
import "./TitleBanner.scss"
export default function TitleBanner({ bannerTitleLight, bannerTitleSolid, user, setUser }) {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }
    const handleShow = () => {
        setShow(true)
    }



    return (
        <>

            <div className="banner-image w-100 pt-5 d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                <div className="section-header text-center">
                    <h2 className="fw-bold display-1 text-white title light"><span className="b-class-secondary title light-transparent">{bannerTitleLight}</span> {bannerTitleSolid}</h2><br />


                    <Button variant="primary" onClick={handleShow}>
                        Upload Song
                    </Button>
                    <UploadModal user={user} setUser={setUser} handleClose={handleClose} handleShow={handleShow} show={show} />



                </div>

            </div>


        </>
    )
}