import Navbar from "../../components/Navbar/Navbar"
import SignUpForm from "../../components/Auth/SignUp/SignUp"
import LoginForm from "../../components/Auth/Login/Login"
import { useState } from "react"

export default function Auth({ user, setUser }) {
    const [visible, setVisible] = useState("login")

    return (
        <>

            {
                visible === "login" ?
                    (

                        <LoginForm setUser={setUser} setVisible={setVisible} />
                    ) :
                    (

                        <SignUpForm setUser={setUser} setVisible={setVisible} />
                    )
            }

        </>
    )
}