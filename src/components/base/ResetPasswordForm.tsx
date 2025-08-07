"use client";

import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SubmitButton } from "../common/SubmitButton";
import { resetPasswordAction } from "@/actions/authActions";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
  type FormState = {
    status: number;
    message: string;
    input: {
      token: string;
      email: string;
      password: string;
      confirm_password: string;
    };
    errors: {
      token?: string[];
      email?: string[];
      password?: string[];
      confirm_password?: string[];
    };
    success: boolean;
  };

  const params = useSearchParams()
  const router = useRouter()

  const token = params.get("token")
  const email = params.get("email")

  console.log(token, email)

  const initialState: FormState = {
    status: 0,
    message: "",
    input: {
      token: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    errors: {},
    success: false,
  };

  const [state, formAction] = React.useActionState(
    resetPasswordAction,
    initialState
  );

  useEffect(() => {
    if (state.status === 200) {
      toast.success(state.message);
        setTimeout(() => {
            router.replace("/login")
        }, 1000);

    } else if (state.status >= 400) {
      toast.error(state.message);
      console.log(state.message)
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input type="hidden" name="token" value={token || ""} />
      <div className="flex flex-col gap-1 mt-4">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          defaultValue={email || ""}
          readOnly
          name="email"
        />
      </div>
      <span className="text-red-500 text-sm">{state.errors?.email?.[0]}</span>

      <div className="flex flex-col gap-1 mt-4">
        <Label htmlFor="password">New Password</Label>
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
      <span className="text-red-500 text-sm">
        {state.errors?.password?.[0]}
      </span>

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
