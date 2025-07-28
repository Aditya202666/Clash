import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import React from 'react'

export default function page() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white w-xl  border rounded-xl py-4 px-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent text-center">
          Clash
        </h1>
        <h2 className="text-lg md:text-xl lg:text-2xl font-medium">Register</h2>
        <p>Welcome to Clash!</p>

        <form>
          <div className="flex flex-col gap-1 mt-4">
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" placeholder="Enter your email.." />
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email.." />
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password.."
            />
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm password.."
            />
          </div>

          <div className="mt-4">
            <Button className="w-full">Submit</Button>
          </div>
        </form>

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
