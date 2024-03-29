import {
    Container,
    Navbar,
    Nav,
    NavDropdown,
    Row,
    Col,
    Form,
    Button,
} from "react-bootstrap";
import { logOut } from "../../utilities/users-service";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";
export default function NavBar({
    page,
    user,
    setAuth,
    auth,
    setShowModal,
    setShowUpload,
    setShowUpdate,
    setShowNewPlaylist,
}) {
    const navbarRef = useRef(null);
    const navigate = useNavigate();
    const [songTitle, setSongTitle] = useState("");

    const handleChange = (e) => {
        setSongTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${songTitle}`);
    };

    const changeNavbarColorOnScroll = () => {
        window.addEventListener("scroll", function () {
            if (window.pageYOffset > 100) {
                navbarRef.current.classList.add("navbar-dark");
                navbarRef.current.classList.remove("nav-image");
            } else {
                navbarRef.current.classList.remove("navbar-dark");
                navbarRef.current.classList.add("nav-image");
            }
        });
    };

    useEffect(() => {
        changeNavbarColorOnScroll();
    }, []);
    return (
        <Navbar
            ref={navbarRef}
            className="nav-image  fixed-top"
            collapseOnSelect
            expand="lg"
            style={{ fixed: "top" }}
        >
            <Container>
                <Navbar.Brand href="/" onClick={() => setAuth(false)}>
                    <img
                        width="200"
                        src="https://i.imgur.com/gGmlYWA.png"
                        alt="youkbox"
                    />
                </Navbar.Brand>
                {
                    user ?
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        :
                        ""
                }

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!user ? (
                            ""
                        ) : (
                            <>
                                <Nav.Link
                                    href=""
                                    onClick={() => {
                                        setShowModal(true);
                                        setShowUpload(true);
                                        setShowUpdate(false);
                                    }}
                                >
                                    Upload
                                </Nav.Link>
                                <Nav.Link href="/">Songs</Nav.Link>
                                <Nav.Link href="/playlists">Playlists</Nav.Link>
                                {page === "playlist" ? (
                                    <Nav.Link
                                        href=""
                                        onClick={() => {
                                            setShowModal(true);
                                            setShowNewPlaylist(true);
                                            setShowUpload(false);
                                            setShowUpdate(false);
                                        }}
                                    >
                                        New Playlist
                                    </Nav.Link>
                                ) : (
                                    ""
                                )}
                                <Form className="d-flex" onSubmit={handleSubmit}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Search song..."
                                        className="me-2"
                                        aria-label="Search"
                                        onChange={handleChange}
                                        value={songTitle}
                                    />
                                    <Button type="submit" variant="outline-success">
                                        Search
                                    </Button>
                                </Form>
                                <Nav.Link
                                    href="/"

                                    onClick={() => {
                                        logOut();

                                    }}
                                >
                                    Log Out
                                </Nav.Link>

                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
