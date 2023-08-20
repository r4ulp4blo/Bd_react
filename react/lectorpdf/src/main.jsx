import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ViewAllbooks from "./componentes/ViewAllBooks.jsx";
import Home from "./componentes/Home.jsx";
import BooksData from "./componentes/BooksData";
import InsertBooks from "./componentes/InsertBooks";
import Login from "./componentes/Login.jsx";

//import InsertBooks from "./componentes/InsertBooks";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/val1",
    element: <InsertBooks />,
  },
  {
    path: "/val2",
    element: <ViewAllbooks />,
  },
  {
    path: "/val3",
    element: <BooksData />,
  },
  {
    path: "/val4",
  },
  {
    path: "/val5",
    element: <Login/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
