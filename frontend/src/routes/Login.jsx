import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { login_token } from "../api/EndPoint";
import { UseAuth } from "../Context/UseAuth";

function Login() {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");
  // const nav = useNavigate();
  const { auth_login } = UseAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const data = await login_token(username, password);
    //   if (data.success) {
    //     nav(`/${username}`);
    //   } else {
    //     alert("Invalid username and password");
    //   }
    // } catch (error) {
    //   console.error("Error logging in:", error);
    //   alert("An error occurred during login. Please try again.");
    // }

    auth_login(username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUser(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Dont have an account?{" "}
              <a
                href="/register"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                register
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
