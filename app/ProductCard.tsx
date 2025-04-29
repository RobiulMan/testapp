import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/typeProduct";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group w-64 overflow-hidden shadow-md rounded-3xl bg-white dark:bg-slate-700 border border-gray-200 dark:border-none">
      <Link href={`/products/${product?.slug}`}>
        <div className="p-4">
          <span className="inline-block text-sm font-bold text-gray-900 dark:text-white border border-gray-500 dark:border-gray-300 rounded-full px-4 py-2 mb-4">
            Pack Size: 12
          </span>

          <div className="flex justify-center p-2">
            <div className="relative h-32 w-full">
              <div className="relative h-32 mx-auto" style={{ width: "140px" }}>
                <Image
                  src={
                    product?.product_card_image?.formats?.thumbnail?.url ||
                    product?.image[0]?.formats?.medium?.url ||
                    "/fallback-image.png"
                  }
                  alt={product?.name}
                  style={{ objectFit: "cover" }}
                  className="rounded-md"
                  width={220}
                  height={220}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>

      <div className="bg-emerald-100 p-5 transition-colors duration-300 rounded-3xl group-hover:bg-emerald-200">
        <div className="p-0">
          <Link href={`/products/${product?.slug}`}>
            <h3 className="text-gray-700 dark:text-white text-md font-bold mb-1">
              {product.name.slice(0, 30)}...
            </h3>
          </Link>
        </div>
        <div className="p-0 flex justify-between items-center mt-2">
          <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            {product?.subtitle?.slice(0, 20)}...
          </p>
          <button
            className="rounded-full bg-gray-700 text-white hover:bg-gray-900 p-2"
            aria-label="Add to Wishlist"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;