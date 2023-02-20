import { Container, Col, Row } from 'react-bootstrap'
import { useEffect, useRef } from 'react'
export default function SideNavbar(props) {
    const navbarRef = useRef(null)

    const changeNavbarColorOnScroll = () => {
        window.addEventListener('scroll', function () {

            if (window.pageYOffset > 100) {
                navbarRef.current.classList.add('bg-dark', 'shadow');
            } else {
                navbarRef.current.classList.remove('bg-dark', 'shadow');
            }
        })


    }


    return (
        <>
            {/* <SideNavbar /> */}

            {/* <Container fluid>
        <Row>
          <Col lg={3} className="full-height bg-dark text-light flex align-items-center"  >
            <Container style={{ backgroundColor: "red" }} className=" flex justify-content-center" >
              <Row >
                <Col>
                  <ul>
                    <li>Songs</li>
                    <li>Playlists</li>
                    <li>Upload Song</li>
                  </ul>

                </Col>

              </Row>
            </Container>

          </Col>

          <Col lg={9} className="full-height" style={{ backgroundColor: "orange" }}>

          </Col>
        </Row>





      </Container> */}
        </>
    )
}