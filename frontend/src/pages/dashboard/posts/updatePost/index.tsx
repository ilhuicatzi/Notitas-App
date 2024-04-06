import Select from "react-tailwindcss-select";
import { SelectValue } from "react-tailwindcss-select/dist/components/type";
import { Controller, useForm, SubmitHandler  } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom"
import { RxCrossCircled } from "react-icons/rx";
import { optionsColorsBadge, optionsTags } from "../../../../utils/dataPostsCard";
import { usePosts } from "../../../../hooks/usePosts";
import { useEffect } from "react";
import { Toaster, toast} from "sonner";

type FormData = {
  titulo: string;
  contenido: string;
  color: { value: string; badge: string, label: string };
  tags: { value: string; label: string };
};

interface Post {
  id: number;
  titulo: string;
  contenido: string;
  color: string;
  tags: string;
  badge: string;
  fecha_actualizacion: string;
}

function UpdatePostPage() {
  const { getPost, updatePosts, isload } = usePosts();
  const { id } = useParams();
  const navigate = useNavigate();
  const { control, handleSubmit, formState:{errors}, setValue  } = useForm<FormData>({
    defaultValues: {
      titulo: "",
      contenido: "",
      color: { value: "", badge:"", label: "Elige un color" },
      tags: { value: "", label: "Elige una categoria" }
    },
  });

  useEffect(() => {
    if (id) {
      getPost(Number(id)).then((data:Post) => {
        //console.log(data);
        setValue("titulo", data.titulo);
        setValue("contenido", data.contenido);
        setValue("color", { value: data.color, badge: data.badge, label: "elige otro color" });
        setValue("tags", { value: data.tags, label: "elige otra categoria"});
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const onSubmit: SubmitHandler <FormData> = async(data)  => {
    console.log(data);
    updatePosts(Number(id), data);
    if(isload) {
      const promise = () =>
        new Promise((resolve) =>
          setTimeout(() => resolve({ name: "Sonner" }), 500)
        );

      toast.promise(promise, {
        loading: "Loading...",
        success: () => {
          return `Nota actualizada con éxito`;
        },
        error: "Error",
      });

      navigate("/dashboard/posts");
    }
  };

  return (
    <section className="mt-10  md:m-20 flex flex-col items-center justify-center">
      <article className="min-[480px]:w-3/4 xl:w-2/3 rounded-3xl shadow-xl dark:shadow-zinc-800  group p-3  bg-[url('/img/bg_4.webp')] object-cover bg-cover">
        <div className="flex justify-center items-center mx-5 lg:mx-20 ">
        <div className="flex ">
        <h1 className="sm:text-3xl lg:text-4xl text-2xl mb-20 font-medium flex mx-4 md:mx-10 justify-center lg:w-3/4 items-center text-pretty text-zinc-950">
          Editando ...
        </h1>
        <div>
          <button
          onClick={() => navigate("/dashboard/posts")}
          className="relative bottom-1 min-[350px]:left-20 2xl:left-40 hover:bg-red-200 rounded-full p-2">
            <RxCrossCircled className="text-3xl text-zinc-800 dark:text-zinc-700 dark:hover:text-red-600 hover:text-red-600" />
          </button>
        </div>
        </div>
        </div>
        <div className="flex justify-center items-center p-2  ">
          <form onSubmit={handleSubmit(onSubmit)} className="w-56 min-[350px]:w-[350px]">
            <div>
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
                    className="block py-2.5 bg-white/50 px-0 w-full text-lg font-semibold text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-yellow-950 focus:outline-none focus:ring-0 focus:border-yellow-950 peer"
                    placeholder=" "
                  />
                )}
              />
                  <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-yellow-950 peer-focus:dark:text-yellow-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                >
                  Título
                </label>
                {errors.titulo && <p className="text-red-500 text-sm">{errors.titulo.message}</p>}
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
                    className="block bg-white/60 py-2.5 px-2 w-full text-lg text-gray-900 border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-yellow-950 focus:outline-none focus:ring-0 focus:border-yellow-950 peer"
                    placeholder=" "
                  />
                )}
              />

              <label
                htmlFor="floating_standard"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-1 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-yellow-950 peer-focus:dark:text-yellow-950 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
              >
                Contenido
              </label>
              {errors.contenido && <p className="text-red-500 text-sm">{errors.contenido.message}</p>}
            </div>

            </div>
            <div className="flex justify-between flex-col sm:flex-row my-10 gap-8">
                
              <div className="w-full">
              <Controller
                name="color"
                control={control}
                rules={{ required: true}}
                render={({ field:{value, onChange} }) => (
                  <Select
                    classNames={{
                      menuButton: (color) =>
                      `${color} dark:bg-zinc-500 bg-zinc-300 text-white flex text-sm rounded-md hover:bg-yellow-400 dark:hover:bg-yellow-950 text-zinc-900 dark:text-zinc-200`,
                    }}
                    value={"value" in value ? value : {value: "", badge:"" , label: ""} as SelectValue}
                    onChange={onChange}
                    options={optionsColorsBadge}
                    primaryColor={"amber"}
                  />
                )}
              />
              {errors.color && <p className="text-red-500 text-sm">{errors.color.message}</p>}
              </div>

              <div className="w-full">
              <Controller
                name="tags"
                control={control}
                rules={{ required: true}}
                render={({ field :{ value, onChange}}) => (
                  <Select
                    classNames={{
                      menuButton: (color) =>
                        `${color} dark:bg-zinc-500 bg-zinc-300 text-white flex text-sm rounded-md hover:bg-yellow-400 dark:hover:bg-yellow-950 text-zinc-900 dark:text-zinc-200`,
                    }}
                    value={"value" in value ? value : {value: "", label: ""} as SelectValue}
                    onChange={onChange}
                    options={optionsTags}
                    primaryColor={"amber"}
                  />
                )}
              />
              {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
            </div>

            </div>
            <div className="flex justify-center items-center w-full">
            <button className="bg-yellow-600 text-white px-10 py-1 rounded-md hover:bg-yellow-500">
              Guardar
            </button>
            </div>
          </form>
        </div>
      </article>
      <Toaster  richColors  />
    </section>
  );
}

export default UpdatePostPage;
