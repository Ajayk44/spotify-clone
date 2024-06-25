import React from "react";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { songs } from "@/app/(site)/page";
import { useGlobalContext } from "@/hooks/useGlobalContext";
const Navbar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { setFilteredSongs } = useGlobalContext();
  const filterSongs = (e) => {
    setQuery(e.target.value);
    const fil = songs.filter((song) => {
      if (
        song.title.toLowerCase().includes(query.toLowerCase()) ||
        song.artist.toLowerCase().includes(query.toLowerCase())
      ) {
        return song;
      }
    });
    if (e.target.value === "") {
      setFilteredSongs([]);
      return;
    }
    setFilteredSongs(fil);
    // dispatch(searchSongs(e.target.value))
  };
  return (
    <div className="hidden md:flex gap-x-2 items-center">
      <button
        onClick={() => router.back()}
        className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
      >
        <RxCaretLeft className="text-white" size={35} />
      </button>

      <button className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition">
        <RxCaretRight
          onClick={() => router.forward()}
          className="text-white"
          size={35}
        />
      </button>

      {usePathname() === "/search" && (
        <div className="relative py-4 text-left">
          <input
            type="text"
            id="search"
            name="search"
            value={query}
            onChange={filterSongs}
            autoComplete="off"
            placeholder="What do you want to listen to?"
            className="block pl-9 rounded-full border-0 w-[500px]  text-gray-300 shadow-sm ring-1 ring-inset ring-transparent placeholder:text-gray-400 focus:ring-[3px] focus:ring-inset focus:ring-white-600 outline-none p-3 hover:ring-white/20 bg-[#1a1919]"
          />

          <FaSearch className="absolute left-3 top-8" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
