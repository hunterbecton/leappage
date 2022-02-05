import { ToastContainer } from "react-toastify";
import { BiX } from "react-icons/bi";

export const Toaster = () => {
  return (
    <ToastContainer
      theme="light"
      position="top-right"
      autoClose={6000}
      closeButton={<BiX className="h-6 w-6 text-gray-600" />}
    />
  );
};
