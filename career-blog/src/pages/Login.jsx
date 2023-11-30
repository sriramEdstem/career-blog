import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import DarkLight from "../components/Header/DarkLight";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  // setError(useSelector((state) => state.auth.error));
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const actionResult = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(actionResult)) {
      navigate(from, { replace: true });
    } else {
      setError("Password or Email is incorrect");
    }
  };

  return (
    <div>
      <div className=" pt-8 mx-[49%]">
        <DarkLight></DarkLight>
      </div>
      <div className="flex flex-col justify-center gap-8 items-center w-full h-[100vh]">
        <h1 className=" text-3xl mt-[-100px]">Login</h1>
        <form
          className="flex gap-2 justify-center flex-col "
          onSubmit={handleSubmit}
        >
          <input
            required
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            className="px-4 border-2 py-3 dark:bg-custm-black"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            className=" px-4 border-2 py-3 dark:bg-custm-black"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button type="submit" className=" text-xl border-2 py-1 my-2 px-3">
              Login
            </button>
          </div>
          {error && <p>{error}</p>}
          <div>
            <span>
              Dont have an account?{" "}
              <Link to="/register">
                <span className=" underline">Register</span>
              </Link>
            </span>
          </div>
          {/* {token && <p>Token: {token}</p>} */}
        </form>
      </div>
    </div>
  );
};

export default Login;
