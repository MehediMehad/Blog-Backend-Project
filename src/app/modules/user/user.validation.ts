import { z } from 'zod';

const createCourseValidationSchema = z.object({
    body: z.object({
        name: z.string().trim().min(1, 'Name is required.'),
        email: z
            .string()
            .email('Invalid email format.')
            .min(1, 'Email is required.'),
        password: z.string().min(1, 'Password is required.'),
        role: z
            .enum(['admin', 'user'], {
                errorMap: () => ({ message: 'Invalid user role.' })
            })
            .optional(),
        isBlocked: z.boolean().optional()
    })
});

export const UserValidation = {
    createCourseValidationSchema
};
