import DarkLight from "./DarkLight";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  const currTime = getCurrentTime();
  const location = "Kochi";

  function getCurrentTime() {
    const now = new Date();
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[now.getDay()];
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    return `${dayOfWeek}   ${hours}:${minutes},`;
  }
  return (
    <div className=" border-b-2 dark:border-white pt-2 dark:border-opacity-40 pb-8 text-black text-2xl dark:text-white header">
      <div className="flex items-center pt-4 justify-evenly">
        <div className="flex gap-3 pr-10">
          <p className="  ">{currTime}</p>
          <p className=" ">{location}</p>
        </div>
        <Link to="/">Meow!</Link>
        <Link to="/blog">Posts</Link>

        <Link to="/create">Create</Link>

        <DarkLight></DarkLight>
      </div>
    </div>
  );
}

export default Header;
