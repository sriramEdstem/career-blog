import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../regSlice";
import DarkLight from "../components/Header/DarkLight";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.registration.loading);
  const error = useSelector((state) => state.registration.error);
  const successMessage = useSelector(
    (state) => state.registration.successMessage
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div>
      <div className=" pt-8 mx-[49%]">
        <DarkLight></DarkLight>
      </div>
      <div className="flex h-[100vh] flex-col justify-center items-center w-full gap-8 ">
        <h1 className=" text-3xl">Register</h1>

        <form
          className=" flex flex-col justify-center gap-3"
          onSubmit={handleSubmit}
        >
          <div>
            <input
              type="name"
              className="border-2 py-3 dark:bg-custm-black"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              className="border-2 py-3 dark:bg-custm-black "
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className="border-2 py-3 dark:bg-custm-black"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              className=" text-xl border-2 py-1 my-2 px-3"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
          <span>
            Do you have an account?{" "}
            <Link to="/login">
              {" "}
              <span className=" underline">Login</span>
            </Link>
          </span>
        </form>
        {successMessage && <p>{successMessage}</p>}
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default RegistrationForm;
