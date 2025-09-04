import ResetPasswordForm from "@/components/base/ResetPasswordForm";
import Link from "next/link";
import React, { Suspense } from "react";

export default function ResetPassword() {

  

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white w-xl  border rounded-xl py-4 px-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-center">
          Clash
        </h1>
        <h2 className="text-lg md:text-xl lg:text-2xl font-medium">Reset Password!</h2>
        <p>Enter the new password you want to use. </p>
        <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordForm />
        </Suspense>
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
