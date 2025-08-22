import { auth } from "@/auth";
import LoginForm from "@/components/base/LoginForm";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function Login() {

  const session  = await auth()

  if(session?.user){

    redirect("/dashboard")
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white w-xl  border rounded-xl py-4 px-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-center">
          Clash
        </h1>
        <h2 className="text-lg md:text-xl lg:text-2xl font-medium">Login</h2>
        <p>Welcome back!</p>

        <LoginForm/>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link href="/register" className="font-bold">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}
