import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginPage = () => {
  const [email, setEmail] = useState("shubhamvk2607@gmail.com");
  const [password, setPassword] = useState("Priyam@123");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const submitHandler = async () => {
    try {
      await axios.post(
        "http://localhost:7777/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      navigate("/");
    } catch (error) {
      if (error.status === 400) setError(error.response.data);
    }
  };

  return (
    <div className="bg-blue-100 w-screen h-screen flex justify-center items-center">
      <div className="card bg-neutral text-neutral-content w-96 pt-8">
        <div className="card-body items-center text-center flex flex-col gap-5">
          <h1 className="text-3xl font-bold mb-6">LOGIN</h1>
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full max-w-xs text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <h1>
            New User ?<Link to={"/signup"}> Create your Profile</Link>
          </h1>
          {error && <h1 className="text-red-500">{error}</h1>}
          <button
            className="btn btn-primary mt-4 text-2xl"
            onClick={submitHandler}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
