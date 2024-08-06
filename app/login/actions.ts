"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { z } from "zod";

function checkPasswords(password: string) {
  return password === "12345";
}

function correctPasswords(password: string) {
  return password !== "12345";
}

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
  username: z.string().toLowerCase(),
  password: z
    .string({
      required_error: "Password is required...",
    })
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
    /*
  if (data.password === "12345") {
    return ["Welcome!"];
  }
  이 구문을 지우니 fieldErrors 오류가 사라졌다.
  */
    console.log(result.data);
  }
}
