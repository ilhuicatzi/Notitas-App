
import { MdOutlineDashboard } from "react-icons/md";
import { GrChapterAdd } from "react-icons/gr";

export const publicRoutes = [
  {
    title: "Home",
    path: "/"
  },
  {
    title: "About",
    path: "/about"
  },
  {
    title: "Sign Up",
    path: "/register"
  },
  {
    title: "Sign In",
    path: "/login"
  },
]

export const privateRoutes = [

  {
    title: "Posts",
    path: "/dashboard/posts",
    icon: <MdOutlineDashboard />
  },
  {
    title: "New Post",
    path: "/dashboard/posts/new",
    icon: <GrChapterAdd />
  },
]