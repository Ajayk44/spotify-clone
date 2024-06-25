import React from "react";
import "../styles/Card.css";
import { FaPause, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  playSong,
  pauseSong,
  playMaster,
  pauseMaster,
} from "@/app/redux/mainSong/song";
import { useGlobalContext } from "@/hooks/useGlobalContext";
const Card = ({ song, idx }) => {
  const { mainSong, isPlaying } = useSelector((state) => state.mainSong.value);
  const { resetEverything, setSongIdx, setProgress } = useGlobalContext();
  const dispatch = useDispatch();
  const handlePlay = (song) => {
    setSongIdx(idx);

    if (isPlaying) {
      mainSong.mp3.currentTime = 0;
      mainSong.mp3.pause();
      resetEverything();
    }

    dispatch(playSong(song));
    dispatch(playMaster());
  };
  const handlePause = () => {
    dispatch(pauseSong());
  };
  return (
    song && (
      <div className="card secondary_bg col-span-1 p-4 rounded-lg">
        <div className="relative">
          <img src={song.image} />
          {mainSong.id === song.id && isPlaying ? (
            <button
              onClick={handlePause}
              className="flex items-center justify-center p-3 play_btn absolute bottom-0 right-0 bg-green-500 rounded-[50%]"
            >
              <FaPause className="text-black text-xl" />
            </button>
          ) : (
            <button
              onClick={() => handlePlay(song)}
              className="flex items-center justify-center p-3 play_btn absolute bottom-0 right-0 bg-green-500 rounded-[50%]"
            >
              <FaPlay className="text-black text-xl" />
            </button>
          )}
        </div>

        <h3 className="text-sm font-semibold my-2">{song.artist}</h3>
        <p className="text-xs text-gray-400 leading-4">
          {song.title} - {song.artist}
        </p>
      </div>
    )
  );
};

export default Card;
