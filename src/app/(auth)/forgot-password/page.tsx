import ForgotPasswordForm from "@/components/base/ForgotPasswordForm";
import Link from "next/link";
import React from "react";

export default function ForgotPassword() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white w-xl  border rounded-xl py-4 px-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-center">
          Clash
        </h1>
        <h2 className="text-lg md:text-xl lg:text-2xl font-medium">Forgot Password?</h2>
        <p>Don't worry, it happens. Please enter the email address associated with your account. </p>

        <ForgotPasswordForm/>
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
