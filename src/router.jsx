import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import RandomQuote from "./pages/RandomQuote";
import GeneratorPassword from "./pages/GeneratorPassword";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "quote",
        element: <RandomQuote />,
    },
    {
        path: "generator",
        element: <GeneratorPassword />,
    },
]);

export default router;
