import "./App.css";
import About from "./pages/About";
import Blog from "./pages/Blog";
import { Routes, Route } from "react-router-dom";
import Create from "./pages/Create";
import Singlepost from "./pages/Singlepost";
import Categorypage from "./pages/Categorypage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";

function App() {
  // window.onbeforeunload = function () {
  //   localStorage.clear();
  // };
  return (
    <div className=" bg-white dark:bg-custm-black text-black dark:text-white">
      <Routes>
        <Route path="/" element={<About></About>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<RequireAuth allowedRoles={["ADMIN", "USER"]} />}>
          <Route path="/blog" element={<Blog />} />
          <Route path="blogs/:id" element={<Singlepost />} />
          <Route
            path="/blog/category/:ID"
            element={<Categorypage></Categorypage>}
          />
          <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
            <Route path="/create" element={<Create />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
