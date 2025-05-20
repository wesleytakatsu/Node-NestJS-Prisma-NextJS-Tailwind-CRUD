"use client";

import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CadastrarUsuario() {
    const router = useRouter();

    const principalUrl = process.env.NEXT_PUBLIC_LOCAL_HOST;
    const alternativeUrl = process.env.NEXT_PUBLIC_ALTERNATIVE_URL;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userId = localStorage.getItem("userId");
        if (!userId) {
            toast.error("Usuário não autenticado.");
            setTimeout(() => {
                router.push("/usuarios/login");
            }, 3000);
            return;
        }
        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
            userId: userId
        };

        let res;
        try {
            res = await fetch(`http://${principalUrl}:3000/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
        } catch (error) {
            try {
                res = await fetch(`http://${alternativeUrl}:3000/tasks`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
            } catch (error2) {
                toast.error("Ocorreu um erro na requisição.");
                return;
            }
        }

        if (res.status === 201) {
            toast.success("Cadastrado com sucesso!");
            setTimeout(() => {
                router.push("/tarefas");
            }, 3000);
        } else {
            const errorResponse = await res.json();
            toast.error(`${errorResponse.message}`);
        }
    }

    return (
        <div>
            <ToastContainer />
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-50 h-20 mr-2" src="https://wesleytakatsu.github.io/Pagina-Apresentacao-Pessoal/media/img/Logo-Takatsu-Projetos.png" alt="logo" />
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Registro de tarefa
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div>
                                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título</label>
                                    <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Digite o título da tarefa" required />
                                </div>
                                <div>
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrição da tarefa</label>
                                    <textarea name="description" id="description" rows={5} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Descreva a tarefa a ser realizada" required />
                                </div>
                                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Registrar uma tarefa</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}