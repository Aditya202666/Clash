"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutModel from "./LogoutModel";
import UserAvatar from "./Avatar";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <LogoutModel open={open} setOpen={setOpen} />

      <nav className="flex justify-between items-center px-4 md:px-6 lg:px-8 h-12">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-center">
          Clash
        </h1>

        <DropdownMenu >
          <DropdownMenuTrigger className="outline-none">
            <UserAvatar />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="cursor-pointer" onClick={() => setOpen(true)}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
}
