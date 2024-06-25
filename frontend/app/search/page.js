"use client";

import React, { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import SongBar from "@/components/SongBar";
import Card from "@/components/Card";
import { useGlobalContext } from "@/hooks/useGlobalContext";
import Footer from "@/components/Footer";

const page = () => {
  const { filteredSongs } = useGlobalContext();
  return (
    <Sidebar>
      <div className="tertiary_bg rounded-lg  h-full overflow-hidden overflow-y-auto">
        <Header />
        <div className="tertiary_bg px-4 py-4 w-[1240px]">
          <div className="flex justify-between items-center my-4">
            <span className="text-xl font-bold hover:underline cursor-pointer">
              Browse
            </span>
          </div>
          {filteredSongs?.length <= 0 && (
            <div className="grid  gap-6 grid-cols-5">
              <div className="col-span-1">
                <CategoryCard
                  title={"Live Events"}
                  img={"/images/card.jpg"}
                  color={"bg-purple-500"}
                />
              </div>
              <div className="col-span-1">
                <CategoryCard
                  title={"Made For You"}
                  img={"/images/card.jpg"}
                  color={"bg-red-500"}
                />
              </div>
              <div className="col-span-1">
                <CategoryCard
                  title={"New Releases"}
                  img={"/images/card.jpg"}
                  color={"bg-orange-500"}
                />
              </div>
              <div className="col-span-1">
                <CategoryCard
                  title={"Live Events"}
                  img={"/images/card.jpg"}
                  color={"bg-purple-500"}
                />
              </div>
              <div className="col-span-1">
                <CategoryCard
                  title={"Live Events"}
                  img={"/images/card.jpg"}
                  color={"bg-purple-500"}
                />
              </div>
            </div>
          )}

          {filteredSongs?.length > 0 && (
            <div className="grid  gap-6 grid-cols-5">
              {filteredSongs.map((song) => {
                return <Card key={song.id} song={song} />;
              })}
            </div>
          )}
        </div>
        <Footer />
      </div>
      <SongBar />
    </Sidebar>
  );
};

const CategoryCard = ({ title, img, color }) => {
  return (
    <div
      className={`p-4 rounded-lg w-full  ${color} relative overflow-hidden h-56`}
    >
      <span className="text-xl font-semibold mt-2">{title}</span>
      <img
        src={img}
        alt=""
        className="w-1/2 h-1/2 absolute bottom-0 right-8 rotate-45 object-cover"
      />
    </div>
  );
};

export default page;
