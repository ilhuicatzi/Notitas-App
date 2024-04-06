import { useAuth } from "../../../hooks/useAuth";
import { useTheme } from "../../../contexts/theme_provider";
import { useNavigate } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";
import { usePosts } from "../../../hooks/usePosts.tsx";
import { useEffect } from "react";
import { Toaster, toast } from "sonner";

interface Post {
  id: number;
  titulo: string;
  contenido: string;
  color: string;
  tags: string;
  badge: string;
  fecha_actualizacion: string;
}

const articleStyles: React.CSSProperties = {
  padding: "0.7rem",
  color: "#1c1939",
  cursor: "pointer",
};

const badgeStyles: React.CSSProperties = {
  borderRadius: "9999px",
  fontSize: "11px",
  padding: "1px 4px",
  fontWeight: "700",
  cursor: "pointer",
};

function PostsPage() {
  const { posts, loadPosts, deletePosts, getPost } = usePosts();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { DateComponent } = useAuth();

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-center items-center mt-10 ">
      <section className="w-5/6 m-4 sm:m-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 2xl:w-3/4">
        {posts.map((post: Post) => (
          <article
            style={{
              ...articleStyles,
              backgroundColor: theme === "light" ? post.color : post.badge,
            }}
            className="relative transition duration-500 hover:scale-105 flex flex-col justify-center rounded-sm hover:rounded-es-3xl hover:opacity-100 dark:hover:opacity-100 opacity-90 dark:opacity-70"
            key={post.id}
          >
            <div className="w-full absolute top-0 left-1 ">
              <div className="flex justify-end px-1">
                <button
                  onClick={() => {
                    toast.success("Post eliminado");
                    deletePosts(post.id);
                  }}
                  className="hover:bg-red-100 rounded-full p-0.5"
                >
                  <RxCrossCircled className="hover:text-red-600 text-zinc-400 dark:hover:text-red-600 dark:text-zinc-600 text-2xl" />
                </button>
              </div>
            </div>

            <div
              onClick={() => {
                getPost(post.id);
                navigate(`/dashboard/posts/update/${post.id}`);
              }}
              className="h-full flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between">
                  <h1 className="text-2xl mb-3">{post.titulo}</h1>
                </div>
                <p className="text-sm">{post.contenido}</p>
              </div>

              <div className="text-xsfont-light flex justify-between items-end font-mono mt-4">
                <p
                  style={{
                    ...badgeStyles,
                    backgroundColor:
                      theme === "light" ? post.badge : post.color,
                  }}
                  className="shadow-md dark:shadow-zinc-800 shadow-slate-400 text-black brightness-105 text-opacity-80"
                >
                  {post.tags}
                </p>
                <div className="text-xs">
                  <DateComponent date={post.fecha_actualizacion} />
                </div>
              </div>
            </div>
          </article>
        ))}
        <Toaster />
      </section>
    </div>
  );
}

export default PostsPage;
