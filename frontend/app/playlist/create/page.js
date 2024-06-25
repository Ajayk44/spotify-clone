"use client";
import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

const page = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [playlist, setPlaylist] = useState({
    title: "",
    singers: [],
    songs: [],
  });
  const [singerName, setSingerName] = useState("");

  const [songName, setSongName] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const addSinger = () => {
    console.log(singerName);
    playlist.singers.push({ singer_name: singerName });
    console.log(playlist);
    setSingerName("");
  };
  const onChange = (e) => {
    setPlaylist({ ...playlist, [e.target.name]: e.target.value });
  };
  const SingerName = (e) => setSingerName(e.target.value);
  const SongName = (e) => setSongName(e.target.value);
  const ArtistName = (e) => setSongArtist(e.target.value);
  const handleSubmit = async () => {
    console.log(playlist);
    let data = JSON.stringify(playlist);

    console.log(data);
    const res = await fetch("http://localhost:5000/api/user/playlist/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: data,
    });

    data = await res.json();
    if (data.success) {
      setPlaylist({
        title: "",
        singers: [],
        songs: [],
      });
      toast.success("Created Playlist successfully");
    } else {
      toast.error("Playlist creation failed");
    }
  };
  const submitHandler = () => {
    const song = { song_title: songName, song_artist: songArtist };

    playlist.songs.push(song);
    setSongName("");
    setSongArtist("");
  };
  return (
    <div>
      <header className="px-12 py-8">
        <div className="logo">
          <Link href="/">
            <img src="/images/white_logo.png" width={120} alt="" />
          </Link>
        </div>
      </header>
      <div className="bg-[#1a1919] py-10">
        <div className="bg-black py-10 text-center w-1/2 mx-auto">
          <h1 className="text-5xl my-12 font-semibold">
            Create a new Playlist
          </h1>
          <div className="border-b border-gray-400 w-3/4 my-4 mx-auto"></div>
          <form className="text-center mx-auto w-1/2 ">
            <div className="w-full text-left py-4">
              <label htmlFor="name" className="font-semibold mb-2 inline-block">
                Playlist Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={playlist.title}
                onChange={onChange}
                placeholder="Playlist Title"
                className="block w-full rounded-[4px] border-0  text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-white bg-[#1a1919]"
              />
            </div>
            <div className="w-full text-left py-4 ">
              <label htmlFor="name" className="font-semibold mb-2 inline-block">
                Singers
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="singers"
                  name="singers"
                  value={singerName}
                  onChange={SingerName}
                  placeholder="Enter Singer name"
                  className="block w-full  border-0  text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-white bg-[#1a1919]"
                />
                <button
                  type="button"
                  className="bg-green-400 ring-1 ring-inset ring-gray-300 text-sm  text-black"
                  onClick={addSinger}
                >
                  Add Singer
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="name" className="font-semibold mb-2 inline-block">
                Songs
              </label>
              <div className="w-full text-left py-4 ">
                <label
                  htmlFor="name"
                  className="font-semibold mb-2 inline-block"
                >
                  Name
                </label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter Song name"
                    value={songName}
                    onChange={SongName}
                    className="block w-full  border-0  text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-white bg-[#1a1919]"
                  />
                </div>
              </div>
              <div className="w-full text-left py-4 ">
                <label
                  htmlFor="name"
                  className="font-semibold mb-2 inline-block"
                >
                  Artist
                </label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter Artist name"
                    value={songArtist}
                    onChange={ArtistName}
                    className="block w-full  border-0  text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-white bg-[#1a1919]"
                  />
                </div>
              </div>
              <button
                type="button"
                className="bg-green-400 rounded-full text-sm  text-black px-3 py-2"
                onClick={submitHandler}
              >
                Add Song
              </button>
            </div>
            <br />
            <button
              type="button"
              className="bg-green-400 rounded-full text-md  text-black px-6 py-4"
              onClick={handleSubmit}
            >
              Add Playlist
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
