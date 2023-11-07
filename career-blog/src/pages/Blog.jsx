import Header from "../components/Header/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const [disabled, setDisabled] = useState(false);
  const [catg, setCatg] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8090/blog/post")
      .then((response) => {
        setPosts(response.data);
        console.log(response);
        const categoriesArray = response.data.map((item) => item.categories);
        const combinedCategories = categoriesArray.reduce(
          (result, categories) => {
            if (categories) {
              categories.forEach((category) => {
                if (!result.includes(category)) {
                  result.push(category);
                }
              });
            }
            return result;
          },
          []
        );
        setCatg(combinedCategories);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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

  const previous = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPagess = Math.ceil(
    Object.values(postsByYear).flat().length / postsPerPage
  );

  const nextPage = () => {
    const totalPages = Math.ceil(
      Object.values(postsByYear).flat().length / postsPerPage
    );
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const formatDate = (date) => {
    const options = { month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const years = Object.keys(postsByYear).sort((a, b) => b - a);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  return (
    <>
      <Header></Header>
      <div className="flex flex-col justify-center text-left mx-auto w-[50%]">
        <h1>tags:</h1>
        <div>
          {catg.map((item, index) => (
            <span
              key={index}
              onClick={() => setSelectedCategory(item)}
              className="mr-2 cursor-pointer text-[14px] dark.text-white dark.bg-light-brown dark:hover.bg-dark-brown dark.hover.text-white hover.bg-dark-gold bg-light-gold hover.text-black px-1 leading-0 text-black transition-all duration-300"
            >
              {"#"}
              {item}
            </span>
          ))}
        </div>
        {years.map((year) => (
          <div key={year} className="year-section flex flex-col gap-12 mt-20">
            <h2 className="font-semibold text-xl">{year}</h2>
            <div className="flex flex-col gap-10">
              {postsByYear[year]
                .slice(indexOfFirstPost, indexOfLastPost)
                .filter((post) => {
                  return (
                    selectedCategory === null ||
                    post.categories?.includes(selectedCategory)
                  );
                })
                .map((post) => {
                  return (
                    <div key={post.id} className="post">
                      <div className="flex items-center">
                        <div className="text-lg pt-[1px] w-20">
                          {formatDate(post.date)}
                        </div>
                        <Link to={`/blogs/${post.id}`}>
                          <h1 className="dark:text-white dark:hover:bg-opacity-50 dark.bg-opacity-70 dark.bg-blue-300 hover.bg-blue-100 bg-opacity-50 bg-blue-300 hover.text-black hover.bg-opacity-70 px-4 text-black text-lg transition-all duration-300">
                            {post.title}
                          </h1>
                        </Link>
                      </div>
                      {(!selectedCategory ||
                        post.categories.includes(selectedCategory)) && (
                        <div className=" mt-4">
                          {Array.isArray(post.categories) &&
                            post.categories.map((category, index) => (
                              <span
                                key={index}
                                onClick={() => setSelectedCategory(category)}
                                className=" mr-2 text-[14px] dark.text-white dark.bg-light-brown cursor-pointer  dark:hover.bg-dark-brown dark.hover.text-white hover.bg-dark-gold  bg-light-gold hover.text-black  px-1 leading-0 text-black transition-all duration-300"
                              >
                                {"#"}
                                {category}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-10 mt-14">
        <div>
          <button
            disabled={currentPage <= 1}
            className="dark.text-black disabled:bg-slate-300 disabled:opacity-60 px-2 py-1 rounded bg-slate-200"
            onClick={previous}
          >
            Previous Page
          </button>
        </div>
        <div>
          <button
            disabled={currentPage >= totalPagess}
            className=" dark.text-black disabled:bg-slate-300 disabled:opacity-60  px-2 py-1 rounded bg-slate-200"
            onClick={nextPage}
          >
            Next Page
          </button>
        </div>
      </div>
    </>
  );
};

export default Blog;

// const filteredPosts = posts.filter((post) => {
//   if (Array.isArray(post.categories)) {
//     return post.categories.includes("2023");
//   }
//   return false;
// })
