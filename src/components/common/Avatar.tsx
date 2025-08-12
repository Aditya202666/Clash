"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSession } from "next-auth/react";
import { User } from "next-auth";

export default function UserAvatar() {

  const [user, setUser] = useState<User | null>()

  useEffect(() => {
    async function getUserSession() {
      const session = await getSession();
      console.log(session);
      setUser(session?.user || null)
    }

    getUserSession();
  }, []);

  return (
    <Avatar className="">
      <AvatarImage src={user?.avatar} />
      <AvatarFallback className="bg-zinc-800 text-white font-bold">{user?.name?.[0]}</AvatarFallback>
    </Avatar>
  );
}
