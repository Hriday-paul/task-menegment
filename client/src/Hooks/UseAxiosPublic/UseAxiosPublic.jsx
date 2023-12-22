import axios from "axios";

const UseAxiosPublic = () => {
    const axiosPub = axios.create({
        baseURL : 'http://localhost:4000'
    })
    return axiosPub
};

export default UseAxiosPublic;