import { z } from 'zod';

export const jobSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters").max(100),
    description: z.string().min(20, "Description must be at least 20 characters"),
    budget: z.number().min(0, "Budget cannot be negative"),
    category: z.string().min(1, "Please select a category"),
    location: z.string().optional(),
    deadline: z.string().optional(),
    skills_required: z.array(z.string()).optional(),
});

export const productSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100),
    description: z.string().min(10, "Description must be at least 10 characters"),
    price: z.number().min(0, "Price cannot be negative"),
    category: z.string().min(1, "Please select a category"),
    location: z.string().optional(),
    image_url: z.string().url("Please provide a valid image URL"),
});

export type JobInput = z.infer<typeof jobSchema>;
export type ProductInput = z.infer<typeof productSchema>;
