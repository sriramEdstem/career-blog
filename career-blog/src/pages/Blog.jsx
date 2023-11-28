import Header from "../components/Header/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import { useSelector } from "react-redux";
const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    console.log(currentPage);

    console.log(token);
    axios
      .post(
        "http://localhost:8090/blog/post/list",
        {
          pageNumber: currentPage,
          pageSize: 10,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setPosts(response.data.posts);
        console.log(response.data);
        const totalPosts = response.data.totalPosts || 0;
        const calculatedTotalPages = Math.ceil(totalPosts / 10);
        setTotalPage(calculatedTotalPages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [currentPage]);

  const formatDate = (dateString) => {
    if (!dateString) return null;

    const date = new Date(dateString);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${monthNames[monthIndex]} ${year}`;
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  return (
    <div className="h-screen dark:bg-custm-black">
      <Header></Header>
      <div className="  mx-auto flex flex-col items-center mt-4">
        <label className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 pointer-events-none absolute top-6 transform -translate-y-1/2 left-28 opacity-50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </label>
        <input
          className="dark:bg-black border-slate-200 rounded-full w-80 h-12 pl-4 placeholder:pl-2 border-4"
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </div>
      {searchQuery ? (
        <Search searchQuery={searchQuery}></Search>
      ) : (
        <div className="dark:bg-custm-black">
          <div className="flex flex-col justify-start text-left mx-auto w-[50%]">
            {posts.map((post) => (
              <div key={post.id} className="flex flex-col gap-12 mt-12">
                <div className="flex flex-col gap-16">
                  <div key={post.id} className="post">
                    <div className="flex">
                      <div className="text-base font-extralight pt-[1px] w-30 pr-10">
                        {post.updatedTime ? (
                          <p>{formatDate(post.updatedTime)}</p>
                        ) : (
                          <p>{formatDate(post.createdTime)}</p>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <Link to={`/blogs/${post.id}`}>
                            <h1 className="dark:text-white dark:hover:bg-opacity-50 dark:bg-opacity-70 dark:bg-blue-300 hover:bg-blue-100 bg-opacity-50 bg-blue-300 hover:text-black hover:bg-opacity-70 px-4 text-black text-lg transition-all duration-300">
                              {post.title}
                            </h1>
                          </Link>
                        </div>
                        <div className="mt-4  ">
                          {Array.isArray(post.categories) &&
                            post.categories.map((category, index) => (
                              <span
                                key={index}
                                className="mr-2  text-[14px] px-2 dark:text-white dark:bg-light-brown cursor-pointer dark:hover:bg-dark-brown dark:hover:text-white hover:bg-dark-gold bg-light-gold hover:text-black py-1 leading-0 text-black transition-all duration-300"
                              >
                                <Link to={`/blog/category/${category}`}>
                                  {"#"}
                                  {category}
                                </Link>
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-10 mt-14">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="dark:text-black disabled:bg-slate-300 disabled:opacity-60 px-2 py-1 rounded bg-slate-200"
            >
              Previous Page
            </button>
            <button
              disabled={currentPage == totalPage - 1}
              onClick={() => setCurrentPage(currentPage + 1)}
              className=" dark:text-black disabled:bg-slate-300 disabled:opacity-60  px-2 py-1 rounded bg-slate-200"
            >
              Next Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
