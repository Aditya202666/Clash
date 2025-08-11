import React from "react";
import AvatarMenu from "./AvatarMenu";

export default function Navbar() {
  return (
    <div className=" w-full">
      <div className="h-10  flex justify-between max-w-7xl lg:px-8 px-4 md:px-6">

        <h1 className="text-3xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-center">
          Clash
        </h1>
        <AvatarMenu />
      </div>
    </div>
  );
}
