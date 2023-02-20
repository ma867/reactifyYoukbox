
import SideNavbar from "../../components/Navbar/SideNavbar"
import NavBar from "../../components/Navbar/Navbar"
import TitleBanner from "../../components/TitleBanner/TitleBanner"
import Index from "../../components/MainPage/Index"
import Footer from "../../components/Footer/Footer"
import { Container, Col, Row } from 'react-bootstrap'

export default function MainPage({ user, setUser }) {


  return (
    <>


      <NavBar user={user} setUser={setUser} />
      <TitleBanner bannerTitleLight="Song" bannerTitleSolid="Library" user={user} setUser={setUser} />

      <Index user={user} setUser={setUser} />
      <Footer />

    </>




  )
}