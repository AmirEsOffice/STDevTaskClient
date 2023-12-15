import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";
import { store } from "../store/configureStore";

const axiosInstance  =axios.create({
  referrerPolicy: 'no-referrer', // Set your desired default Referrer Policy here
});

axiosInstance.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axiosInstance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

axiosInstance.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
//Cors Policy
//axiosInstance.defaults.withCredentials = false;

const responseBody = (response) => response.data;


axiosInstance.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axiosInstance.interceptors.response.use(
  async (response) => {
      return response;
  },
  (error) => {
    console.error("error is :", error);
    if(error?.response){
      const { data, status } = error.response;
      switch (status) {
        case 400:
          if (data.errors) {
            const modelStateErrors = [];
            for (const key in data.errors) {
              if (data.errors[key]) {
                modelStateErrors.push(data.errors[key]);
              }
            }
            throw modelStateErrors.flat();
          }
          toast.error(data.Title);
          break;
        case 401:
          router.navigate("/login", { state: { error: data } });
          break;
        case 500:
          router.navigate("/server-error", { state: { error: data } });
          break;
        default:
          toast.error(data.Title || data.title);
          break;
      }
  
      return Promise.reject(error.response);
    }
    else {
      toast.error("Server Timeout 504.");
      return Promise.reject(error.response);
    }
   
  }
);

const requests = {
  get: (url, params) => axiosInstance.get(url, {params}).then(responseBody),
  post: (url, body) => axiosInstance.post(url, body).then(responseBody),
  put: (url, body) => axiosInstance.put(url, body).then(responseBody),
  del: (url) => axiosInstance.delete(url).then(responseBody)
}

const UserProfile = {
  signIn: (body) => requests.post("/api/user/sign-in/", body),
  signUp: (body) => requests.post("/api/user/sign-up/", body),
  currentUser: () => requests.get("/api/user/me/",""),
  refreshToken: (body) => requests.post("/api/user/refresh/",body),
  logOut: (body) => requests.post("/api/user/logout/",body),
};

const Posts = {
  List:() =>requests.get("/api/post/crud/",""),
  getOneById:(id) =>requests.get(`/api/post/crud/${id}`,""),
  Delete:(id) =>requests.del(`/api/post/crud/${id}`),
  Update:(id,body) =>requests.put(`/api/post/crud/${id}`,body),
  Add:(body) =>requests.post(`/api/post/crud`,body),
}

const Category = {
  List:()=>requests.get("/api/category/","")
}

const agent = {
  UserProfile,
  Category,
  Posts
};

export default agent;
