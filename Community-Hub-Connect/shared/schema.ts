import { sql } from "drizzle-orm";
import { pgTable, text, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const RESOURCE_CATEGORIES = [
  "Non-Profits",
  "Support Services",
  "Community Events",
  "Health Services",
  "Education",
  "Food & Housing",
  "Youth Programs",
  "Senior Services",
] as const;

export const SERVICE_TYPES = [
  "Counseling",
  "Food Assistance",
  "Housing Support",
  "Job Training",
  "Legal Aid",
  "Medical Care",
  "Mental Health",
  "Youth Development",
  "Senior Care",
  "Emergency Services",
  "Education",
  "Recreation",
] as const;

export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number];
export type ServiceType = (typeof SERVICE_TYPES)[number];

export interface Resource {
  id: string;
  name: string;
  description: string;
  category: ResourceCategory;
  services: ServiceType[];
  phone: string;
  email: string;
  website: string;
  address: string;
  isFeatured: boolean;
  impactStatement?: string;
}

export interface ResourceSubmission {
  id: string;
  organizationName: string;
  category: ResourceCategory;
  description: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  address: string;
  services: ServiceType[];
  additionalNotes: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
}

export const insertResourceSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum(RESOURCE_CATEGORIES),
  services: z.array(z.enum(SERVICE_TYPES)).min(1, "Select at least one service"),
  phone: z.string().optional().default(""),
  email: z.string().email("Invalid email format").optional().or(z.literal("")),
  website: z.string().url("Invalid URL format").optional().or(z.literal("")),
  address: z.string().optional().default(""),
  isFeatured: z.boolean().optional().default(false),
  impactStatement: z.string().optional(),
});

export const insertSubmissionSchema = z.object({
  organizationName: z.string().min(1, "Organization name is required"),
  category: z.enum(RESOURCE_CATEGORIES),
  description: z.string().min(10, "Description must be at least 10 characters"),
  contactEmail: z.string().email("Valid email is required"),
  contactPhone: z.string().optional().default(""),
  website: z.string().url("Invalid URL format").optional().or(z.literal("")),
  address: z.string().optional().default(""),
  services: z.array(z.enum(SERVICE_TYPES)).min(1, "Select at least one service"),
  additionalNotes: z.string().optional().default(""),
});

export type InsertResource = z.infer<typeof insertResourceSchema>;
export type InsertSubmission = z.infer<typeof insertSubmissionSchema>;
