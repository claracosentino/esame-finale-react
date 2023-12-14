import "./App.css";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import { Suspense, lazy } from "react";
import AllEvents from "./pages/AllEvents";
import Loading from "./components/Loading/Loading";
import SignInPage from "./pages/SigInPage";
import ProfilePage from "./pages/ProfilePage";

const HomePage = lazy(() => import("./pages/HomePage"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/events",
        element: <AllEvents />,
    },
    {
        path: "/detail/:id",
        element: <DetailPage />,
    },
    {
        path: "/auth",
        element: <SignInPage />,
    },
    {
        path: "/profile",
        element: <ProfilePage />,
    },
    {
        path: "*",
        //element: <h1>404</h1>
        element: <Navigate to="" />,
    },
]);

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
        </Suspense>
    );
}

export default App;
