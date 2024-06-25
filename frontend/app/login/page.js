"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../styles/login.css";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/user/user";
import { useRouter } from "next/navigation";
const page = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.account.value);

  const [userDetails, setuserDetails] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    setuserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const { username, password } = userDetails;
    let data = JSON.stringify({
      username,
      password,
    });
    console.log(data);
    const res = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    });

    data = await res.json();
    if (data.success) {
      setuserDetails({
        password: "",

        username: "",
      });
      toast.success(data.message);

      localStorage.setItem("token", JSON.stringify(data.token));

      dispatch(userLogin());
    } else {
      toast.error(data.message);
    }
  };

  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);

  return (
    <div>
      <header className="px-12 py-8">
        <div className="logo">
          <Link href="/">
            <img src="./images/white_logo.png" width={120} alt="" />
          </Link>
        </div>
      </header>
      <div className="bg-[#1a1919] py-10">
        <div className="bg-black py-10 text-center w-1/2 mx-auto">
          <h1 className="text-5xl my-12 font-semibold">Log in to Spotify</h1>
          <div className="border-b border-gray-400 w-3/4 my-4 mx-auto"></div>
          <form onSubmit={loginUser} className="text-center mx-auto w-1/2 ">
            <div className="w-full text-left py-4">
              <label
                htmlFor="email"
                className="font-semibold mb-2 inline-block"
              >
                Email or username
              </label>
              <input
                type="text"
                id="email"
                name="username"
                value={userDetails.username}
                onChange={onChange}
                placeholder="Email or username"
                className="block w-full rounded-[4px] border-0  text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-white bg-[#1a1919]"
              />
            </div>
            <div className="w-full text-left py-4">
              <label
                htmlFor="password"
                className="font-semibold mb-2 inline-block"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={userDetails.password}
                onChange={onChange}
                placeholder="Password"
                className="block w-full rounded-[4px] border-0  text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-white bg-[#1a1919]"
              />
            </div>
            <div className="w-full text-left py-4">
              <input
                type="submit"
                value="Log in"
                placeholder="Password"
                className="block cursor-pointer w-full outline-none bg-green-400 text-black p-3 hover:scale-105 translate-all duration-200 font-medium hover:font-semibold text-center rounded-full "
              />
            </div>
            <div className="w-full text-center py-4">
              <Link
                href="/password/forgot"
                className="text-white font-semibold underline mx-auto"
              >
                Forget Password?
              </Link>
            </div>
          </form>
          <div className="border-b border-gray-400 w-3/4 my-4 mx-auto"></div>
          <p className="pt-8">
            <span className="text-gray-300 font-semibold">
              Don't have an account?{" "}
            </span>

            <Link
              href="/signup"
              className="text-white hover:text-green-500 font-semibold underline mx-auto"
            >
              Sign up for Spotify
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
