import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../themeSlice";
import { useEffect } from "react";
import moon from "./icons/moon.png";
import sun from "./icons/sun.png";

function DarkLight() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.currentTheme);
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div onClick={handleTheme}>
      {theme === "dark" ? (
        <img src={moon} alt="Moon" className="w-[20px] h-auto" />
      ) : (
        <img src={sun} alt="Sun" className="w-[20px] h-auto" />
      )}
    </div>
  );
}

export default DarkLight;
