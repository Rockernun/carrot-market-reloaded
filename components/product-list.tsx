"use client";

import { useState } from "react";
import ListProduct from "./list-product";
import { getMoreProducts } from "@/app/(tabs)/products/actions";

interface ProductListProps {
  initialProducts: {
    id: number;
    title: string;
    price: number;
    created_at: Date;
    photo: string;
  }[];
}

export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const onLoadMoreClick = async () => {
    setLoading(true);
    const newProducts = await getMoreProducts(page + 1); //  server action 호출

    //  새 product의 길이가 0이 아닌 경우
    //  더 이상 보여줄 상품이 없어도 클릭하면 page는 계속해서 늘어나서
    if (newProducts.length !== 0) {
      setPage((prev) => prev + 1);

      //  이전 products와 server action이 제공한 새로운 product를 합친다.
      setProducts((prev) => [...prev, ...newProducts]);
    } else {
      setIsLastPage(true);
    }

    setLoading(false);
  };
  return (
    <div className="p-5 flex flex-col gap-5">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}
      {isLastPage ? (
        "No more items..."
      ) : (
        <button
          onClick={onLoadMoreClick}
          disabled={loading}
          className="text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"
        >
          {loading ? "로딩 중" : "더 가져오기"}
        </button>
      )}
    </div>
  );
}
