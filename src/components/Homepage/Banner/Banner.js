import './Banner.scss'
import { Button } from 'react-bootstrap'
export default function Banner({ setAuth, auth }) {
  return (

    <div className='banner-image full-width full-height flex justify-content-center align-items-center pt-5'>
      <div className="mix-blend-mode p-3" style={{ backgroundImage: 'url("https://i.imgur.com/E1d7RkY.png")' }} >
        {/* <img style={{ width: '600px', height: '600px' }} class="mix-blend-mode" src="https://i.imgur.com/E1d7RkY.png" /> */}
      </div>
      <div className='section-header text-center title p-3'>
        <h2 className='fw-bold display-3 light p-3 main-banner-title'>
          <span className='b-class-secondary'>Your </span> favorite songs, <br />
          <span className='b-class-secondary'>Your </span> personal jukebox. <br /><br />
          <Button className='banner-button' onClick={() => setAuth(true)}>Login to Start Listening</Button>

        </h2>
      </div>
    </div>
  )
}
