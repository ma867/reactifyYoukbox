import Navbar from "../../components/Navbar/Navbar"
import Banner from "../../components/Homepage/Banner/Banner"
import Cards from "../../components/Homepage/Cards/Cards"
import Footer from "../../components/Footer/Footer"

export default function Homepage({ user }) {
  return (
    <>

      <Navbar user={user} />
      <Banner />
      <Cards />
      <Footer />


    </>
  )
}