import { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPost,
  createNewPost,
  updatePost,
  resetPostState,
} from "../createPostSlice";

const Create = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const urlSearchParams = new URLSearchParams(window.location.search);
  const editValue = urlSearchParams.get("edit");
  const post = useSelector((state) => state.posts.post);
  const loading = useSelector((state) => state.posts.loading);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    codeSnippet: "",
    categoryInput: "",
    categories: [],
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleAddCategory = (e) => {
    e.preventDefault();
    if (formData.categoryInput) {
      const newCategories = formData.categoryInput.split(",");
      setFormData({
        ...formData,
        categories: [...formData.categories, ...newCategories],
        categoryInput: "",
      });
    }
  };
  useEffect(() => {
    dispatch(resetPostState());
    if (editValue) {
      dispatch(fetchPost({ postId: editValue, token }));
    }
  }, []);
  useEffect(() => {
    setFormData({
      title: post.title || "",
      content: post.content || "",
      codeSnippet: post.codeSnippet || "",
      categories: post.categories || [],
      categoryInput: "",
    });
  }, [post]);

  const handleSubmit = (e) => {
    const currentDate = new Date();
    e.preventDefault();

    const formattedDate = currentDate.toISOString().split("T")[0];
    const postData = {
      ...formData,
      date: formattedDate,
    };
    if (editValue) {
      dispatch(updatePost({ postId: editValue, postData, token }));
    } else {
      dispatch(createNewPost(postData));
    }
  };

  const gapSize = 400 - (formData.categories.length + 1) * 24 + "px";

  return loading ? (
    <h1>Loading</h1>
  ) : (
    <div className="h-screen dark:bg-custm-black">
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="flex mt-20 gap-32 justify-center items-start mx-56">
          <div>
            <h1 className=" text-xl pb-2">Create Blog</h1>
            <div>
              <input
                required
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
                className="px-4 w-[700px] text-3xl h-[50px] border-[1px] dark:bg-custm-black border-gray-400 bg-white dark:text-white"
              />
              <ReactQuill
                className=" w-[700px] h-[250px]"
                theme="snow"
                name="content"
                value={formData.content}
                onChange={(value) =>
                  setFormData({ ...formData, content: value })
                }
              />
              <p className="mt-[50px] text-base ">
                Add code block{" "}
                <span className=" text-sm opacity-40">(optional)</span>
              </p>
              <textarea
                name="code"
                placeholder="enter code "
                value={formData.codeSnippet}
                onChange={handleInputChange}
                className="px-4 border-[1px] dark:bg-custm-black placeholder:opacity-25  placeholder:text-black dark:placeholder:text-white border-gray-400 bg-white dark:text-white w-[700px] h-[200px]"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-col" style={{ gap: gapSize }}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-center justify-center"></div>
              <div>
                <input
                  type="text"
                  name="categoryInput"
                  placeholder="Categories"
                  value={formData.categoryInput}
                  onChange={handleInputChange}
                  className="px-4 dark:text-white dark:bg-custm-black dark:placeholder:opacity-30 placeholder:text-center dark:placeholder:text-white border-cyan-200 hover:border-cyan-300 rounded-lg border-2 py-2 px-3"
                />
                <button
                  type="button"
                  className="px-2 bg-blue-300 dark:text-black ml-3 hover:bg-blue-400"
                  onClick={handleAddCategory}
                >
                  Add a Category
                </button>
              </div>
              <div>
                <p>Categories:</p>
                {formData.categories.length > 0 && (
                  <div>
                    <ul>
                      {formData.categories.map((cat, index) => (
                        <li key={index}>{cat}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center gap-8 flex-col px-2">
              {editValue ? (
                <div>
                  <button
                    type="submit"
                    className="px-10 py-4 bg-yellow-300 dark:text-black hover-bg-yellow-400"
                  >
                    Update
                  </button>
                </div>
              ) : (
                <div>
                  <button
                    type="submit"
                    className="px-10 py-4 bg-green-300 dark:text-black hover-bg-green-400"
                  >
                    Publish
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;
