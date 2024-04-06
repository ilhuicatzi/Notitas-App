import { Outlet, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Login from "./pages/login";
import Register from "./pages/register";
import NotFound from "./pages/notFound";

import Dashboard from "./pages/dashboard/profile";
import Posts from "./pages/dashboard/posts";
import NewPost from "./pages/dashboard/posts/newPost";
import EditPost from "./pages/dashboard/posts/updatePost";

import {PostsProvider} from "./contexts/PostsContext";
import { ProtectedRoute } from "./contexts/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";


function App() {
  const { isAuthenticated } = useAuth();

  return (
    <main className="flex flex-col justify-between h-screen">
      <div>
      <Navbar />
      <Routes>
        <Route
          element={
            <ProtectedRoute
              isAllowed={!isAuthenticated}
              redirectTo="/dashboard/posts"
            />
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route
          element={
            <ProtectedRoute isAllowed={isAuthenticated} redirectTo="/login" />
          }
        >
          <Route
            element={
              <PostsProvider>
                <Outlet />
              </PostsProvider>
            }
          >
          <Route path="/dashboard/profile" element={<Dashboard />} />
          <Route path="/dashboard/posts" element={<Posts />} />
          <Route path="/dashboard/posts/new" element={<NewPost />} />
          <Route path="/dashboard/posts/update/:id" element={<EditPost />} />
          </Route>

        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      <Footer />
    </main>
  );
}

export default App;
