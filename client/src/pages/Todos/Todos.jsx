import { useContext, useEffect, useState } from "react";
import { RiTaskLine } from "react-icons/ri";
import NewTaskDrawer from "./NewTaskDrawer/NewTaskDrawer";
import UseAxiosPublic from "../../Hooks/UseAxiosPublic/UseAxiosPublic";
import { authContext } from "../../component/Navbar/Authonicate/Authonicate";
import { TiEdit } from "react-icons/ti";
import { AiOutlineDelete } from "react-icons/ai";
import UpdateTask from "./UpdateTask/UpdateTask";
import { Button, Drawer, Space } from "antd";
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const Todos = () => {
    const [open, setOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false)
    const axiosPublic = UseAxiosPublic();
    const { userInfo } = useContext(authContext);
    const [todos, setTodos] = useState([]);
    const [ongoing, setOngoing] = useState([]);
    const [updateData, setUpdateData] = useState('');
    const [completedTodos, setCompletedTodos] = useState([])

    const fetchTasks = () => {
        axiosPublic.get(`/getTasks/${userInfo.email}`)
            .then(({ data }) => {
                const filterCompleteTodo = data?.filter((item) => {
                    return item.status === 'complete'
                })
                const filterPendingTodos = data?.filter((item) => {
                    return item.status === 'pending'
                })
                const filteronGoingTodos = data?.filter((item) => {
                    return item.status === 'ongoing'
                })
                setCompletedTodos(filterCompleteTodo)
                setTodos(filterPendingTodos)
                setOngoing(filteronGoingTodos)
            })
    }

    useEffect(() => {
        fetchTasks();
    }, [])

    const updateDrower = (todo) => {
        setUpdateOpen(true);
        setUpdateData(todo)
    }

    const closeUpdateDrawer = () => {
        setUpdateOpen(false);
        setUpdateData('')
    }

    const deleteTask = (id) => {
        Swal.fire({
            text: "Are you sure want to delete this task!",
            icon: `warning`,
            cancelButtonText: "No",
            showCancelButton: true,
            confirmButtonText: 'Yes',
            showCloseButton: true,
        })
            .then(result => {
                if (result.isConfirmed) {
                    axiosPublic.delete(`/deleteTasks/${id}`)
                        .then(() => {
                            toast.success('Task delete successful');
                            fetchTasks();
                        })
                        .catch(() => {
                            toast.error('Failed, Try again !');
                        })
                }

            })
    }

    const onDropEnd = async (result) => {
        let selectedTask;
        const runingTask = todos;
        const okTask = completedTodos;
        const ongoingTask = ongoing;

        const { source, destination } = result;
        if (!destination) {
            return
        }
        if (source.droppableId == destination.droppableId && source.index == destination.index) {
            return
        }

        if (source.droppableId == 'runningTask') {
            selectedTask = await runingTask[source.index];
            runingTask.splice(source.index, 1)

        } else if (source.droppableId == 'completedTask') {
            selectedTask = await okTask[source.index];
            okTask.splice(source.index, 1);
        } else {
            selectedTask = await ongoingTask[source.index];
            ongoingTask.splice(source.index, 1);
        }

        if (destination.droppableId == 'runningTask') {
            selectedTask = { ...selectedTask, status: 'pending' }
            runingTask.splice(destination.index, 0, selectedTask)
        } else if (destination.droppableId == 'completedTask') {
            selectedTask = { ...selectedTask, status: 'complete' }
            okTask.splice(destination.index, 0, selectedTask)
        } else {
            selectedTask = { ...selectedTask, status: 'ongoing' }
            ongoingTask.splice(destination.index, 0, selectedTask)
        }

        await setCompletedTodos(okTask)
        await setTodos(runingTask)
        await setOngoing(ongoingTask)

        await axiosPublic.put('/updateTask', { id: selectedTask._id, status: selectedTask.status })
    }


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

            <div className="bg-white border-t-4 border-[#9E58FF] p-5 rounded-lg flex flex-col md:flex-row gap-y-5 md:gap-y-0 gap-x-0 flex-wrap">
                <DragDropContext onDragEnd={onDropEnd}>

                    {/* pending task */}

                    <Droppable droppableId="runningTask">
                        {
                            (provided) => (
                                <div className=" w-full md:w-1/3" ref={provided.innerRef} {...provided.droppableProps}>
                                    <h1 className="text-center text-xl my-3 font-medium font-serif">To - do</h1>
                                    <div className="flex flex-col flex-wrap pr-5">
                                        {
                                            todos && todos?.map((todo, indx) => {
                                                return <Draggable draggableId={todo._id} key={todo._id} index={indx}>
                                                    {
                                                        (provided) => (
                                                            <div className="shadow-md bg-white border-t-2 border-[#9E58FF] rounded-md p-3 my-3 relative" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                                <div className="flex flex-row gap-x-2 items-center">
                                                                    <img className="h-12 rounded-full" src={todo?.photo ? todo?.photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                                                                    <span className="flex items-center gap-x-2">
                                                                        <h2 className="text-center text-lg my-3 font-bold font-serif text-[#4155d3] ">{todo?.title[0].toUpperCase() + todo?.title.slice(1)}</h2>
                                                                        <h2 className="text-lg font-bold font-serif text-[#9F59FF]">[{todo?.priority}]</h2>
                                                                    </span>

                                                                </div>
                                                                <p className="text-base my-3 font-serif text-gray-700">{todo?.description}</p>

                                                                <div className="absolute top-4 right-2 space-x-1">
                                                                    <button onClick={() => updateDrower(todo)} className="bg-gradient-to-r from-[#D78AFF] to-[#9E58FF] btn btn-sm text-white">
                                                                        <TiEdit></TiEdit>
                                                                    </button>
                                                                    <button onClick={() => deleteTask(todo._id)} className="bg-gradient-to-r from-[#D78AFF] to-[#9E58FF] btn btn-sm text-white">
                                                                        <AiOutlineDelete></AiOutlineDelete>
                                                                    </button>

                                                                    <Drawer
                                                                        title="Update Task"
                                                                        width={720}
                                                                        onClose={closeUpdateDrawer}
                                                                        open={updateOpen}
                                                                        styles={{
                                                                            body: {
                                                                                paddingBottom: 20,
                                                                            },
                                                                        }}
                                                                        extra={
                                                                            <Space>
                                                                                <Button onClick={closeUpdateDrawer}>Cancel</Button>
                                                                            </Space>
                                                                        }
                                                                    >
                                                                        {
                                                                            updateOpen && <UpdateTask fetchTasks={fetchTasks} data={updateData}></UpdateTask>
                                                                        }

                                                                    </Drawer>
                                                                </div>

                                                                <span className="absolute bottom-2 right-2 text-xs font-medium font-sans text-red-400">{new Date(todo?.dedline).getDate() + '/' + (new Date(todo?.dedline).getMonth() + 1) + '/' + new Date(todo?.dedline).getFullYear()}</span>
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            })
                                        }
                                        {provided.placeholder}
                                    </div>
                                </div>

                            )
                        }

                    </Droppable>

                    {/* ongoing task */}

                    <Droppable droppableId="ongoingTask">
                        {
                            (provided) => (
                                <div className="w-full md:w-1/3" ref={provided.innerRef} {...provided.droppableProps}>
                                    <h1 className="text-center text-xl my-3 font-medium font-serif">On Going Task</h1>
                                    <div className="flex flex-col flex-wrap" >
                                        {
                                            ongoing && ongoing.map((todo, indx) => {
                                                return <Draggable draggableId={todo._id} key={todo._id} index={indx}>
                                                    {
                                                        (provided) => (
                                                            <div className="shadow-md bg-white border-t-2 border-[#9E58FF] rounded-md p-3 my-3 relative" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                                <div className="flex flex-row gap-x-2 items-center">
                                                                    <img className="h-12 rounded-full" src={todo?.photo ? todo?.photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                                                                    <span className="flex items-center gap-x-2">
                                                                        <h2 className="text-center text-lg my-3 font-bold font-serif text-[#4155d3] ">{todo?.title[0].toUpperCase() + todo?.title.slice(1)}</h2>
                                                                        <h2 className="text-lg font-bold font-serif text-[#9F59FF]">[{todo?.priority}]</h2>
                                                                    </span>

                                                                </div>
                                                                <p className="text-base my-3 font-serif text-gray-700">{todo?.description}</p>

                                                                <div className="absolute top-4 right-2 space-x-1">
                                                                    <button onClick={() => updateDrower(todo)} className="bg-gradient-to-r from-[#D78AFF] to-[#9E58FF] btn btn-sm text-white">
                                                                        <TiEdit></TiEdit>
                                                                    </button>
                                                                    <button onClick={() => deleteTask(todo._id)} className="bg-gradient-to-r from-[#D78AFF] to-[#9E58FF] btn btn-sm text-white">
                                                                        <AiOutlineDelete></AiOutlineDelete>
                                                                    </button>

                                                                    <Drawer
                                                                        title="Update Task"
                                                                        width={720}
                                                                        onClose={closeUpdateDrawer}
                                                                        open={updateOpen}
                                                                        styles={{
                                                                            body: {
                                                                                paddingBottom: 20,
                                                                            },
                                                                        }}
                                                                        extra={
                                                                            <Space>
                                                                                <Button onClick={closeUpdateDrawer}>Cancel</Button>
                                                                            </Space>
                                                                        }
                                                                    >
                                                                        {
                                                                            updateOpen && <UpdateTask fetchTasks={fetchTasks} data={updateData}></UpdateTask>
                                                                        }

                                                                    </Drawer>
                                                                </div>

                                                                <span className="absolute bottom-2 right-2 text-xs font-medium font-sans text-red-400">{new Date(todo?.dedline).getDate() + '/' + (new Date(todo?.dedline).getMonth() + 1) + '/' + new Date(todo?.dedline).getFullYear()}</span>
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            })
                                        }
                                        {provided.placeholder}
                                    </div>
                                </div>

                            )
                        }
                    </Droppable>


                    {/* completed task */}

                    <Droppable droppableId="completedTask">
                        {
                            (provided) => (
                                <div className="w-full md:w-1/3" ref={provided.innerRef} {...provided.droppableProps}>
                                    <h1 className="text-center text-xl my-3 font-medium font-serif">Completed task</h1>
                                    <div className="flex flex-col flex-wrap" >
                                        {
                                            completedTodos && completedTodos.map((todo, indx) => {
                                                return <Draggable draggableId={todo._id} key={todo._id} index={indx}>
                                                    {
                                                        (provided) => (
                                                            <div className="shadow-md bg-white border-t-2 border-[#9E58FF] rounded-md p-3 my-3 relative" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                                <div className="flex flex-row gap-x-2 items-center">
                                                                    <img className="h-12 rounded-full" src={todo?.photo ? todo?.photo : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />
                                                                    <span className="flex items-center gap-x-2">
                                                                        <h2 className="text-center text-lg my-3 font-bold font-serif text-[#4155d3] ">{todo?.title[0].toUpperCase() + todo?.title.slice(1)}</h2>
                                                                        <h2 className="text-lg font-bold font-serif text-[#9F59FF]">[{todo?.priority}]</h2>
                                                                    </span>

                                                                </div>
                                                                <p className="text-base my-3 font-serif text-gray-700">{todo?.description}</p>

                                                                <div className="absolute top-4 right-2 space-x-1">
                                                                    <button onClick={() => updateDrower(todo)} className="bg-gradient-to-r from-[#D78AFF] to-[#9E58FF] btn btn-sm text-white">
                                                                        <TiEdit></TiEdit>
                                                                    </button>
                                                                    <button onClick={() => deleteTask(todo._id)} className="bg-gradient-to-r from-[#D78AFF] to-[#9E58FF] btn btn-sm text-white">
                                                                        <AiOutlineDelete></AiOutlineDelete>
                                                                    </button>

                                                                    <Drawer
                                                                        title="Update Task"
                                                                        width={720}
                                                                        onClose={closeUpdateDrawer}
                                                                        open={updateOpen}
                                                                        styles={{
                                                                            body: {
                                                                                paddingBottom: 20,
                                                                            },
                                                                        }}
                                                                        extra={
                                                                            <Space>
                                                                                <Button onClick={closeUpdateDrawer}>Cancel</Button>
                                                                            </Space>
                                                                        }
                                                                    >
                                                                        {
                                                                            updateOpen && <UpdateTask fetchTasks={fetchTasks} data={updateData}></UpdateTask>
                                                                        }

                                                                    </Drawer>
                                                                </div>

                                                                <span className="absolute bottom-2 right-2 text-xs font-medium font-sans text-red-400">{new Date(todo?.dedline).getDate() + '/' + (new Date(todo?.dedline).getMonth() + 1) + '/' + new Date(todo?.dedline).getFullYear()}</span>
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            })
                                        }
                                        {provided.placeholder}
                                    </div>
                                </div>

                            )
                        }
                    </Droppable>

                </DragDropContext>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default Todos;