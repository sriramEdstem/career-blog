import Header from "../components/Header/Header";
import { useState } from "react";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
      date: "2023-01-15",
      categories: ["technical interviews", "javascript"],
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
      date: "2023-02-20",
      categories: ["musing", "javascript"],
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
      date: "2022-12-10",
      categories: ["musing", "typescript"],
    },
    {
      id: 4,
      title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
      date: "2022-11-05",
      categories: ["react", "typescript", "v8"],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);

  const postsWithYear = posts.map((post) => ({
    ...post,
    year: new Date(post.date).getFullYear(),
  }));

  const postsByYear = postsWithYear.reduce((acc, post) => {
    if (!acc[post.year]) {
      acc[post.year] = [];
    }
    acc[post.year].push(post);
    return acc;
  }, {});

  const formatDate = (date) => {
    const options = { month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const years = Object.keys(postsByYear).sort((a, b) => b - a);

  return (
    <>
      <Header></Header>

      <div className="flex flex-col justify-center text-left mx-auto w-[50%]">
        <div>
          <h1>tags:</h1>
          {selectedCategory && (
            <button
              className="mr-2 cursor-pointer text-[14px] dark.text-white dark.bg-light-brown dark:hover.bg-dark-brown dark.hover.text-white hover.bg-dark-gold bg-light-gold hover.text-black px-1 leading-0 text-black transition-all duration-300"
              onClick={() => setSelectedCategory(null)}
            >
              #All
            </button>
          )}
          <></>
        </div>
        {years.map((year) => (
          <div key={year} className="year-section flex flex-col gap-12 mt-20">
            <h2 className="font-semibold text-xl">{year}</h2>
            <div className="flex flex-col gap-10">
              {postsByYear[year].map((post) => (
                <div key={post.id} className="post">
                  {(!selectedCategory ||
                    post.categories.includes(selectedCategory)) && (
                    <div className="flex items-center">
                      <div className="text-lg pt-[1px] w-20">
                        {formatDate(post.date)}
                      </div>
                      <h1 className="dark:text-white cursor-pointer dark:hover:bg-opacity-50 dark.bg-opacity-70 dark.bg-blue-300 hover.bg-blue-100 bg-opacity-50 bg-blue-300 hover.text-black hover.bg-opacity-70 px-4 text-black text-lg transition-all duration-300">
                        {post.title}
                      </h1>
                    </div>
                  )}
                  {(!selectedCategory ||
                    post.categories.includes(selectedCategory)) && (
                    <div className="mt-4">
                      {post.categories.map((category, index) => (
                        <span
                          key={index}
                          className="mr-2 cursor-pointer text-[14px] dark.text-white dark.bg-light-brown dark:hover.bg-dark-brown dark.hover.text-white hover.bg-dark-gold bg-light-gold hover.text-black px-1 leading-0 text-black transition-all duration-300"
                          onClick={() => setSelectedCategory(category)}
                        >
                          {"#"}
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Blog;
