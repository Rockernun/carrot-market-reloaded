"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "./actions";

export default function CreateAccount() {
  const [state, action] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="username"
          required
          placeholder="Username"
          type="text"
          errors={state?.fieldErrors.username}
        />
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
        <FormInput
          name="confirm_password"
          required
          placeholder="Confirm Password"
          type="password"
          errors={state?.fieldErrors.confirm_password}
        />
        <FormButton text="Create Account" />
        <SocialLogin />
      </form>
    </div>
  );
}
