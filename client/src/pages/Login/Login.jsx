import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { authContext } from "../../component/Navbar/Authonicate/Authonicate";
import Swal from 'sweetalert2'
import UseAxiosPublic from "../../Hooks/UseAxiosPublic/UseAxiosPublic";
import toast from "react-hot-toast";
import { Spin } from "antd";

function Login() {
  const { loginUser, googleLogin } = useContext(authContext);
  const { state } = useLocation();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const axiosPublic = UseAxiosPublic()

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    setLoader(true)
    loginUser(email, password)
      .then(() => {
        setLoader(false)
        state ? navigate(`${state}`) : navigate(`/`)
      })
      .catch(() => {
        setLoader(false)
        toast.error('Enter valid email or password')
      })
  }

  const handleGoogleSign = () => {
    googleLogin()
      .then(({user}) => {
        
        axiosPublic.put('/addUser', { email: user.email, name: user.displayName,  profession : 'student', photo : user.photoURL})
          .then(() => {
            setLoader(false)
            state ? navigate(`${state}`) : navigate(`/`)
          })
          .catch(() => {
            setLoader(false)
            toast.error('Something wents wrong. Try again !')
          })

      })
      .catch(() => {
        setLoader(false)
        toast.error('Something wents wrong. Try again !')
      })
  }

  return (
    <Spin tip="Loading..." spinning={loader} size="large">
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in your account
              </h1>
              <form onSubmit={handleLogin} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800">Sign In</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Dont have an account? <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register now</Link>
                </p>

                <div className="group w-full flex justify-center items-center mt-5 h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100 cursor-pointer" onClick={handleGoogleSign}>
                  <div className="relative flex justify-between items-center space-x-7">
                    <img src="https://tailus.io/sources/blocks/social/preview/images/google.svg" className="absolute left-0 w-4" alt="google logo" />
                    <span className="text-base font-bold text-gray-700 transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Google</span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Spin>
  )
}

export default Login