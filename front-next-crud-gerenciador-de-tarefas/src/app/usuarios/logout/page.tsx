'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LogoutPage() {
    const router = useRouter();

    async function handleLogout() {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        toast.success("Logout realizado com sucesso!");
        setTimeout(() => {
            window.location.href = "/usuarios/login";
        }, 3000);
    }

    useEffect(() => {
        handleLogout();
    }, []);

    return (
        <div>
            <ToastContainer />
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Você saiu do sistema!</h1>
                </div>
            </section>
        </div>
    );
}