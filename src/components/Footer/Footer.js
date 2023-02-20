
import './Footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { Container, Col, Row } from 'react-bootstrap'


export default function Footer(props) {
    return (
        <footer>

            <Container className='text-light' >
                <Row>
                    <Col className="col-md-3 col-lg-4 col-xl-3">
                        <h5 className="title light">About Us</h5>
                        <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25" />
                        <p className="mb-0">
                            You-kbox is a small music app made with love at General Assembly.
                        </p>
                    </Col>

                    <Col className="col-md-2 col-lg-2 col-xl-2 mx-auto">
                        <ul className="list-unstyled">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </Col>

                    <Col className="col-md-3 col-lg-2 col-xl-2 mx-auto">
                        <ul className="list-unstyled">
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </Col>

                    <Col className="col-md-4 col-lg-3 col-xl-3 ">
                        <h5 className="title light">Follow Us</h5>
                        <hr className="bg-white mb-2 mt-0 d-inline-block mx-auto w-25" />
                        <ul className="list-unstyled">
                            <li><FontAwesomeIcon icon={faTwitter} />our-you-kbox</li>
                            <li><FontAwesomeIcon icon={faInstagram} /> our-you-kbox</li>
                            <li><span className="copyright"> &copy; You-Kbox 2022 </span></li>
                        </ul>
                    </Col>
                </Row>
            </Container >
        </footer>
    )
}