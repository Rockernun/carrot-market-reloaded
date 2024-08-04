"use server";

import { redirect } from "next/navigation";

//  여기 있는 모든 함수들은 전부 서버에서 실행된다.
export async function handleForm(prevState: any, data: FormData) {
  console.log(prevState);
  await new Promise((resolve) => setTimeout(resolve, 3000));
  redirect("/");
  return {
    errors: ["wrong password", "password too short"], //  action이 return하는 값을 UI에 전달할 수 있다.
  };
}
