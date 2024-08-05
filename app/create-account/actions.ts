"use server";
import { z } from "zod";

//  potato가 포함된 username 처리 함수
function checkUsername(username: string) {
  return !username.includes("potato");
}

//  비밀번호 일치 여부를 처리하는 함수
const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "Where is my username?",
      })
      .min(3, "Way too short!")
      .max(10, "That is too long!")
      .refine(checkUsername, "No potatoes allowed..."),
    //  refine 안에 작성한 함수가 true를 리턴하면 문제가 없고, false를 리턴하면 문제가 있다는 것이다. false를 반환할 경우, 유저에게 에러 메시지가 표시된다.
    email: z.string().email(),
    password: z.string().min(10),
    confirm_password: z.string().min(10),
  })
  .refine(checkPasswords, {
    message: "Both passwords should be the same...",
    path: ["confirm_password"], //  이런 식으로 에러의 주인이 누구인지 명시해줘야 한다.
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  }
}
