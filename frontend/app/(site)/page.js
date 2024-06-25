"use client";

import Header from "@/components/Header";

import Card from "@/components/Card";
import Sidebar from "@/components/Sidebar";

import SongBar from "@/components/SongBar";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/user/user";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Footer from "@/components/Footer";
export const songs = [
  {
    id: Math.random() * Date.now(),
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    mp3: new Audio("/audio/Tum Hi Ho.mp3"),
    image: "/images/Arijit-1.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Ae Dil Hai Mushkil",
    artist: "Arijit Singh",
    mp3: new Audio("/audio/ae.mp3"),
    image: "/images/Arijit-2.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Mirchi Awards",
    artist: "Arijit Singh",
    mp3: new Audio("/audio/Mashup.mp3"),
    image: "/images/Arijit-3.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Judaiyaan",
    artist: "Arijit Singh",
    mp3: new Audio("/audio/Judaiyaan.mp3"),
    image: "/images/Arijit-4.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Heeriye",
    artist: "Arijit Singh",
    mp3: new Audio("/audio/Heeriye.m4a"),
    image: "/images/Arijit-3.jpg",
  },
  {
    id: Math.random() * Date.now(),
    title: "Tu hi Hai Aashiqui",
    artist: "Arijit Singh",
    mp3: new Audio("/audio/Tu Hi Hai Aashiqui.mp3"),
    image: "/images/Arijit-2.jpg",
  },
];
export default function Home() {
  const token = JSON.parse(localStorage.getItem("token"));
  const dispatch = useDispatch();

  const getUsers = async () => {
    if (token) {
      const res = await fetch("http://localhost:5000/api/user/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token,
        },
      });
      const data = await res.json();

      if (data.success) {
        dispatch(getUser());
      } else {
        console.log(data.message);
        toast.error("not logged in");
      }
    }
  };
  useEffect(() => {
    getUsers();
  }, [token]);

  return (
    <Sidebar>
      <div className="tertiary_bg rounded-lg h-full w-full overflow-hidden overflow-y-auto">
        <Header />
        <div className="tertiary_bg px-4 py-4">
          <div className="flex justify-between items-center my-4">
            <span className="text-xl font-bold hover:underline cursor-pointer">
              Focus
            </span>
            <span>Show All</span>
          </div>
          <div className="grid  px-4 py-4 grid-cols-5 gap-6">
            {songs.map((song, i) => {
              return <Card key={song.id} idx={i} song={song} />;
            })}
          </div>

          {/* <div className="flex justify-between my-4 items-center ">
            <span className="text-xl font-bold hover:underline cursor-pointer">
              Spotify List
            </span>
            <span>Show All</span>
          </div>
          <div className="grid  px-4 py-4 grid-cols-5 gap-6">
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
          </div> */}
        </div>
        <Footer />
      </div>

      <SongBar />
    </Sidebar>
  );
}
