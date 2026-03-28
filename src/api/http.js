import axios from "axios";


// for local -----
// const http = axios.create({
//     baseURL: "", 
// });


// for without cookie
const http = axios.create({
  // baseURL: "https://ems-main-5p6r.onrender.com", 
  baseURL: "https://hrmsbe.mintwaystech.in", 

});

// 🔥 attach token in every request
http.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


//for prod------
// const http = axios.create({
//   baseURL: "https://hrmsbe.mintwaystech.in",
//   withCredentials: true,
// });

//for render1------
// const http = axios.create({
//   baseURL: "https://hrms-be-c5ke.onrender.com",
//   withCredentials: true,
// });

//for render2------
// const http = axios.create({
//   baseURL: "https://ems-main-5p6r.onrender.com/",
//   withCredentials: true,
// });



export default http;
