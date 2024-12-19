import { Types } from 'mongoose';

export interface TBlog {
    title: string;
    content: string;
    author: Types.ObjectId; // Reference to the User model (author's ID)
    isPublished: boolean;
}
