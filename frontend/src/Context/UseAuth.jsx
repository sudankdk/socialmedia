import { createContext, useContext, useState, useEffect } from "react";
import { get_auth , login_token} from "../api/EndPoint";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [loading, setAuthLoading] = useState(true);
  const nav = useNavigate();

  const checkAuth = async () => {
    try {
      await get_auth();
      console.log(get_auth())
      setAuth(true);
    } catch (error) {
      console.error("Authentication check failed:", error);
      setAuth(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const auth_login = async (username, password) => {
    try {
      const data = await login_token(username, password);
      console.log(data)
      if (data.success) {
        setAuth(true);
        nav(`/${username}`);
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Something went wrong during login.");
    }
  };

  useEffect(() => {
    checkAuth();
  }, [window.location.pathname]);

  return (
    <AuthContext.Provider value={{ auth, loading, auth_login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => useContext(AuthContext);
