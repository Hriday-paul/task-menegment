import { Outlet } from "react-router-dom"
import Navbar from "../component/Navbar/Navbar"
import Footer from "../pages/Footer/Footer"

function Root() {

  return (
    <div>
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
    </div>
    
  )
}

export default Root