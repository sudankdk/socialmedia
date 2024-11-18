import { useNavigate } from "react-router-dom";
import { UseAuth } from "../Context/UseAuth";

const PrivateRoute = ({ children }) => {
  const nav = useNavigate();
  const { auth, authLoading } = UseAuth();

  if (authLoading) {
    return <p>Loading....</p>;
  }
  if (auth) {
    return children;
  } else {
    return nav(`/login/`);
  }
};

export default PrivateRoute;
