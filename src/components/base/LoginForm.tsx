"use client";

import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SubmitButton } from "../common/SubmitButton";
import { loginAction } from "@/actions/authActions";
import { toast } from "sonner";
import Link from "next/link";
import { signIn } from "next-auth/react"; 

export default function LoginForm() {
  type FormState = {
    status: number;
    message: string;
    input: {
      email: string;
      password: string;
    };
    errors: {
      email?: string[];
      password?: string[];
    };
    success: boolean;
  };

  const initialState: FormState = {
    status: 0,
    message: "",
    input: {
      email: "",
      password: "",
    },
    errors: {},
    success: false,
  };

  const [state, formAction] = React.useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.status === 200) {
      toast.success("Logging you in...");

      signIn("credentials", {
        email: state.input?.email,
        password: state.input?.password,
        redirect: true,
        callbackUrl: "/dashboard",
    })

      
    } else if (state.status >= 400) {
      toast.error(state.message);
    }
  }, [state]);


  return (
    <form action={formAction}>
      <div className="flex flex-col gap-1 mt-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          required
          defaultValue={state.input?.email}
          placeholder="Enter your email.."
        />
        <span className="text-sm text-red-500">{state.errors?.email?.[0]}</span>
      </div>
      <div className="flex flex-col gap-1 mt-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          required
          defaultValue={state.input?.password}
          name="password"
          placeholder="Enter your password.."
        />
        <span className="text-sm text-red-500">{state.errors?.password?.[0]}</span>
      </div>

      <Link href={"/forgot-password"} className="text-right text-sm">
        <p>Forgot password?</p>
      </Link>

      <div className="mt-4">
        <SubmitButton />
      </div>
    </form>
  );
}
