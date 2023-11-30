import Header from "../components/Header/Header";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoryPosts } from "../blogSlice";

const Categorypage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const params = useParams();
  const postId = params.ID;
  const nav = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const posts = useSelector((state) => state.blog.posts);
  const status = useSelector((state) => state.blog.status);

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

  useEffect(() => {
    dispatch(categoryPosts({ token, category: postId }));
  }, []);

  return status === "succeeded" ? (
    <div className="h-screen dark:bg-custm-black">
      <Header></Header>
      <div className="dark:bg-custm-black">
        <div className="flex flex-col justify-start  text-left mx-auto w-[50%]">
          <h1 className="mt-8"></h1>
          <div className=" ">
            <span
              onClick={() => nav("/blog")}
              className="mr-4 cursor-pointer text-[14px] dark:text-white px-2 py-1 dark:bg-light-brown dark:hover:bg-dark-brown dark:hover:text-white hover:bg-dark-gold bg-light-gold hover:text-black  leading-0 text-black transition-all duration-300"
            >
              #Return to all categories
            </span>
            <div className="w-[80%] flex items-start">
              <div className="mt-4 dark:bg-custm-black">
                <div className="flex flex-col justify-start text-left mx-auto w-full">
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
                              {(!selectedCategory ||
                                post.categories.includes(selectedCategory)) && (
                                <div className="mt-4  ">
                                  {Array.isArray(post.categories) &&
                                    post.categories.map((category, index) => (
                                      <span
                                        key={index}
                                        onClick={() =>
                                          setSelectedCategory(category)
                                        }
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
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <h1> Loading</h1>
  );
};

export default Categorypage;
