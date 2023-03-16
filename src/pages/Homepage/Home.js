import Navbar from '../../components/Navbar/Navbar'
import Banner from '../../components/Homepage/Banner/Banner'
import Cards from '../../components/Homepage/Cards/Cards'
import Auth from '../AuthPage/Auth'
import Footer from '../../components/Footer/Footer'
import { useState } from 'react'

export default function Home({ uploader, user, setUser }) {
  const [auth, setAuth] = useState(false)
  return (
    <>

      <Navbar page='' user={user} setAuth={setAuth} auth={auth} />
      {
        auth

          ? <Auth uploader={uploader} setAuth={setAuth} user={user} setUser={setUser} />
          : <>
            <Banner setAuth={setAuth} auth={auth} />
            <Cards />
          </>

      }
      {/* <Footer /> */}

    </>
  )
}
