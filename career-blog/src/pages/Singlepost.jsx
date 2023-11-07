import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";

const Singlepost = () => {
  const [post, setPost] = useState(null);
  const [formatDate, setFormatDate] = useState(null);

  const params = useParams();
  const postId = params.id;

  useEffect(() => {
    const postUrl = `http://localhost:8090/blog/post/${postId}`;

    axios
      .get(postUrl)
      .then((response) => {
        setPost(response.data);

        const dateString = response.data.date;
        console.log(dateString);
        const date = new Date(dateString);

        const months = [
          "JANUARY",
          "FEBRUARY",
          "MARCH",
          "APRIL",
          "MAY",
          "JUNE",
          "JULY",
          "AUGUST",
          "SEPTEMBER",
          "OCTOBER",
          "NOVEMBER",
          "DECEMBER",
        ];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        setFormatDate(`${day} ${month}, ${year}`);
        console.log(response);
      })
      .catch((error) => {
        console.error("Error fetching post data:", error);
      });
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  // Render the post data here
  return (
    <>
      <div className=" flex flex-col gap-16">
        <Header></Header>
        <div className="flex flex-col gap-6 justify-center text-left mx-auto w-[50%]">
          <h1 className=" text-5xl font-semibold">{post.title}</h1>
          <div className=" mt-4">
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
            <p className=" text-sm opacity-60">PUBLISHED ON {formatDate}</p>
          </div>
          <div
            className=" leading-9"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
          <pre>{post.codeSnippet}</pre>
        </div>
      </div>
    </>
  );
};

export default Singlepost;
