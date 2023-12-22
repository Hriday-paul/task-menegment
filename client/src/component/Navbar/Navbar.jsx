import PropTypes from 'prop-types'
import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { authContext } from './Authonicate/Authonicate'
import logo from '../../../public/thumbnail-184659-removebg-preview.png'

function Navbar() {
  const {userInfo, logOut} = useContext(authContext);

  return (
    <nav className="bg-slate-100 border-gray-200 fixed w-full opacity-90">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to='/' className="flex items-center">
          <img className='h-10' src={logo} alt="logo" />
          <span className="self-center text-2xl text-black font-semibold font-mono whitespace-nowrap">Tasker</span>
        </NavLink>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 rounded-lg md:flex-row md:space-x-8">
            <li>
              <NavLink to="/" className={({ isActive}) => isActive ? "block py-2 pl-3 pr-4 md:p-0 text-white md:text-blue-500 bg-blue-700 md:bg-transparent rounded underline underline-offset-4" : "block py-2 pl-3 pr-4 text-black bg-transparent rounded md:p-0 hover:bg-slate-200 hover:md:bg-transparent"} aria-current="page">Home</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={({ isActive}) => isActive ? "block py-2 pl-3 pr-4 md:p-0 text-white md:text-blue-500 bg-blue-700 md:bg-transparent rounded underline underline-offset-4" : "block py-2 pl-3 pr-4 text-black bg-transparent rounded md:p-0 hover:bg-slate-200 hover:md:bg-transparent"} aria-current="page">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/login" className={({ isActive}) => isActive ? "block py-2 pl-3 pr-4 md:p-0 text-white md:text-blue-500 bg-blue-700 md:bg-transparent rounded underline underline-offset-4" : "block py-2 pl-3 pr-4 text-black bg-transparent rounded md:p-0 dark:text-white hover:bg-slate-200 hover:md:bg-transparent"} aria-current="page">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register" className={({ isActive}) => isActive ? "block py-2 pl-3 pr-4 md:p-0 text-white md:text-blue-500 bg-blue-700 md:bg-transparent rounded underline underline-offset-4" : "block py-2 pl-3 pr-4 text-black bg-transparent rounded md:p-0 dark:text-white hover:bg-slate-200 hover:md:bg-transparent"} aria-current="page">Register</NavLink>
            </li>

          </ul>
        </div>

      </div>
    </nav>

  )
}

export default Navbar

