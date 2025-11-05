import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import Private from "./pages/Private"; // <-- asegúrate de importarlo

const isAuthenticated = () => localStorage.getItem("token") !== null;

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Signup />} errorElement={<h1>Not found!</h1>} />

      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/single/:theId" element={<Single />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/private"
          element={ isAuthenticated() ? <Private /> : <Navigate to="/login" />}
        />
      </Route>
    </>
  )
);
