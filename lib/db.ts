import { Prisma, PrismaClient } from "@prisma/client";

const db = new PrismaClient();

//  사용자 생성
async function test() {
  const user = await db.user.create({
    data: {
      username: "adsf",
    },
  });
  console.log(user);
}

test();

export default db;
