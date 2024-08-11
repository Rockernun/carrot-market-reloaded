import { error } from "console";
import { NextRequest } from "next/server";

//  middleware가 request를 가로채서 profile 페이지로 가려는 request를 완전히 중단시킨 것이다.
export function middleware(request: NextRequest) {
  console.log(request.cookies.getAll()); //  이런 식으로 쿠키에 접근할 수도 있다.
  //  console.log(cookies());
  //  const session = await getSession(); 이런 식으로 세션으로 사용자의 로그인 여부도 확인 가능하다.
  //  console.log(session);
  if (request.nextUrl.pathname === "/profile") {
    return Response.redirect(new URL("/", request.url));
  }
}
