import axios from "axios";


// for local -----
// const http = axios.create({
//     baseURL: "", 
// });


//for prod------
// const http = axios.create({
//   baseURL: "https://hrmsbe.mintwaystech.in",
//   withCredentials: true,
// });

//for render------
const http = axios.create({
  baseURL: "https://hrms-be-c5ke.onrender.com",
  withCredentials: true,
});

export default http;
