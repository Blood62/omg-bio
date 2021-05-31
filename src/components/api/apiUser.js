import axios from "axios/index";


const apiUser=axios.create({
    baseURL:'http://localhost:8080/api'
});
export default apiUser;



apiUser.interceptors.request.use((request)=>{
    const token= window.localStorage.getItem('token');
    request.headers['Authorization']=`Bearer ${token}`;
    return request
});
