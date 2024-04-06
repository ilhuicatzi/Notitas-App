import axios from "./axios";

interface Post {
  titulo: string;
  contenido: string;
  color: string;
  tags: string;
  badge: string;
}


export const createPots = async (data: Post) => {
  try {
    const response = await axios.post("/posts", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getAllPosts = async () => {
  try {
    const response = await axios.get("/posts");
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getPostById = async (id : number) => {
  try {
    const response = await axios.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const updatePost = async (id: number, data: Post) => {
  try {
    const response = await axios.put(`/posts/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const deletePost = async (id: number) => {
  try {
    const response = await axios.delete(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}