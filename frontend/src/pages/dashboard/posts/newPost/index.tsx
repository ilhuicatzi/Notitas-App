import Select from "react-tailwindcss-select";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  optionsColorsBadge,
  optionsTags,
} from "../../../../utils/dataPostsCard";
import { usePosts } from "../../../../hooks/usePosts";
import { Toaster, toast } from "sonner";

type FormData = {
  titulo: string;
  contenido: string;
  color: { value: string; badge: string; label: string };
  tags: { value: string; label: string };
};

function NewPostPage() {
  const { createPosts, isload } = usePosts();
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      titulo: "",
      contenido: "",
      color: { value: "#e2e8f0", badge: "#94a3b8", label: "Elige un color" },
      tags: { value: "", label: "Elige una categoria" },
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    //console.log(data)
    createPosts(data);
    if (isload) {
      const promise = () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ name: "Sonner" }), 500)
        );

      toast.promise(promise, {
        loading: "Loading...",
        success: () => {
          return `Nota creada con éxito`;
        },
        error: "Error",
      });

      navigate("/dashboard/posts");
    }
  };

  return (
    <section className="mt-10  md:m-20 flex flex-col items-center justify-center">
      <article className=" w-3/4 xl:w-2/3 rounded-lg  group p-10  ">
        <div className="flex justify-center items-center mx-5 lg:mx-20">
          <h1 className="sm:text-3xl lg:text-4xl text-2xl mb-10 font-medium flex mx-4 md:mx-10 justify-center lg:w-3/4 items-center text-pretty">
            Nueva publicación
          </h1>
        </div>
        <div className="flex justify-center items-center p-2 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative z-0">
              <Controller
                name="titulo"
                control={control}
                rules={{ required: "Título requerido" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="floating_standard"
                    className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer"
                    placeholder=" "
                  />
                )}
              />
              <label
                htmlFor="floating_standard"
                className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Título
              </label>
              {errors.titulo && (
                <p className="text-red-500 text-sm">{errors.titulo.message}</p>
              )}
            </div>

            <div className="relative z-0 mt-10">
              <Controller
                name="contenido"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows={4}
                    id="floating_standard"
                    className="block dark:bg-zinc-900 bg-zinc-200 py-2.5 px-2 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-500 focus:outline-none focus:ring-0 focus:border-yellow-600 peer"
                    placeholder=" "
                  />
                )}
              />

              <label
                htmlFor="floating_standard"
                className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-yellow-600 peer-focus:dark:text-yellow-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Contenido
              </label>
              {errors.contenido && (
                <p className="text-red-500 text-sm">
                  {errors.contenido.message}
                </p>
              )}
            </div>

            <div className="flex justify-between my-10 gap-8">
              <div className="w-full">
                <Controller
                  name="color"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      classNames={{
                        menuButton: (color) =>
                          `${color} dark:bg-zinc-800  bg-zinc-300 text-white flex text-sm rounded-md hover:bg-yellow-500 dark:hover:bg-yellow-500 text-zinc-900 dark:text-zinc-200`,
                      }}
                      value={value as SelectValue}
                      onChange={onChange}
                      options={optionsColorsBadge}
                      primaryColor={"amber"}
                      formatOptionLabel={(data) => (
                        <li
                          className={`block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded hover:bg-yellow-500 dark:hover:bg-yellow-500 text-zinc-900 dark:text-zinc-600 ${
                            data.isSelected
                              ? "bg-yellow-400 dark:bg-yellow-500"
                              : ""
                          }`}
                        >
                          {data.label}
                        </li>
                      )}
                    />
                  )}
                />
                {errors.color && (
                  <p className="text-red-500 text-sm">{errors.color.message}</p>
                )}
              </div>

              <div className="w-full">
                <Controller
                  name="tags"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      classNames={{
                        menuButton: (color) =>
                          `${color} dark:bg-zinc-800 bg-zinc-300 text-white flex text-sm rounded-md hover:bg-yellow-500 dark:hover:bg-yellow-500 text-zinc-900 dark:text-zinc-200`,
                      }}
                      value={
                        "value" in value
                          ? value
                          : ({ value: "", label: "" } as SelectValue)
                      }
                      onChange={onChange}
                      options={optionsTags}
                      primaryColor={"amber"}
                      formatOptionLabel={(data) => (
                        <li
                          className={`block transition duration-200 px-2 py-2 cursor-pointer select-none truncate rounded hover:bg-yellow-500 dark:hover:bg-yellow-500 text-zinc-900 dark:text-zinc-600 ${
                            data.isSelected
                              ? "bg-yellow-400 dark:bg-yellow-500"
                              : ""
                          }`}
                        >
                          {data.label}
                        </li>
                      )}
                    />
                  )}
                />
                {errors.tags && (
                  <p className="text-red-500 text-sm">{errors.tags.message}</p>
                )}
              </div>
            </div>
            <button className="bg-yellow-500 text-white px-5 py-1 rounded-md hover:bg-yellow-600">
              Publicar
            </button>
          </form>
        </div>
      </article>
      <Toaster richColors />
    </section>
  );
}

export default NewPostPage;
