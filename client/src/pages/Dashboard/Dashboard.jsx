import { NavLink, Outlet, useLocation } from "react-router-dom";
import logo from '../../../public/thumbnail-184659-removebg-preview.png'
import { IoIosNotificationsOutline } from "react-icons/io";
import { Badge } from "antd";
import { useContext, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { authContext } from "../../component/Navbar/Authonicate/Authonicate";
import { CiUser } from "react-icons/ci";
import { HiLogout } from "react-icons/hi";
import { LuLayoutDashboard, LuListTodo } from "react-icons/lu";

const Dashboard = () => {
    const { userInfo } = useContext(authContext);
    const [showDropDown, setShowDropDown] = useState(false)
    const location = useLocation();
    return (
        <div>
            <nav className="bg-gradient-to-r from-[#D78AFF] to-[#9E58FF]">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
                    <NavLink to='/' className="flex items-center">
                        <img className='h-16' src={logo} alt="logo" />
                        <span className="self-center text-2xl text-white font-semibold font-mono whitespace-nowrap">Tasker</span>
                    </NavLink>

                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                        <ul className="flex flex-col items-center font-medium rounded-lg md:flex-row md:space-x-8">
                            <li>
                                <Badge count={5} color="rgb(45, 183, 245)" >
                                    <IoIosNotificationsOutline className="text-3xl text-white"></IoIosNotificationsOutline>
                                </Badge>

                            </li>
                            <li className="flex items-center justify-center">
                                <img className='h-9 rounded-full' src={userInfo?.photoURL !== null ? `${userInfo.photoURL}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />

                                <div className="relative flex items-center cursor-pointer" onClick={() => setShowDropDown(!showDropDown)}>
                                    <p className="text-white font-sans  text-lg ml-1">Profile</p>
                                    <RiArrowDropDownLine className={showDropDown ? 'text-3xl text-white -ml-1 rotate-180 duration-100' : 'text-3xl text-white -ml-1 duration-100'}></RiArrowDropDownLine>
                                    <span className={showDropDown ? 'absolute top-12 right-0 block' : 'absolute top-12 right-0 hidden'}>
                                        <ul className="w-36 bg-white border shadow-md">
                                            <li className="hover:bg-gray-100 p-2 cursor-pointer flex gap-x-1 items-center">
                                                <CiUser></CiUser><p className="text-sm font-sans">My Profile</p>
                                            </li>
                                            <li className="hover:bg-gray-100 p-2 cursor-pointer flex gap-x-1 items-center">
                                                <HiLogout></HiLogout><p className="text-sm font-sans">Logout</p>
                                            </li>
                                        </ul>
                                    </span>
                                </div>
                            </li>

                        </ul>
                    </div>

                </div>
            </nav>
            <div className="flex flex-row">
                <div className="w-80 bg-gradient-to-br from-[#677AE5] to-[#8577C8] h-[calc(100vh-64px)] hidden lg:block">
                    <div className="flex gap-x-1 justify-center items-center py-2 bg-[#989de7]">
                        <img className="h-12 rounded-full" src={userInfo?.photoURL !== null ? `${userInfo.photoURL}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                        <span>
                            <span className="block text-lg font-medium font-serif text-white">{userInfo?.displayName}</span>
                            <span className="block text-xs text-white">{userInfo?.email}</span>
                        </span>
                    </div>
                    <div>
                        <h2 className="text-lg font-medium text-white font-serif p-5 pb-0">Main</h2>
                        <NavLink to="/dashboard" className={location.pathname == '/dashboard' ? "w-full text-white my-3 flex flex-row justify-start items-center p-3 bg-[#989de7] hover:bg-[#989de7] duration-100" : "w-full my-3 flex flex-row items-center justify-start p-3 bg-transparent hover:bg-[#989de7] duration-100"} >
                            <LuLayoutDashboard className="text-white text-2xl mr-2"></LuLayoutDashboard>
                            <h4 className="text-lg text-white font-serif font-medium">Dashboard</h4>
                        </NavLink>
                        <NavLink to="/dashboard/todos" className={({ isActive }) => isActive ? "w-full text-white my-3 flex flex-row justify-start items-center p-3 bg-[#989de7] hover:bg-[#989de7] duration-100" : "w-full my-3 flex flex-row items-center justify-start p-3 bg-transparent hover:bg-[#989de7] duration-100"} >
                            <LuListTodo className="text-white text-2xl mr-2"></LuListTodo>
                            <h4 className="text-lg text-white font-serif font-medium">Tasks</h4>
                        </NavLink>
                    </div>
                </div>

                <div className="w-full bg-slate-100 h-[calc(100vh-64px)] p-4 md:p-8 lg:p-10 overflow-auto">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;