
import { NavLink } from 'react-router-dom'
import logo from '../../../public/thumbnail-184659-removebg-preview.png'
import { RiMenu3Fill } from "react-icons/ri";
import { useState } from 'react';
import { GiTireIronCross } from "react-icons/gi";


function Navbar() {
  const [slide, setSlide] = useState(false)
  return (
    <nav className="bg-[#FFFFFF] fixed w-full md:opacity-90 z-50">
      <div className="max-w-screen-xl flex  items-center justify-between mx-auto p-4">
        <NavLink to='/' className="flex items-center">
          <img className='h-10' src={logo} alt="logo" />
          <span className="self-center text-2xl text-black font-semibold font-mono whitespace-nowrap">Tasker</span>
        </NavLink>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex  font-medium p-4 md:p-0 rounded-lg md:flex-row md:space-x-8">
            <li>
              <NavLink to="/" className={({ isActive }) => isActive ? "text-base font-medium text-black underline-offset-4 underline decoration-dashed" : "text-base font-medium text-black hover:underline-offset-4 hover:underline hover:decoration-dashed"} aria-current="page">Home</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className="text-base font-medium text-black hover:underline-offset-4 hover:underline hover:decoration-dashed" aria-current="page">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/login" className="text-base font-medium text-black hover:underline-offset-4 hover:underline hover:decoration-dashed" aria-current="page">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register" className="text-base font-medium text-black hover:underline-offset-4 hover:underline hover:decoration-dashed" aria-current="page">Register</NavLink>
            </li>

          </ul>
        </div>

        <div className='md:hidden'>
          {
            !slide && <RiMenu3Fill onClick={()=>setSlide(true)} className='text-2xl'></RiMenu3Fill>
          }
          {
            slide && <GiTireIronCross onClick={()=>setSlide(false)}></GiTireIronCross>
          }
          
        </div>

        <div className={`absolute border-t md:hidden block top-0 left-0 py-5 shadow-2xl bg-white mt-[60px] md:mt-[70px] w-4/5 h-[calc(100vh-72px)]  ${slide ? "z-50 translate-x-0" : "-translate-x-[750px]"} duration-300`}>
          <div className='px-5'>
            <ul className="py-5 rounded-md">
              <li>
                <NavLink to="/" onClick={() => setSlide(false)} className="block py-2 pl-3 text-black pr-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 duration-200 cursor-pointer">Home</NavLink>
              </li>
              <li>
                <NavLink to="/dashboard" onClick={() => setSlide(false)} className="block py-2 pl-3 text-black pr-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 duration-200 cursor-pointer">Dashboard</NavLink>
              </li>

              <li>
                <NavLink to="/login" onClick={() => setSlide(false)} className="block py-2 pl-3 text-black pr-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 duration-200 cursor-pointer">Login</NavLink>
              </li>
              <li>
                <NavLink to="/register" onClick={() => setSlide(false)} className="block py-2 pl-3 text-black pr-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 duration-200 cursor-pointer">Register</NavLink>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </nav>

  )
}

export default Navbar

