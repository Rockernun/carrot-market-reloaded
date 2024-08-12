"use client";

import FormButton from "@/components/button";
import FormInput from "@/components/input";
import { useFormState } from "react-dom";
import { smsVerification } from "./actions";

const initialState = {
  token: false,
  error: undefined,
};

export default function SMSLogIn() {
  const [state, dispatch] = useFormState(smsVerification, initialState);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">SMS Login</h1>
        <h2 className="text-xl">Verify your phone number</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.token ? (
          <FormInput
            name="token"
            required
            placeholder="Verification Code"
            type="number"
            min={100000}
            max={999999}
          />
        ) : (
          <FormInput
            name="phone"
            required
            placeholder="Phone Number"
            type="text"
            errors={state.error?.formErrors}
          />
        )}
        <FormButton
          text={state.token ? "Verify Token" : "Send Verification SMS"}
        />
      </form>
    </div>
  );
}
