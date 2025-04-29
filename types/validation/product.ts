import { z } from "zod";

// Create a schema for the description item objects
const DescriptionItemSchema = z
  .object({
    // Add the fields that are actually in your description objects
    // This is an example - adjust based on your actual data structure
    type: z.string().optional(),
    content: z.string().optional(),
    children: z.array(z.any()).optional(),
    // Add other properties that might be in the description objects
  })
  .or(z.string()); // Allow strings too for flexibility

// Make the schema more flexible to accommodate different data structures
export const ProductSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  name: z.string(),
  subtitle: z.string(),
  price: z.number(),
  description: z.any(), // Keep flexible for now
  size: z.string().nullable().optional(),
  original_price: z.number().nullable().optional(),
  slug: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),

  // Make these fields optional or provide defaults
  image: z.array(z.any()).optional().default([]),
  thumbnail: z.any().optional(),
  product_card_image: z.any().optional(),
  categories: z.array(z.any()).optional().default([]),
});

export type ValidatedProduct = z.infer<typeof ProductSchema>;
