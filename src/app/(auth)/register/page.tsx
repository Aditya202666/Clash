import RegisterForm from '@/components/base/RegisterForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React from 'react'

export default function RegisterPage() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white w-xl  border rounded-xl py-4 px-6">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-center">
          Clash
        </h1>
        <h2 className="text-lg md:text-xl lg:text-2xl font-medium">Register</h2>
        <p>Welcome to Clash!</p>

        <RegisterForm/>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link href="/login" className="font-bold">
            Login
          </Link>
        </p>

      </div>
    </div>
  )
}
