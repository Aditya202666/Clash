"use client";

import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SubmitButton } from "../common/SubmitButton";
import { forgotPasswordAction } from "@/actions/authActions";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
  type FormState = {
    status: number;
    message: string;
    input: {
      email: string;
    };
    errors: {
      email?: string[];
    };
    success: boolean;
  };

  const initialState: FormState = {
    status: 0,
    message: "",
    input: {
      email: "",
    },
    errors: {},
    success: false,
  };


  const [state, formAction] = React.useActionState(forgotPasswordAction, initialState);

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

      <div className="mt-4">
        <SubmitButton />
      </div>
    </form>
  );
}
