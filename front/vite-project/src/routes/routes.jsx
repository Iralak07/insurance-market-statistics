import Layout from "../components/Layout/Layout";
import Index from "../pages/IndexPage/Index";

export default createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: (
                    <Index />
                ),
            },
            {
                path: "/file-upload",
                element: (
                    <FileUploadPage />
                ),
            }
        ],
    },
]);