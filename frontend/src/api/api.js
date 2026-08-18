import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    console.log("========== API REQUEST ==========");
    console.log("URL:", config.url);
    console.log("TOKEN:", token);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("AUTH HEADER:", config.headers.Authorization);
    } else {
        console.log("NO TOKEN FOUND");
    }

    return config;
});


export default api;

// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://localhost:4000/api",
// });

// api.interceptors.request.use((config) => {

//     const token = localStorage.getItem("token");

//     console.log("TOKEN:", token);
//     console.log("REQUEST:", config.url);

//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
// });

// export default api;