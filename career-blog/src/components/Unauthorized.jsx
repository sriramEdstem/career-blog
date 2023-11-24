import { useNavigate } from "react-router-dom";
import Header from "./Header/Header";
const Unauthorized = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div>
      <Header></Header>
      <section className="flex flex-col justify-center items-center gap-10 h-[100vh]">
        <h1 className=" text-3xl mt-[-80px] ">Unauthorized</h1>
        <br />
        <p>You do not have access to the requested page.</p>
        <div className="flexGrow">
          <button
            className=" hover:bg-slate-300 dark:hover:bg-slate-800 border-2 px-9 py-3 bg"
            onClick={goBack}
          >
            Go Back
          </button>
        </div>
      </section>
    </div>
  );
};

export default Unauthorized;
