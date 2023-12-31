import { useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchSinglePost } from "../postDetailSlice";

const Singlepost = () => {
  const dispatch = useDispatch();
  const { id: postId } = useParams();
  const post = useSelector((state) => state.singlePost.post);
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  const nav = useNavigate();

  useEffect(() => {
    dispatch(fetchSinglePost({ postId, token }));
  }, [dispatch, postId, token]);

  const formatDatee = (dateString) => {
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

  const removeItem = () => {
    axios
      .delete(`http://localhost:8090/blog/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        nav("/blog");
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  return (
    <>
      <div className=" flex flex-col gap-16 dark:bg-custm-black h-[100vh]">
        <Header></Header>
        <div className="flex flex-col gap-6 h-[100%] dark:bg-custm-black justify-start h-auto text-left mx-auto w-[50%]">
          <h1 className=" text-5xl font-semibold">{post.title}</h1>
          <div className=" mt-4 flex justify-between">
            <div>
              {Array.isArray(post.categories) &&
                post.categories.map((category, index) => (
                  <span
                    key={index}
                    className=" mr-2 text-[15px] dark.text-white dark.bg-light-brown  dark:hover.bg-dark-brown dark.hover.text-white hover.bg-dark-gold  bg-light-gold hover.text-black  px-1 leading-0 text-black transition-all duration-300"
                  >
                    {category}
                  </span>
                ))}
            </div>
            <div>
              {role === "ADMIN" && (
                <div className="flex gap-6">
                  <Link to={`/create?edit=${post.id}`} state={post}>
                    <button>Edit</button>
                  </Link>
                  <button onClick={removeItem}>Remove</button>
                </div>
              )}
            </div>
          </div>
          <div>
            <p className=" text-sm opacity-60">
              PUBLISHED ON{" "}
              {post.updatedTime ? (
                <span>{formatDatee(post.updatedTime)}</span>
              ) : (
                <span>{formatDatee(post.createdTime)}</span>
              )}
            </p>
          </div>
          <div
            className=" leading-9"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
          {post.codeSnippet && (
            <pre className=" bg-orange-200 mb-11 bg-opacity-60 py-8 px-5">
              {post.codeSnippet}
            </pre>
          )}
        </div>
      </div>
    </>
  );
};

export default Singlepost;
