import { FC, useState } from "preact/compat"
import Navbar from "../navbar"
import { Bounce, ToastContainer } from "react-toastify"
import Body from "../Body"

const Layout:FC = () => {
    const [change, setChange] = useState<number>(1)

    return (
        <>
            <Navbar setChange={setChange}/>
            <Body change={change} setChange={setChange} />
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
                />
        </>
    )
}

export default Layout