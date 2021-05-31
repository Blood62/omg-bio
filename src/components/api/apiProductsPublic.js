import axios from "axios/index";

const apiProductsPublic=axios.create({
   baseURL: 'http://localhost:8080/api/public'
});
export default apiProductsPublic;
