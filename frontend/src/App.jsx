import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProfile from "./routes/UserProfile";
import Layout from "./Component/Layout";
import Login from "./routes/Login";
import Register from "./routes/Register";
import { AuthProvider } from "./Context/UseAuth";
import PrivateRoute from "./Component/PrivateRoute";

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <Routes>
          <Route
            path="/:username"
            element={
              <Layout>
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
