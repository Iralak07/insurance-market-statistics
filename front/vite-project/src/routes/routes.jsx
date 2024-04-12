import Layout from "../components/Layout/Layout";
import Index from "../pages/IndexPage/Index";
import FileUpload from "../pages/FileUploadPage/FileUpload";

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
                    <FileUpload />
                ),
            }
        ],
    },
]);