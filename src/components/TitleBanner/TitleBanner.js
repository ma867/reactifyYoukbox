
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import "./TitleBanner.scss"
export default function TitleBanner({ bannerTitleLight, bannerTitleSolid, user, setUser }) {

    return (
        <>

            <div className="banner-image w-100 pt-5 d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                <div className="section-header text-center">
                    <h2 className="fw-bold display-1 text-white title light"><span className="b-class-secondary title light-transparent">{bannerTitleLight}</span> {bannerTitleSolid}</h2><br />

                </div>

            </div>


        </>
    )
}