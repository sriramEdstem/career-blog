import "./App.css";
import About from "./pages/About";
import Blog from "./pages/Blog";
import { Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import Singlepost from "./pages/Singlepost";

function App() {
  return (
    <div className=" bg-custm-white dark:bg-custm-black text-black dark:text-white">
      <Routes>
        <Route path="/" element={<About></About>} />
        <Route path="/blog" element={<Blog />} />
        <Route path="blogs/:id" element={<Singlepost />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
