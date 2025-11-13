import { z } from "zod";

/**
 * Validation schema for host and port parameters
 * Used across all system monitoring API routes
 */
export const systemQuerySchema = z.object({
  host: z
    .string()
    .min(1, "Host is required")
    .regex(
      /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i,
      "Invalid hostname format",
    ),
  port: z
    .string()
    .regex(/^\d+$/, "Port must be a number")
    .transform(Number)
    .refine((port) => port >= 1 && port <= 65535, {
      message: "Port must be between 1 and 65535",
    }),
});

/**
 * Validation schema for search query parameters
 */
export const searchQuerySchema = z.object({
  query: z.string().max(100, "Query too long").optional(),
  page: z
    .string()
    .regex(/^\d+$/, "Page must be a number")
    .transform(Number)
    .refine((page) => page >= 1, "Page must be at least 1")
    .optional(),
});

export type SystemQuery = z.infer<typeof systemQuerySchema>;
export type SearchQuery = z.infer<typeof searchQuerySchema>;
