import { fetchDataFromStrapi } from "@/lib/api";
import ProductCard from "./ProductCard";
import { Product } from "@/types/typeProduct";
export default async function Home() {
  const { data } = await fetchDataFromStrapi(
    "/api/products?populate=*",
    undefined,
    false,
    // { next: { tags: ["products"], revalidate: 3600 } },
  );
  console.log("data on page =>", data);

  return (
    <div className="w-full bg-slate-50 dark:bg-gray-900 py-18 relative overflow-hidden transition-colors duration-300 ">
    <h2 className=" mt-20 mb-20 text-center text-3xl font-bold text-gray-800 dark:text-gray-100">
      Our Products
    </h2>
    <div className="container flex justify-center space-x-5 mx-auto px-4">
      <div
        className="grid  items-center

grid-cols-1   
md:grid-cols-3   
        xl:grid-cols-5
gap-12 

        "
      >
        {data?.map((product) => (
          //make a product card component
          <ProductCard key={product.id} product={product as Product} />
        ))}
      </div>
    </div>
  </div>
);
}
