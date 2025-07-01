const _ = require("lodash");
const User = require("../models/user");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  let favorite = blogs[0];
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > favorite.likes) {
      favorite = blogs[i];
    }
  }

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogsWithLodash = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  // Group blogs by author and count them
  const authorCounts = _.countBy(blogs, "author");

  // Find author with most blogs
  const topAuthor = _.maxBy(
    Object.keys(authorCounts),
    (author) => authorCounts[author]
  );

  return {
    author: topAuthor,
    blogs: authorCounts[topAuthor],
  };
};
const mostLikesWithLodash = (blogs) => {
  if (blogs.length === 0) {
    return null;
  }

  const authorLikes = _.reduce(
    blogs,
    (acc, blog) => {
      acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
      return acc;
    },
    {}
  );
  //   console.log(authorLikes);

  const topAuthor = _.maxBy(
    Object.keys(authorLikes),
    (author) => authorLikes[author]
  );

  return {
    author: topAuthor,
    likes: authorLikes[topAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogsWithLodash,
  mostLikesWithLodash,
};
