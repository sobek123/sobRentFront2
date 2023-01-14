import axios from "axios";

const API_URL = "https://sobrent.herokuapp.com/auth";
const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Allow': 'GET, POST, DELETE'
}

class AuthService{
register(registerRequest){
  return axios.post(API_URL + "/signup", registerRequest)
};

login(loginRequest){
  return axios
    .post(API_URL + "/login",loginRequest)
    .then((response) => {
  
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    }).catch();
};

logout = () => {
  localStorage.removeItem("user");
};

getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

}

export default new AuthService();