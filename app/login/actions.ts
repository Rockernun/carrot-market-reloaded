"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  USERNAME_MIN_LENGTH,
} from "@/lib/constants";
import { z } from "zod";

function checkPasswords(password: string) {
  return password === "1234567890";
}

function correctPasswords(password: string) {
  return password !== "1234567890";
}

function checkEmailForm(email: string) {
  return email.includes("@zod.com");
}

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailForm, "Only @zod.com emails are allowed"),
  username: z
    .string({
      required_error: "Please write your username...",
    })
    .min(USERNAME_MIN_LENGTH, "Username should be at least 5 characters long.")
    .toLowerCase(),
  password: z
    .string({
      required_error: "Password is required...",
    })
    .min(PASSWORD_MIN_LENGTH, "Password should be at least 10 characters long.")
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
    .refine(checkPasswords, "Wrong Password...")
    .refine(correctPasswords, "Welcome Back!"),
});

export async function Login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
