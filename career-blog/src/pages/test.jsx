import { useState } from "react";
import Header from "../components/Header/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Create = () => {
  const [value, setValue] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState([]);

  const handleAddCategory = () => {
    if (categoryInput) {
      const newCategories = categoryInput.split(",");
      setCategories([...categories, ...newCategories]);
      setCategoryInput("");
    }
  };

  return (
    <div className=" h-screen dark:bg-custm-black">
      <Header></Header>
      <form>
        <div className="flex mt-20 gap-32 justify-center items-start mx-56">
          <div>
            <h1>Create Blog</h1>
            <div className="">
              <input
                placeholder="Title"
                className="w-[700px] h-[40px] border-[1px]  dark:bg-custm-black border-gray-400 bg-white dark:text-white"
              ></input>
              <ReactQuill
                className="w-[700px] h-[300px]"
                theme="snow"
                value={value}
                onChange={setValue}
              ></ReactQuill>
              <p className="mt-[50px]">Add code block</p>
              <textarea className="  border-[1px] dark:bg-custm-black border-gray-400 bg-white dark:text-white w-[700px] h-[200px] type=text value"></textarea>
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-[200px]">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col items-center justify-center">
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="file"
                  name=""
                />
                <label
                  className="bg-red-400 dark:text-black px-2 hover:bg-red-500"
                  htmlFor="file"
                >
                  Upload Image
                </label>
              </div>
              <div>
                <input
                  placeholder="Categories"
                  value={categoryInput}
                  onChange={(e) => setCategoryInput(e.target.value)}
                  className="dark:text-white dark:bg-custm-black dark:placeholder:opacity-30 placeholder:text-center dark:placeholder:text-white border-cyan-200 hover:border-cyan-300 rounded-lg border-2 py-2 px-3"
                />
                <button
                  className="px-2 bg-blue-300 dark:text-black ml-3 hover:bg-blue-400"
                  onClick={handleAddCategory}
                >
                  Add a Category
                </button>
              </div>
              {categories.length > 0 && (
                <div>
                  <p>Categories:</p>
                  <ul>
                    {categories.map((cat, index) => (
                      <li key={index}>{cat}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center gap-8 flex-col px-2">
              <div>
                <button className="px-2 bg-yellow-300 dark:text-black hover:bg-yellow-400">
                  Save as a draft
                </button>
              </div>
              <div>
                <button className="px-2 bg-green-300 dark:text-black hover:bg-green-400">
                  Publish
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Create;
