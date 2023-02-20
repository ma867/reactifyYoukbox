import Navbar from "../../components/Navbar/Navbar"
import SignUpForm from "../../components/Auth/SignUp/SignUp"
import LoginForm from "../../components/Auth/Login/Login"
import { useState } from "react"

export default function Auth(props) {
    const [visible, setVisible] = useState("login")

    return (
        <>
            {/* <Navbar /> */}
            {
                visible === "login" ?
                    (

                        <LoginForm setUser={props.setUser} setVisible={setVisible} />
                    ) :
                    (

                        <SignUpForm setUser={props.setUser} setVisible={setVisible} />
                    )
            }

        </>
    )
}