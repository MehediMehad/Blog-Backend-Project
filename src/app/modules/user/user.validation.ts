import { z } from 'zod';

const createCourseValidationSchema = z.object({
    body: z.object({
        name: z
            .string({ required_error: 'Name is required.' })
            .trim()
            .min(3, 'Name must be at least 3 characters long.'),
        email: z
            .string({ required_error: 'Email is required.' })
            .email('Invalid email format.')
            .min(4, 'Email must be at least 4 characters long.'),
        password: z
            .string({ required_error: 'Password is required.' })
            .min(4, 'Password must be at least 4 characters long.'),
        role: z
            .enum(['admin', 'user'], {
                errorMap: () => ({ message: 'Invalid user role.' })
            })
            .optional(),
        isBlocked: z.boolean().default(false)
    })
});

export const UserValidation = {
    createCourseValidationSchema
};
