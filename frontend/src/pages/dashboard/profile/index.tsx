import { useAuth } from "../../../hooks/useAuth"
import { usePosts } from "../../../hooks/usePosts";
import { SiFoodpanda } from "react-icons/si";

type UserData = {
  nombre: string;
  email: string;
  id: string;
} | null;

function ProfilePage() {
  const { posts } = usePosts()
  const { user } = useAuth()
  
  const data = user as UserData
  
  return (
    <section className="mt-10 md:m-20 flex flex-col items-center justify-center">
      <article className=" w-3/4 xl:w-2/3 rounded-l py-10  shadow hover:bg-zinc-50/70 dark:hover:bg-zinc-900/60 group flex flex-col  ">
        <h1 className="sm:text-4xl text-4xl mb-10 font-medium text-center">
          Bienvenido
        </h1>
        <h1 className="sm:text-5xl text-5xl font-bold md:mb-20 text-center flex justify-center items-center flex-col text-yellow-500">
          {data?.nombre}
          <SiFoodpanda className="inline-block text-6xl text-yellow-50" />
        </h1>
        <div className="mt-20 text-center">
          <h1 className="text-2xl font-bold mb-5">Tus Notas ({posts.length}) </h1>
          <ul className="grid grid-cols-2">
            {posts?.map((post, index) => (
              <li key={index} className="text-lg">
              {post.titulo}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  )
}

export default ProfilePage