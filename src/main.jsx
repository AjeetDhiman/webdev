import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import RootLayout from "./components/RootLayout.jsx";
import { store } from "./store/store.js";
import { Login } from "./pages/Login";
import { About } from "./pages/About.jsx";
import { Blogs } from "./pages/Blogs.jsx";
import { Faq } from "./pages/Faq.jsx";
import { Contact } from "./pages/Contact.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import useSessionTimeout from "./utils/useSessionTimeout.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ element: <App /> }],
  },
  {
    path: "/about",
    element: <RootLayout />,
    children: [{ element: <About /> }],
  },
  {
    path: "/blogs",
    element: <RootLayout />,
    children: [{ element: <Blogs /> }],
  },
  {
    path: "/faq",
    element: <RootLayout />,
    children: [{ element: <Faq /> }],
  },
  {
    path: "/contact",
    element: <RootLayout />,
    children: [{ element: <Contact /> }],
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
]);

const SessionManager = () => {
  useSessionTimeout();
  return null;
};

const MainApp = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router}>
        <SessionManager />
      </RouterProvider>
    </Provider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainApp />
  </StrictMode>,
);
