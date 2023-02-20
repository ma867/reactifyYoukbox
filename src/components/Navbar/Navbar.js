import { Container, Navbar, Nav, NavDropdown, Form, Button } from 'react-bootstrap'
import { logOut } from '../../utilities/users-service'
import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
export default function NavBar({ user, setUser }) {
    const navbarRef = useRef(null)
    const navigate = useNavigate()
    const [songTitle, setSongTitle] = useState('')

    const handleChange = (e) => {
        setSongTitle(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate(`/search/${songTitle}`)
    }

    const changeNavbarColorOnScroll = () => {
        window.addEventListener('scroll', function () {

            if (window.pageYOffset > 100) {
                navbarRef.current.classList.add('bg-dark', 'shadow');
            } else {
                navbarRef.current.classList.remove('bg-dark', 'shadow');
            }
        })


    }

    useEffect(() => {
        changeNavbarColorOnScroll()
    }, [])
    return (

        <Navbar ref={navbarRef} collapseOnSelect bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand href="#home">
                    <img width="200" src="https://i.imgur.com/gGmlYWA.png" alt="youkbox" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto" >
                        {
                            !user ?
                                <Nav.Link href="/auth">Login</Nav.Link>
                                :
                                <>
                                    <Nav.Link href="/songs">Songs</Nav.Link>
                                    <Nav.Link href="/playlists">Playlists</Nav.Link>
                                    <Nav.Link href="" onClick={() => { logOut() }}>Log Out</Nav.Link>

                                    <Form className="d-flex" onSubmit={handleSubmit}>
                                        <Form.Control
                                            type="text"
                                            placeholder="Search song..."
                                            className="me-2"
                                            aria-label="Search"
                                            onChange={handleChange} value={songTitle}

                                        />
                                        <Button type="submit" variant="outline-success">Search</Button>
                                    </Form>
                                </>

                        }

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}