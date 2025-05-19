import { ReactNode } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    userId?: string | null;
    taskId?: string;
    concluido?: boolean;
    children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, userId, taskId, concluido, children }: ModalProps) {
    const token = localStorage.getItem("token");
    const userIdLogado = localStorage.getItem("userId");

    if (!isOpen) return null;

    const handleComplete = async (taskId: string) => {
        if (!confirm('Deseja marcar a tarefa como concluída?')) return;
        try {
            let res;
            try {
                res = await fetch(`http://127.0.0.1:3000/tasks/complete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ taskId: taskId }),
                });
            } catch (error) {
                console.warn('Falha na requisição em 127.0.0.1, tentando fallback.');
            }
            
            if (!res) {
                res = await fetch(`http://192.168.1.30:3000/tasks/complete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ taskId: taskId }),
                });
            }
            
            if (!res.ok) {
                throw new Error(`Erro ao marcar como concluída. Status: ${res.status}`);
            }
            console.log('Tarefa concluída com sucesso.');
            const responseData = await res.json();
            toast.success(responseData.message);
            setTimeout(() => {
                window.location.reload();
            }
            , 3000);
        
        } catch (error) {
            console.error('Erro ao marcar a tarefa como concluída:', error);
            toast.error('Ocorreu um erro ao marcar a tarefa como concluída.');
        }
    };

    return (
        <div
            id="static-modal"
            tabIndex={-1}
            aria-hidden="true"
            className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto overflow-x-hidden"
        >
            <div className="relative p-4 w-full max-w-2xl">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {title || "Static modal"}
                        </h3>
                        <button
                            onClick={onClose}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* Modal body */}
                    <div className="p-4 md:p-5 space-y-4">
                        {children}
                    </div>
                    {/* Modal footer */}
                    {/* se o userIdlogado for igual ao userId e concluído não true */}
                    {userIdLogado === userId && !concluido && (
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                                onClick={() => taskId && handleComplete(taskId)}
                                type="button"
                                className="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Marcar como concluído
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}