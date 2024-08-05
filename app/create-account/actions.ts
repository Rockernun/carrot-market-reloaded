"use server";
import { z } from "zod";

//  Schema
const usernameSchema = z.string().min(5).max(10); //  데이터의 조건 설명

//  Form에서 모든 item(object)을 가져온다.
export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  usernameSchema.parse(data.username);
}
