"use client";

import { useRouter } from "next/navigation";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "@/app/redux/user/user";
import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import toast from "react-hot-toast";
const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showDropDown, setShowDropDown] = useState(false);
  const token = JSON.parse(localStorage.getItem("token"));
  const logoutUser = () => {
    localStorage.removeItem("token");
    router.push("/login");
    toast.success("Logged out successfully");
    dispatch(userLogout());
  };
  return (
    <>
      <div className="h-fit w-full secondary_bg py-5 px-3">
        <div className="w-full  flex items-center justify-between secondary_bg">
          <Navbar />

          <div className="flex md:hidden gap-x-2 items-center">
            <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
              <HiHome className="text-black" size={20} />
            </button>

            <button className="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition">
              <BiSearch className="text-black" size={20} />
            </button>
          </div>

          <div className="flex justify-between items-center gap-x-4">
            <div>
              {!token ? (
                <div>
                  <Link
                    className="bg-transparent px-3  text-neutral-300 font-medium w-full rounded-full  border border-transparent  disabled:cursor-not-allowed disabled:opacity-50  hover:opacity-75 transition"
                    href="/signup"
                  >
                    Sign up
                  </Link>

                  <Link
                    className="bg-white font-semibold px-6 py-2 w-full rounded-full  border border-transparent  disabled:cursor-not-allowed disabled:opacity-50 text-black hover:opacity-75 hover:font-bold transition"
                    href="/login"
                  >
                    Log in
                  </Link>
                </div>
              ) : (
                <div className="relative z-10">
                  <button onClick={() => setShowDropDown(!showDropDown)}>
                    <FaUser />
                  </button>
                  {showDropDown && (
                    <div className="absolute dropdown bg-[#282828] top-8 text-sm right-0 w-[12rem]">
                      <ul className="p-1">
                        <li className="">
                          <Link
                            className="flex p-2 justify-between hover:bg-white/10"
                            href={"/"}
                          >
                            <span>Account</span> <FaExternalLinkAlt />
                          </Link>{" "}
                        </li>
                        <li className="">
                          <Link
                            className="flex p-2 justify-between hover:bg-white/10"
                            href={"/"}
                          >
                            <span>Profile</span>{" "}
                          </Link>{" "}
                        </li>
                        <li className="">
                          <Link
                            className="flex p-2 justify-between hover:bg-white/10"
                            href={"/"}
                          >
                            <span>Upgrade to Premium</span>{" "}
                            <FaExternalLinkAlt />
                          </Link>{" "}
                        </li>
                        <li className="">
                          <Link
                            className="flex p-2 justify-between hover:bg-white/10"
                            href={"/"}
                          >
                            <span>Settings</span>
                          </Link>{" "}
                        </li>
                        <li className="">
                          <button
                            onClick={logoutUser}
                            className="p-2 w-full text-left border-t border-white/10  hover:bg-white/10"
                          >
                            <span>Log out</span>
                          </button>{" "}
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
