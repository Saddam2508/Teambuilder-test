"use client";
import { useState } from "react";
import { BannerDataTypes, ProductsTypes } from "../app/page";
import FooterBanner from "../comps/FooterBanner";
import MainBanner from "./MainBanner";
import Products from "../app/Products";

interface HomeProps {
  products: ProductsTypes[];
  bannerData: BannerDataTypes[];
}

const Home = ({ products, bannerData }: HomeProps) => {
  const [sortOrder, setSortOrder] = useState(""); // low-to-high | high-to-low
  const [sortedProducts, setSortedProducts] = useState(products);

  const handleSort = (order: string) => {
    setSortOrder(order);
    const sorted = [...products].sort((a, b) =>
      order === "low" ? a.price - b.price : b.price - a.price
    );
    setSortedProducts(sorted);
  };

  return (
    <main>
      <MainBanner banner={bannerData[0]} />

      {/* === TITLE + SORT SELECT === */}
      <section className="mb-4 flex flex-col sm:flex-row items-center justify-between w-full sm:w-3/4 mx-auto px-4">
        <h1 className="headTitle sm:text-4xl text-2xl text-secondary font-extrabold">
          Best Selling Headphones
        </h1>

        {/* 🔽 Sort select */}
        <select
          value={sortOrder}
          onChange={(e) => handleSort(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring"
        >
          <option value="">Sort by price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </section>

      {/* === SHOW PRODUCTS === */}
      <section className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-6 lg:mx-20">
        {sortedProducts.map((product: ProductsTypes) => (
          <Products key={product._id} products={product} />
        ))}
      </section>

      <FooterBanner bannerData={bannerData && bannerData[1]} />
    </main>
  );
};

export default Home;
