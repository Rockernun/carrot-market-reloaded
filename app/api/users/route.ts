import { NextRequest } from "next/server";

//  HTTP GET Method
export async function GET(request: NextRequest) {
  console.log(request);
  return Response.json({
    ok: true,
  });
}

//  HTTP POST Method
export async function POST(request: NextRequest) {
  const data = await request.json();
  return Response.json(data);
}
