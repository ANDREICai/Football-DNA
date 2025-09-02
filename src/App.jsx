import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landingpage from "./Pages/Landingpage";
import Prices from "./Pages/Prices";
import Contact from "./Pages/Contact";
import About from "./Pages/About";
const router = createBrowserRouter([
  { path: "/", element: <Landingpage /> },
  { path: "/Information", element: <Prices/> },
  { path: "/about", element: <About/> },
  { path: "/contact", element: <Contact/> },
  { path: "/get-started", element: <div>Get Started</div> },
  { path: "*", element: <Landingpage /> }, // fallback for any unknown route
]);


export default function App() {
  return (

      <RouterProvider router={router} />

  );
}
