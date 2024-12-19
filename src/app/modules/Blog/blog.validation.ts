import { z } from 'zod';

const createBlogValidationSchema = z.object({
    body: z.object({
        title: z
            .string({ required_error: 'Title is required.' })
            .trim()
            .min(3, 'Title must be at least 3 characters long.'),
        content: z
            .string({ required_error: 'Content is required.' })
            .min(4, 'Content must be at least 4 characters long.'),
        author: z
            .string({ required_error: 'Author is required.' })
            .min(4, 'Author must be at least 4 characters long.')
            .optional(), //TODO: Delete this line
        isPublished: z.boolean().default(true).optional()
    })
});

export const BlogValidations = {
    createBlogValidationSchema
};
