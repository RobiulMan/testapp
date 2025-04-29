// types/product.ts
interface Image {
  id: number;
  url: string;
  width?: number;
  height?: number;
  alternativeText?: string;
  formats?: {
    thumbnail?: ImageFormat;
    small?: ImageFormat;
    medium?: ImageFormat;
    large?: ImageFormat;
  };
}

interface ImageFormat {
  url: string;
  width: number;
  height: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  products?: Product[];
}

export interface Product {
  id: number;
  documentId: string;
  name: string;
  subtitle: string;
  price: number;
  description: string[]; // Assuming this is an array of strings, adjust if needed
  size: string | null;
  original_price: number | null;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: Image[];
  thumbnail: Image;
  product_card_image: Image;
  categories: Category[];
}

export interface ProductCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: null | string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  products: Product[];
}