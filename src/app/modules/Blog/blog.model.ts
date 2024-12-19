import { Schema, model } from 'mongoose';
import { TBlog } from './blog.interface';

const BlogSchema = new Schema<TBlog>(
    {
        title: { type: String, required: [true, 'Title id is required'] },
        content: { type: String, required: [true, 'Content id is required'] },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Author is required.']
        },
        isPublished: { type: Boolean, default: true }
    },
    {
        timestamps: true // Automatically handles createdAt and updatedAt
    }
);

export const Blog = model<TBlog>('Blog', BlogSchema);
