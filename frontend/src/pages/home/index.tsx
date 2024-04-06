import { TbCircleArrowRight } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  return (
    <section className="m-5 md:m-10 flex flex-col items-center justify-center">
      <div className="flex justify-end w-full max-[510px]:hidden lg:w-[880px] ">
        <div className="relative z-30 right-5 min-[510px]:top-9  flex justify-center">
          <img
            src="/img/logo_app.jfif"
            className="size-32 min-[510px]:size-40 sm:size-52 md:size-64 min-[850px]:size-72 lg:size-80 rounded-lg relative"
            alt="logo de la aplicacion Noties"
          />
        </div>
      </div>
      <div className="absolute top-16 mx-5">

        <article className="dark:bg-yellow-800 bg-yellow-400/70 p-8 rounded-lg flex relative mt-10 gap-5  ">
          <div className=" w-11/12 min-[500px]:w-3/5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-5">
              Noties
            </h1>
            <p className="text-lg lg:text-xl">
              Tus notas siempre contigo, en cualquier lugar y en cualquier momento.
            </p>
            <div className="md:mt-10 lg:mt-20">
              <button
                onClick={() => navigate("/login")} 
              className="bg-yellow-600 hover:bg-yellow-700 dark:bg-yellow-600 dark:hover:bg-yellow-500 text-white px-4 py-2 rounded-lg mt-5 flex  justify-between items-center gap-2">
                <span>Comenzar ahora</span> <TbCircleArrowRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

export default HomePage;
