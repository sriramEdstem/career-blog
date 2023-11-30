import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { searchPosts } from "../blogSlice";
import { Link } from "react-router-dom";

const Search = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const searchResults = useSelector((state) => state.blog.searchResults);

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchPosts({ query: searchQuery, token }));
    }
  }, [searchQuery, dispatch, token]);

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
  return (
    <div className="w-full">
      {searchResults.length > 0 && (
        <div className="mt-4 dark:bg-custm-black">
          <div className="flex flex-col justify-start text-left mx-auto w-[50%]">
            {searchResults.map((post) => (
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
                        {(!selectedCategory ||
                          post.categories.includes(selectedCategory)) && (
                          <div className="mt-4  ">
                            {Array.isArray(post.categories) &&
                              post.categories.map((category, index) => (
                                <span
                                  key={index}
                                  onClick={() => setSelectedCategory(category)}
                                  className="mr-2  text-[14px] px-2 dark:text-white dark:bg-light-brown cursor-pointer dark:hover:bg-dark-brown dark:hover:text-white hover:bg-dark-gold bg-light-gold hover:text-black py-1 leading-0 text-black transition-all duration-300"
                                >
                                  {"#"}
                                  {category}
                                </span>
                              ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
