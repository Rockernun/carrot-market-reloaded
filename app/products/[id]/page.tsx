import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatToWon } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";

async function getIsOwner(userId: number) {
  const session = await getSession(); //  사용자의 쿠키를 읽는다.
  //  사용자의 쿠키에 있는 id가 제품을 업로드한 사용자의 id와 일치하는지 여부를 체크
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string }; //  URL로부터 파라미터를 가져온다. (/product 다음의 숫자 부분 params.id)
}) {
  const id = Number(params.id); //  숫자로 변경할 수 없는 id일 경우, 404 에러 처리
  if (isNaN(id)) {
    return notFound();
  }
  const product = await getProduct(id);
  if (!product) {
    //  제품이 존재하지 않으면 notFound 리턴
    return notFound();
  }
  const isOwner = await getIsOwner(product.userId);
  return (
    <div>
      <div className="relative aspect-square">
        <Image
          fill
          src={product.photo}
          alt={product.title}
          className="object-cover"
        />
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 rounded-full">
          {product.user.avatar !== null ? (
            <Image
              src={product.user.avatar}
              width={40}
              height={40}
              alt={product.user.username}
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
        <span className="font-semibold text-xl">
          {formatToWon(product.price)}원
        </span>
        {isOwner ? (
          <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
            Delete Product
          </button>
        ) : null}
        <Link
          className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
          href={``}
        >
          채팅하기
        </Link>
      </div>
    </div>
  );
}
