import Search from "antd/es/input/Search"
import { IoSearch } from 'react-icons/io5';
import homeBg from '../../../public/home-bg.png'
import { DiCodeBadge } from "react-icons/di";
import { RiBankCardFill } from "react-icons/ri";
import { PiStudentFill } from "react-icons/pi";
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

function Home() {

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-0 lg:gap-x-5  gap-y-5 items-center h-screen">
        <div data-aos="fade-right" className="order-2 md:order-1 text-center md:text-left">
          <h2 className="text-3xl lg:text-4xl font-bold uppercase text-indigo-950 mb-2">
            Creat any task <span className="text-orange-600">&</span> complete.
          </h2>
          <h1 className="font-extrabold text-transparent text-6xl lg:text-7xl bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-950">Your Task</h1>

          <Search
            className='w-2/3 mt-5 -z-50'
            placeholder="search here ...."
            allowClear
            enterButton={<IoSearch className='text-2xl'></IoSearch>}
            size="large"
            onSearch={onSearch}
          />

        </div>
        <div data-aos="fade-left" className="order-1 md:order-2 mx-auto">
          <img className="mt-16 md:mt-10 lg:mt-16" src={homeBg} alt="bg image" />
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 mt-14 mb-5 md:mt-20 text-center flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl uppercase font-bold text-center text-indigo-950 my-10 lg:my-16 text-transparent  bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-950">What Type User Use This ?</h2>
        <div className="flex flex-wrap mx-auto flex-col md:flex-row justify-center gap-x-0 gap-y-5 md:gap-5 lg:gap-10">
          <div data-aos="zoom-in-up" className="text-center p-8 shadow-xl rounded-md w-80 md:w-72 ">
            <div className="p-5 bg-[#76CEFE] inline-block rounded-md">
              <DiCodeBadge className="text-white text-5xl"></DiCodeBadge>
            </div>
            <h3 className="text-3xl font-bold flex-grow text-center text-slate-900 my-5">
              Developer
            </h3>
            <p className="text-lg text-slate-900">
              Many developer use this website.
            </p>
          </div>
          <div data-aos="zoom-in-up" className="text-center p-8 shadow-xl rounded-md w-80 md:w-72 ">
            <div className="p-5 bg-[#FFA640] inline-block rounded-md">
              <RiBankCardFill className="text-white text-5xl"></RiBankCardFill>
            </div>
            <h3 className="text-3xl font-bold text-center text-slate-900 my-5">
              Bankers
            </h3>
            <p className="text-lg text-slate-900">
              Many bankers manage his task useing it.
            </p>
          </div>
          <div data-aos="zoom-in-up" className="text-center p-8 shadow-xl rounded-md w-80 md:w-72 ">
            <div className="p-5 bg-[#FF507E] inline-block rounded-md">
              <PiStudentFill className="text-white text-5xl"></PiStudentFill>
            </div>
            <h3 className="text-2xl font-bold text-center text-slate-900 my-5">
              Students
            </h3>
            <p className="text-lg text-slate-900">
              Many students use this website & manage group taask.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home