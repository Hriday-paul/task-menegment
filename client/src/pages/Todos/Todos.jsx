import { useContext, useEffect, useState } from "react";
import { RiTaskLine } from "react-icons/ri";
import NewTaskDrawer from "./NewTaskDrawer/NewTaskDrawer";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic/UseAxiosPublic";
import { authContext } from "../../component/Navbar/Authonicate/Authonicate";
import { TiEdit } from "react-icons/ti";
import { AiOutlineDelete } from "react-icons/ai";
import UpdateTask from "./UpdateTask/UpdateTask";

const Todos = () => {
    const [open, setOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false)
    const axiosPublic = UseAxiosPublic();
    const { userInfo } = useContext(authContext);
    const [todos, setTodos] = useState([]);

    const fetchTasks = () => {
        axiosPublic.get(`/getTasks/${userInfo.email}`)
            .then(({ data }) => {
                setTodos(data)
            })
    }

    useEffect(() => {
        fetchTasks();
    }, [])




    return (
        <div>
            <div className="bg-white rounded-md p-2 flex gap-x-3 items-center">
                <span className="p-2 bg-gradient-to-r from-[#D78AFF] to-[#9E58FF] inline-block rounded-sm">
                    <RiTaskLine className="text-xl text-white "></RiTaskLine>
                </span>
                <h4 className="text-xl font-medium font-serif">Tasks</h4>
            </div>

            <div className="flex justify-end">
                <button onClick={() => setOpen(true)} className="bg-gradient-to-r from-[#D78AFF] to-[#9E58FF] btn text-white my-3 md:my-5">Add New</button>
            </div>

            {
                open && <NewTaskDrawer setOpen={setOpen} fetchTasks={fetchTasks}></NewTaskDrawer>
            }

            <div className="bg-white border-t-4 border-[#9E58FF] p-5 rounded-lg flex flex-row  gap-x-5">

                {/* pending task */}
                <div className="w-1/2">
                    <h1 className="text-center text-xl my-3 font-medium font-serif">Pending task</h1>
                    <div className="flex flex-col flex-wrap">
                        {
                            todos && todos.map((todo) => {
                                return <div key={todo._id} className="shadow-md border-t-2 border-[#9E58FF] rounded-md p-3 my-3 relative">
                                    <div className="flex flex-row gap-x-2 items-center">
                                        <img className="h-12 rounded-full" src={todo?.photo} alt="img" />
                                        <span className="flex items-center gap-x-2">
                                            <h2 className="text-center text-lg my-3 font-bold font-serif text-[#4155d3] ">{todo?.title[0].toUpperCase() + todo?.title.slice(1)}</h2>
                                            <h2 className="text-lg font-bold font-serif text-[#9F59FF]">[{todo?.priority}]</h2>
                                        </span>

                                    </div>
                                    <p className="text-base my-3 font-serif text-gray-700">{todo?.description}</p>

                                    <div className="absolute top-2 right-2 space-x-1">
                                        <button onClick={() => setUpdateOpen(true)} className="bg-gradient-to-r from-[#D78AFF] to-[#9E58FF] btn btn-sm text-white">
                                            <TiEdit></TiEdit>
                                        </button>
                                        <button className="bg-gradient-to-r from-[#D78AFF] to-[#9E58FF] btn btn-sm text-white">
                                            <AiOutlineDelete></AiOutlineDelete>
                                        </button>
                                        {
                                            updateOpen && <UpdateTask setUpdateOpen={setUpdateOpen} fetchTasks={fetchTasks} data={todo}></UpdateTask>
                                        }
                                    </div>

                                    <span className="absolute bottom-2 right-2 text-xs font-medium font-sans text-red-400">{new Date(todo?.dedline).getDate() + '/' + (new Date(todo?.dedline).getMonth() + 1) + '/' + new Date(todo?.dedline).getFullYear()}</span>
                                </div>
                            })
                        }
                    </div>
                </div>

                {/* completed task */}
                <div className="w-1/2">
                    <h1 className="text-center text-xl my-3 font-medium font-serif">Completed task</h1>
                    <div className="flex flex-row flex-wrap w-1/2">
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Todos;