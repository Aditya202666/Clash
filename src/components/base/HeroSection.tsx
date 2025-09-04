import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { auth } from "@/auth";



export default async function HeroSection() {
  // const session  = await auth()
  // console.log(session, "session")
  return (
    <div className="h-[calc(100vh-64px)] w-full flex justify-center items-center flex-col">
      <div>
        <Image src={"/banner.svg"} width={600} height={600} alt={"banner"} />
      </div>
      <div className="text-center mt-4">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Clash
        </h1>

        <p className="text-lg md:text-xl lg:text-2xl mt-2 ">Discover the better choice, together.</p>
        <p className="text-sm md:text-md lg:text-lg leading-snug">A simple way to collect anonymous votes and feedback through a shared link.</p>
        <Link href={'/register'}>
        <Button className="mt-8">Get Started</Button>
        </Link>
      </div>
    </div>
  );
}
