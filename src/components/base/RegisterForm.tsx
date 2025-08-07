"use client";

import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SubmitButton } from "../common/SubmitButton";
import { registerAction } from "@/actions/authActions";
import { toast } from "sonner";

export default function RegisterForm() {
  type FormState = {
    status: number;
    message: string;
    input: {
      name: string;
      email: string;
      password: string;
      confirm_password: string;
    };
    errors: {
      name?: string[];
      email?: string[];
      password?: string[];
      confirm_password?: string[];
    };
    success: boolean;
  };

  const initialState: FormState = {
    status: 0,
    message: "",
    input: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    errors: {},
    success: false,
  };

  const [state, formAction] = React.useActionState(
    registerAction,
    initialState
  );

  useEffect(() => {
    if (state.status === 200) {
      toast.success(state.message);
    } else if (state.status >= 400) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-1 mt-4">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          defaultValue={state.input?.name}
          required
          minLength={3}
          name="name"
          placeholder="Enter your name.."
        />
      </div>
      <span className="text-red-500 text-sm">{state.errors?.name?.[0]}</span>
      <div className="flex flex-col gap-1 mt-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          defaultValue={state.input?.email}
          required
          name="email"
          placeholder="Enter your email.."
        />
      </div>
      <span className="text-red-500 text-sm">{state.errors?.email?.[0]}</span>

      <div className="flex flex-col gap-1 mt-4">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          defaultValue={state.input?.password}
          required
          minLength={8}
          name="password"
          placeholder="Enter your password.."
        />
      </div>
      <span className="text-red-500 text-sm">{state.errors?.password?.[0]}</span>

      <div className="flex flex-col gap-1 mt-4">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          defaultValue={state.input?.confirm_password}
          name="confirm_password"
          required
          minLength={8}
          placeholder="Confirm password.."
        />
      </div>
      <span className="text-red-500 text-sm">
        {state.errors?.confirm_password?.[0]}
      </span>

      <div className="mt-4">
        <SubmitButton />
      </div>
    </form>
  );
}
