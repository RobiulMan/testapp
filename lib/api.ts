import { STRAPI_API_TOKEN, STRAPI_API_URL } from "@/lib/urls";
import { ProductSchema, ValidatedProduct } from "@/types/validation/product";

export const fetchDataFromStrapi = async (
  url: string,
  idOrSlug?: string,
  isSlug = false,
  options: {
    cache?: RequestCache;
    next?: { tags?: string[]; revalidate?: number };
  } = {},
): Promise<{ data: ValidatedProduct[]; meta?: any }> => {
  const fetchOption = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    next: {
      // Define default tags based on URL pattern
      tags: options.next?.tags || [
        url.includes("/products")
          ? "products"
          : url.includes("/categories")
            ? "categories"
            : "content",
      ],
      // Optional time-based revalidation as fallback
      ...(options.next?.revalidate && { revalidate: options.next.revalidate }),
    },
    ...options,
  };

  console.log(
    "fetchDataFromStrapi function before apiurl =>",
    `${STRAPI_API_URL}${url}`,
  );
  console.log("testing url =>", STRAPI_API_URL);
  let apiUrl = `${STRAPI_API_URL}${url}`;

  if (idOrSlug) {
    if (isSlug) {
      // Query by slug using filter
      apiUrl = `${STRAPI_API_URL}/api/products?filters[slug][$eq]=${idOrSlug}&populate=*`;
    } else {
      // Query directly by ID
      apiUrl = `${STRAPI_API_URL}/api/products/${idOrSlug}?populate=*`;
    }
  }

  try {
    const response = await fetch(apiUrl, fetchOption);

    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      return { data: [] };
    }

    const responseData = await response.json();

    // Check the shape of the response data
    if (!responseData || !responseData.data) {
      console.error("Unexpected API response format:", responseData);
      return { data: [] };
    }

    // Parse the array of products
    const products = Array.isArray(responseData.data)
      ? responseData.data
      : [responseData.data];

    // Return both data and meta
    return {
      data: products,
      meta: responseData.meta,
    };
  } catch (error) {
    // Clear the timeout in case of error

    // Better error logging with specific timeout detection
    if (error instanceof Error && error.name === "AbortError") {
      console.error(`Request timeout after 15 seconds for ${apiUrl}`);
    } else {
      console.error(`API or validation error for ${apiUrl}:`, error);
    }

    return { data: [] };
  }
};

export const fetchPaginatedProducts = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  filters?: Record<string, any>,
  options: {
    cache?: RequestCache;
    next?: { tags?: string[]; revalidate?: number };
  } = {},
) => {
  // Build query string with pagination
  let query = `?populate=*&pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}`;

  // Add any filters
  if (filters) {
    for (const [key, value] of Object.entries(filters)) {
      query += `&filters[${key}]=${encodeURIComponent(value)}`;
    }
  }

  return fetchDataFromStrapi(
    `/api/products${query}`,
    undefined,
    false,
    options,
  );
};
