import axios from "axios";
import { SERVER_URL } from "../Constants/Constants";

const BASE_URL = SERVER_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original_request = error.config;
    if (error.response?.status === 401 && !original_request._retry) {
      original_request._retry = true;
      try {
        await refresh_token();
        return api(original_request);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const get_user_profile_data = async (username) => {
  try {
   

    const response = await api.get(`/user_data/${username}`);

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile data:", error);
    throw error;
  }
};

// export const get_user_profile_data = async (username) => {
//   try {
//     const accessToken = localStorage.getItem("access_token");  // or get from cookies
//     const response = await api.get(`/user_data/${username}`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,  // Attach the token here
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch user profile data:", error);
//     throw error;
//   }
// };
const refresh_token = async () => {
  const response = await api.post("/token/refresh/");
  console.log(response.data);
  return response.data;
};

// const refresh_token = async () => {
//   const response = await api.post("/token/refresh/");
//   if (response.data.access) {
//     // Store the new access token
//     localStorage.setItem("access_token", response.data.access);
//   }
//   return response.data;
// };

export const login_token = async (username, password) => {
  try {
    const response = await api.post("/token/", { username, password });
    // console.log(response.data);
    // const { access_token } = response.data;
    // console.log(access_token);
    // localStorage.setItem("access_token", access_token);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
export const register = async (
  username,
  email,
  firstName,
  lastName,
  password
) => {
  try {
    const response = await api.post("/register/", {
      username,
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    });

    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error; // Rethrow to allow further handling in calling functions
  }
};

export const get_auth = async () => {
  try {
    const response = await api.get(`/authenticated/`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Failed auth:", error);
    throw error;
  }
};
