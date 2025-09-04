import HeroSection from "@/components/base/HeroSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function Page() {
  return (
    <div>
      <nav className="flex justify-between items-center px-4 md:px-6 lg:px-8 h-12">
        <h1
          className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-center cursor-pointer"
        >
          Clash
        </h1>
        <Link href={"/login"} className="">
        <Button>Login</Button>
        </Link>
      </nav>

      <HeroSection />
    </div>
  );
}
