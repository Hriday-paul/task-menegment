import { Button, DatePicker, Drawer, Input, Select, Space, Spin } from "antd";
import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { authContext } from "../../../component/Navbar/Authonicate/Authonicate";
import UseAxiosPublic from "../../../Hooks/UseAxiosPublic/UseAxiosPublic";
import { Controller, useForm } from "react-hook-form";
import { BiTask } from "react-icons/bi";
import dayjs from 'dayjs';
import 'dayjs/locale/en';
dayjs.locale('en');

const dateFormat = 'YYYY/MM/DD';

const UpdateTask = ({ data, fetchTasks }) => {
    const [loading, setLoading] = useState(false);
    const { userInfo } = useContext(authContext);
    const axiosPublic = UseAxiosPublic();
    
    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = async (userData) => {
        setLoading(true)
        const taskData = { ...userData, priority : parseInt(userData.priority), dedline: Date.parse(userData.dedline.$d), user: userInfo.email, id : data._id}

        axiosPublic.put('/updateTask', taskData)
            .then(() => {
                setLoading(false);
                toast.success('Task update successful');
                fetchTasks();
            })
            .catch(() => {
                setLoading(false);
                toast.error('Failed, Try again !');
            })
    }
    return (
        <>

            <Spin tip="Loading..." spinning={loading} size="large">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6 p-5 py-10" action="#">

                    <div>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title <span className="text-red-500">*</span></label>
                        <Controller
                            name="title"
                            control={control}
                            defaultValue={`${data?.title}`}
                            render={({ field }) => (
                                <Input
                                    size="large"
                                    type="text"
                                    id="title"
                                    placeholder="Task title..."
                                    prefix={<BiTask />}
                                    {...field}
                                //{...register("title", { required: 'Title is required' })}
                                />
                            )}
                            rules={{ required: 'title is required' }}
                        />

                        {errors.title?.type === "required" && (
                            <p className="text-sm text-red-500 mt-2" role="alert">Title is required.</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900">Proirity <span className="text-red-500">*</span></label>
                        <Controller
                            name="priority"
                            defaultValue={`${data?.priority}`}
                            control={control}
                            render={({ field }) => (
                                <Select
                                    id="priority"
                                    className="w-full h-10"
                                    placeholder="Select a priority"
                                    optionFilterProp="children"
                                    filterOption={filterOption}
                                    {...register("priority", { required: "Priority is required" })}
                                    {...field}
                                    options={[
                                        {
                                            value: 3,
                                            label: 'Low',
                                        },
                                        {
                                            value: 2,
                                            label: 'Medium',
                                        },
                                        {
                                            value: 1,
                                            label: 'High',
                                        }
                                    ]}
                                />
                            )}
                            rules={{ required: 'priority is required' }}
                        />
                        {errors.priority?.type === "required" && (
                            <p className="text-sm text-red-500 mt-2" role="alert">Priority is required</p>
                        )}

                    </div>

                    <div>
                        <label htmlFor="dedline" className="block mb-2 text-sm font-medium text-gray-900">Dedline <span className="text-red-500">*</span></label>
                        <Controller
                            name="dedline"
                            defaultValue={dayjs(`${(new Date(data?.dedline).getFullYear()) + '/' + (new Date(data?.dedline).getMonth() + 1) + '/' + (new Date(data?.dedline).getDate())}`, dateFormat)}
                            format={dateFormat}
                            control={control}
                            render={({ field }) => (
                                <DatePicker placeholder={'Select dedline'} className='w-full h-10' {...register("dedline", { required: "Dedline is required" })}
                                    {...field} />
                            )}
                            rules={{ required: 'Dedline is required' }}
                        />

                        {errors.dedline?.type === "required" && (
                            <p className="text-sm text-red-500 mt-2" role="alert">Dedline is required.</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description <span className="text-red-500">*</span></label>
                        <Controller
                            name="description"
                            defaultValue={`${data?.description}`}
                            control={control}
                            render={({ field }) => (
                                <Input.TextArea id={'description'} rows={4} placeholder="please enter task description" {...register("description", { required: "Description is required" })}
                                    {...field} />
                            )}
                            rules={{ required: 'Description is required' }}
                        />

                        {errors.description?.type === "required" && (
                            <p className="text-sm text-red-500 mt-2" role="alert">Description is required.</p>
                        )}
                    </div>


                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update Task</button>

                </form>

            </Spin>
            <Toaster></Toaster>
        </>
    );
};

export default UpdateTask;