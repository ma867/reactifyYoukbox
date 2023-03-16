
import { Button } from 'react-bootstrap'
import './NotFoundBanner.scss'
export default function NotFoundBanner({ message, buttonMessage, buttonAction }) {

    return (<>
        <div className='full-width wrap flex horizontal justify-content-center align-items-center
  pt-2 pb-2 space-between'>

            <div className='not-found-banner-icon-container'>
                <div className="mix-blend-mode banner-icon p-2" style={{ backgroundImage: 'url("https://i.imgur.com/E1d7RkY.png")', width: '500px', height: '500px' }} ></div>
            </div>
            <div className="not-found-banner-text-container p-2 flex vertical text-center justify-content-center align-items-center" >
                <h2 className='fw-bold display-5 dark p-3 title '>
                    Hmm...seems like this page is empty.


                </h2>
                <p>{message}</p>
                <br />
                <Button className='not-found-banner-button' onClick={() => buttonAction}>{buttonMessage}</Button>
            </div>

        </div>
    </>)

}