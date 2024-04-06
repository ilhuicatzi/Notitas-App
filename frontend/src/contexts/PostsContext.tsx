import { createContext, useState } from 'react';
import { getAllPosts, deletePost, getPostById, createPots, updatePost} from "../api/posts.api.ts";

interface Post {
  id: number;
  titulo: string;
  contenido: string;
  color: string;
  tags: string;
  badge: string;
  fecha_actualizacion: string;
}

type PostContentTypes = {
  posts: Post[];
  isload: boolean;
  setPosts: (posts: Post[]) => void;
  loadPosts: () => void;
  deletePosts: (id: number) => void;
  getPost: (id: number) => Promise<Post>;
  createPosts: (data: FormData) => void;
  updatePosts: (id: number, data: FormData) => void;
}

const initialState: PostContentTypes = {
  posts: [],
  isload: false,
  setPosts: () => null,
  loadPosts: () => null,
  deletePosts: () => null,
  getPost: () => Promise.resolve({} as Post),
  createPosts: () => null,
  updatePosts: () => null,
};

type FormData = {
  titulo: string;
  contenido: string;
  color: { value: string; badge: string, label: string };
  tags: { value: string; label: string };
};


type PostsProviderProps = {
  children: React.ReactNode;
};

export const PostsContext = createContext<PostContentTypes>(initialState);

export const PostsProvider = ({ children}: PostsProviderProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isload , setIsLoad] = useState<boolean>(false);

  const loadPosts = async () => {
    const posts = await getAllPosts();
    setPosts(posts);
  }

  const createDataPosts = async (data: FormData ) => {
      const newPost = {
        titulo: data.titulo,
        contenido: data.contenido,
        color: data.color.value,
        tags: data.tags.value,
        badge: data.color.badge,
      }
    return newPost;
  }

  const updatePosts = async (id: number, data: FormData ) => {
    const newPost = await createDataPosts(data);
    const res= await updatePost(id, newPost);
    if(res) return setIsLoad(true);
  }

  const createPosts = async (data: FormData ) => {
    const newPost = await createDataPosts(data);
    //console.log(newPost)
    const res= await createPots(newPost);
    if(res) return setIsLoad(true);
  }

  const deletePosts = async (id: number) => {
    await deletePost(id);
    const newPosts = posts.filter((post) => post.id !== id);
    setPosts(newPosts);
  }

  const getPost = async (id: number):Promise<Post>=> {
    const post = await getPostById(id);
    return new Promise((resolve) => {
      resolve(post);
  });
  }


  const variableContexPosts = {
    posts,
    isload,
    setPosts: (posts: Post[]) => setPosts(posts),
    loadPosts,
    deletePosts,
    getPost,
    createPosts,
    updatePosts,
  };

  return (
    <PostsContext.Provider value={variableContexPosts}>
      {children}
    </PostsContext.Provider>
  );
}