import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <div className="h-screen w-full flex justify-center items-center flex-col">
      <div>
        <Image src={"/banner.svg"} width={600} height={600} alt={"banner"} />
      </div>
      <div className="text-center mt-4">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Clash
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl ">Discover the better choice, together.</p>
        <Button className="mt-2">Get Started</Button>
      </div>
    </div>
  );
}
