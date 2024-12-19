import { TBlog } from './blog.interface';
import { Blog } from './blog.model';

const createBlogIntoDB = async (payload: TBlog) => {
    const blog = await Blog.create(payload);
    const result = await Blog.findById(blog._id)
        .select('_id title content author') // TODO: POPULATE
        .lean(); // .lean() returns the returned data as a JavaScript object
    return result;
};

export const BlogServices = {
    createBlogIntoDB
};
