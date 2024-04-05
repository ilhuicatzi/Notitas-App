import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  password: string;
};

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const { signin, errorsBack, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => { 
    signin(data);

    if (isAuthenticated) {
      navigate("/profile");
    }
  });

  
  //console.log(errorsBack);
  return (
    <section className="mt-10 min-[500px]:m-10 md:m-20 flex flex-col items-center justify-center">
      <article className={` w-3/4 xl:w-2/3 2xl:w-1/2 rounded-lg min-[500px]:p-10 shadow hover:bg-zinc-50/70 dark:hover:bg-zinc-900/60 group 
      `}>
        <h1 className="sm:text-4xl text-2xl mb-10 font-medium">Sign In</h1>
        <div className={`flex justify-center shadow-md hover:shadow-xl p-2 
        ${
          errorsBack ? "shadow-red-500 dark:hover:shadow-red-500 hover:shadow-red-500  " : " dark:hover:shadow-zinc-800"
        
        }`}>
          <form
            className="p-5 w-full lg:w-1/2 text-sm sm:text-base"
            onSubmit={onSubmit}
          >
            {errorsBack && (
              <p className="text-red-500 text-sm font-light mb-5 text-center">
                {errorsBack}
              </p>
            
            )}
            <div className="flex flex-col gap-y-2 mb-4">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                className="dark:bg-zinc-900 bg-zinc-200 border-b-2 rounded-sm dark:border-zinc-800 border-zinc-300 dark:focus:bg-zinc-800 focus:bg-yellow-50 px-3 py-1  outline-none  focus:border-yellow-500"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm font-light">
                  This field is required
                </span>
              )}
            </div>
            <div className="flex flex-col mb-6">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="*******"
                className="dark:bg-zinc-900 bg-zinc-200 border-b-2 rounded-sm dark:border-zinc-800 border-zinc-300 dark:focus:bg-zinc-800 focus:bg-yellow-50 px-3 py-1  outline-none  focus:border-yellow-500"
                {...register("password", { required: true, minLength: 6 })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm font-light">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <button className="bg-yellow-400 group-hover:opacity-100 opacity-35 px-6 py-1 rounded-md text-zinc-900 hover:text-white hover:bg-yellow-500">
                Sign In
              </button>
            </div>
            <p className="text-xs mt-8 text-end">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-yellow-400 hover:text-yellow-500"
              >
                Sign Up
              </a>
            </p>
          </form>
          <div className="hidden lg:flex">
            <img
              src="/img/bg_1.jfif"
              alt="imagen de login"
              className="w-72 h-72 rounded-lg object-cover opacity-20 brightness-110 group-hover:opacity-80 transition-all duration-300 ease-in-out"
            />
          </div>
        </div>
      </article>
    </section>
  );
}

export default LoginPage;
