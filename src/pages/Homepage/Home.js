import Navbar from "../../components/Navbar/Navbar"
import Banner from "../../components/Homepage/Banner/Banner"
import Cards from "../../components/Homepage/Cards/Cards"
import Auth from "../Auth/Auth"
import Footer from "../../components/Footer/Footer"
import { useState } from "react"

export default function Homepage({ user, setUser }) {

  const [auth, setAuth] = useState(false)
  return (
    <>

      <Navbar user={user} setAuth={setAuth} auth={auth} />
      {
        auth ?


          <Auth setAuth={setAuth} user={user} setUser={setUser} />
          :
          <>
            <Banner />
            <Cards />
          </>


      }
      <Footer />

    </>
  )
}