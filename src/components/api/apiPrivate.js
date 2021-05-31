import axios from "axios/index";


const apiPrivate=axios.create({
    baseURL:'http://localhost:8080/api/'
});

export default apiPrivate;





apiPrivate.interceptors.request.use((request)=>{
    const token= window.localStorage.getItem('token');
    request.headers['Authorization']=`Bearer ${token}`;
    return request
});
