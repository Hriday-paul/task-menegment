import axios from "axios";

const UseAxiosPublic = () => {
    const axiosPub = axios.create({
        baseURL : 'https://task-menegment-server.onrender.com'
    })
    return axiosPub
};

export default UseAxiosPublic;