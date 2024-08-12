//  Code Challenge

"use client";

import FormButton from "@/components/button";
import FormInput from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { Login } from "./actions";

export default function LogIn() {
  const [state, dispatch] = useFormState(Login, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-3xl text-center mt-4">🔥</h1>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <FormInput
          name="email"
          required
          placeholder="Email"
          type="email"
          errors={state?.fieldErrors.email}
        />
        <FormInput
          name="password"
          required
          placeholder="Password"
          type="password"
          errors={state?.fieldErrors.password}
        />
        <FormButton text="Log in" />
      </form>
      <SocialLogin />
    </div>
  );
}
