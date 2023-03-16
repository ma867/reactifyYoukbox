
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import './TitleBanner.scss'
export default function TitleBanner({ playlistLength, bannerTitleLight, bannerTitleSolid, user, page, cover, description }) {
    return (
        <>

            <div className='title-banner  pt-5 d-flex justify-content-left align-items-center p-5  full-width' style={{ height: '350px' }}>
                <div className='section-header mt-5 pt-3 pb-3 p-3 flex horizontal align-items-center'>
                    {
                        page === 'playlist' || page === 'main'
                            ? <>
                                <img className='rounded-0 p-2 library-icon' src={cover} />
                                <div className='descriptions flex vertical p-5'>
                                    <h2 className='fw-bold display-1 text-white title light'><span className='b-class-secondary title light-transparent'>{bannerTitleLight}</span> {bannerTitleSolid}</h2>
                                    <h6 className='text-white light'>{description}</h6>
                                    {
                                        page === 'playlist'
                                            ? <div className='flex horizontal icon-gap align-content-center text-white'>
                                                <div className='profile-icon' style={{ backgroundImage: `url(${user?.image})` }} />
                                                <p><small>{user?.name}   •   {playlistLength} songs</small></p>
                                            </div>

                                            : ''
                                    }
                                </div>

                            </>
                            : <>
                                <h2 className='fw-bold display-1 text-white title light'><span className='b-class-secondary title light-transparent'>{bannerTitleLight}</span> {bannerTitleSolid}</h2><br />

                            </>

                    }

                </div>

            </div>

        </>
    )
}
