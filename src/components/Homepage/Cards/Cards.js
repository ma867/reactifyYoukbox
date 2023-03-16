
import './Cards.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify } from '@fortawesome/free-brands-svg-icons'
import { faCloud, faMusic } from '@fortawesome/free-solid-svg-icons'
import { Container, Col, Row } from 'react-bootstrap'

export default function Cards (props) {
  return (
    <section id='information' className='informational-cards pt-5 pb-5'>
      <Container>
        <Row className='mt-5 mt-md-4 row-cols-1 row-cols-sm-1 row-cols-md-3 justify-content-center'>
          <Col>
            <div className='service-card'>
              <div className='icon-wrapper'>
                <FontAwesomeIcon icon={faCloud} />
              </div>

              <h3 className='title'>Customize Your Library</h3>
              <p>
                Add as many songs as you would like. We will store them on our cloud so you can have all the
                artists you know and love whenever and wherever you want it!
              </p>
            </div>
          </Col>
          <Col>
            <div className='service-card'>
              <div className='icon-wrapper'>
                <FontAwesomeIcon icon={faMusic} />
              </div>

              <h3 className='title'>Create your own soundtrack</h3>
              <p className='subtitle'>
                Create as many playlists as you want with your library songs. Get creative and make
                soundstracks for your every day life.
              </p>
            </div>
          </Col>
          <Col>
            <div className='service-card'>
              <div className='icon-wrapper'>
                <FontAwesomeIcon icon={faSpotify} />
              </div>

              <h3 className='title'>Spotify Music Library</h3>
              <p>
                Don't wanna add your own music? Use our spotify extension to browse from thousands of
                artists already on this platform.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
