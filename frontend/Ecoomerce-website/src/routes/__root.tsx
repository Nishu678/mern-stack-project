// import Footer from '@/components/Footer'
// import Header from '@/components/Header'
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { AuthProvider } from "../components/store/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        {/* <Header /> */}

        <Outlet />

        {/* <Footer /> */}

        {/* ✅ Toast Container (GLOBAL) */}
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});
