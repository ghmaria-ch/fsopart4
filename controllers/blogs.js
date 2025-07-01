const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const userExtractor = require("../utils/middleware").userExtractor;

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }
  response.json(blog);
});

blogsRouter.post("/", userExtractor, async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "Unauthorized: No valid user" });
  }

  const { title, author, url, likes } = request.body;
  if (!title || !url || !author) {
    return response.status(400).json({ error: "Title, URL or Author missing" });
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes || 0,
    user: request.user.id,
  });

  const savedBlog = await blog.save();
  request.user.blogs = request.user.blogs.concat(savedBlog._id);
  await request.user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "Unauthorized: No valid user" });
  }

  const blog = await Blog.findById(request.params.id);
  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  if (blog.user.toString() !== request.user.id) {
    return response.status(403).json({ error: "Permission denied" });
  }

  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;
  if (!title || !author) {
    return response.status(400).json({ error: "Title or Author missing" });
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes },
    { new: true, runValidators: true, context: "query" }
  );

  if (!updatedBlog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  response.json(updatedBlog);
});

module.exports = blogsRouter;
