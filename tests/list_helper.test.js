const { test, describe } = require("node:test");
const assert = require("node:assert");
const _ = require("lodash");
const listHelper = require("../utils/list_helper");
// list of blogs
const emptyList = [];
const listWithOneBlog = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
];

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
// dummy test
test("dummy returns one", () => {
  const blogs = [];
  assert.strictEqual(listHelper.dummy(blogs), 1);
});
// total likes test
describe("total likes", () => {
  test("of empty list is zero", () => {
    assert.strictEqual(listHelper.totalLikes(emptyList), 0);
  });
  test("when list has only one blog equals the likes of that", () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 7);
  });
  test("of a bigger list is calculated right", () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 38);
  });
});
// favourite blog test
describe("favourite blog", () => {
  test("of empty list is zero", () => {
    assert.strictEqual(listHelper.favoriteBlog(emptyList), null);
  });
  test("when list has only one blog equals the likes of that", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7,
    });
  });
  test("of a bigger list is calculated right", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    });
  });
});
// most blogs test
describe("most blogs", () => {
  test("of empty list is zero", () => {
    assert.strictEqual(listHelper.mostBlogsWithLodash(emptyList), null);
  });
  test("when list has only one blog equals the likes of that", () => {
    assert.deepStrictEqual(listHelper.mostBlogsWithLodash(listWithOneBlog), {
      author: "Michael Chan",
      blogs: 1,
    });
  });
  test("of a bigger list is calculated right", () => {
    assert.deepStrictEqual(listHelper.mostBlogsWithLodash(blogs), {
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});
// most likes test
describe("most likes", () => {
  test("of empty list is zero", () => {
    assert.strictEqual(listHelper.mostLikesWithLodash(emptyList), null);
  });
  test("when list has only one blog equals the likes of that", () => {
    assert.deepStrictEqual(listHelper.mostLikesWithLodash(listWithOneBlog), {
      author: "Michael Chan",
      likes: 7,
    });
  });
  test("of a bigger list is calculated right", () => {
    assert.deepStrictEqual(listHelper.mostLikesWithLodash(blogs), {
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
