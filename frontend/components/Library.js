"use client";

import React from "react";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { TbWorld } from "react-icons/tb";
import { BiSolidHome, BiLibrary } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { IoMdRefresh } from "react-icons/io";

const Library = () => {
  const [playlists, setPlaylists] = useState([]);

  const token = JSON.parse(localStorage.getItem("token"));
  const getPlaylists = async () => {
    const res = await fetch("http://localhost:5000/api/user/playlists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token,
      },
    });
    let d = await res.json();

    setPlaylists(d.playlists);
  };
  const [path, setPath] = useState("/login");
  const [play, setPlay] = useState("/login");
  useEffect(() => {
    if (token) {
      setPath("/search");
      setPlay("/playlist/create");
    } else {
      setPath("/login");
      setPlay("/login");
    }
  }, [token]);
  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <div className=" flex flex-col p-3">
      <div className=" flex items-center justify-between  ">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <IoMdRefresh
          onClick={getPlaylists}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <Link href={play}>
          <AiOutlinePlus
            size={20}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
        </Link>
      </div>
      {playlists.length !== 0 && (
        <div className="btns flex gap-4 mb-4">
          <Link
            href={"/"}
            className="rounded-full mt-4 px-3   py-1 bg-white/10 text-white text-sm"
          >
            Playlists
          </Link>
          <Link
            href={"/"}
            className="rounded-full mt-4 px-3   py-1 bg-white/10 text-white text-sm"
          >
            Artists
          </Link>
        </div>
      )}
      <div className="my-6 px-2">
        {playlists.map((p) => {
          return (
            <div key={p._id} className="flex gap-4 my-2">
              <div>
                <img src="/images/card.jpg" width={50} height={50} alt="" />
              </div>
              <div>
                <h3 className="text-base font-medium mb-2">{p.title}</h3>
                <p className="text-sm text-white/80">
                  Playlist
                  <span> . {p.songs.length} Songs</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div className="your_library">
        {playlists.length === 0 && (
          <>
            <div className="leading-8 mt-2 tertiary_bg rounded-lg py-6 px-4">
              <p className="font-bold">Create your first playlist</p>
              <p className="font-semibold">It's easy, we'll help you</p>
              <Link href={play}>
                <button className="rounded-full text-black mt-4 px-4 py-0 bg-white font-semibold">
                  Create playlist
                </button>
              </Link>
            </div>
            <div className="leading-8 mt-4 tertiary_bg rounded-lg py-6 px-4">
              <p className="font-bold">Let's find some podcasts to follow</p>
              <p className="font-semibold">
                We'll keep you updated on new episodes
              </p>
              <Link href={path}>
                <button className="rounded-full text-black mt-4 px-4 py-0 bg-white font-semibold">
                  Browse Podcast
                </button>
              </Link>
            </div>
          </>
        )}
        <div className="mt-4 px-4 flex gap-4 flex-wrap">
          <Link className="text-xs text-gray-300 mx-4" href={"/"}>
            Legal
          </Link>
          <Link className="text-xs text-gray-300 mx-4" href={"/"}>
            Privacy Center
          </Link>
          <Link className="text-xs text-gray-300 mx-4" href={"/"}>
            Privacy Policy
          </Link>
          <Link className="text-xs text-gray-300 mx-4" href={"/"}>
            Cookies
          </Link>
          <Link className="text-xs text-gray-300 mx-4" href={"/"}>
            About Ads
          </Link>
          <Link className="text-xs text-gray-300 mx-4" href={"/"}>
            Accessibility
          </Link>
        </div>
        <button className="mx-4 mt-12 text-sm border-white border rounded-full flex gap-2 px-3 py-1 items-center  text-white ">
          <TbWorld />
          <span className="text-white font-bold">English</span>
        </button>
      </div>
    </div>
  );
};

export default Library;
