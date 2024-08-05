"use server";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(3).max(10),
  email: z.string().email(),
  password: z.string().min(10),
  confirm_password: z.string().min(10),
});

//  Form에서 모든 item(object)을 가져온다.
export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  /*
  try {
    formSchema.safeParse(data);
  } catch (e) {
    console.log(e);
  }
    */

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
}
