/*
{
  tasks: [
    {
      id: 'cmauf43m70001wsolzp9nx6ov',
      title: 'tarefa de teste',
      description: 'descrição de teste',
      completed: false,
      userId: 'cmaueocw80000ws97caopdg4e',
      createdAt: '2025-05-19T01:40:04.303Z',
      updatedAt: '2025-05-19T01:40:04.303Z',
      user: [Object]
    }
  ],
  totalTasks: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPreviousPage: false,
  nextPage: null,
  previousPage: null
}
*/

'use client';

import { useEffect, useState } from 'react';
import { Pagination } from '@/components/pagination';
import Modal from "@/components/Modal";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
  };
}

interface TarefasResponse {
  tasks: Task[];
  totalTasks: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

export default function Tarefas() {
  const [tarefas, setTarefas] = useState<TarefasResponse | null>(null);
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const principalUrl = process.env.NEXT_PUBLIC_LOCAL_HOST;
  const alternativeUrl = process.env.NEXT_PUBLIC_ALTERNATIVE_URL;

  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        let res = await fetch(`http://${principalUrl}:3000/tasks/page/${page}`);
        if (!res.ok) {
          throw new Error(`Erro status na URL docker: ${res.status}`);
        }
        const data: TarefasResponse = await res.json();
        setTarefas(data);
      } catch (err) {
        try {
          let res = await fetch(`http://${alternativeUrl}:3000/tasks/page/${page}`);
          if (!res.ok) {
            throw new Error(`Erro status na URL alternativa: ${res.status}`);
          }
          const data: TarefasResponse = await res.json();
          setTarefas(data);
        } catch (error) {
        }
      }
    };

    fetchTarefas();
  }, [page]);

  const handleDelete = async (taskId: string) => {
    if (!confirm('Deseja excluir a tarefa?')) return;
    try {
      let res = await fetch(`http://${principalUrl}:3000/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        res = await fetch(`http://${alternativeUrl}:3000/tasks/${taskId}`, {
          method: 'DELETE',
        });
        if (!res.ok) {
          throw new Error(`Erro ao excluir. Status: ${res.status}`);
        }
      }
      // Atualiza a lista de tarefas, removendo a tarefa excluída
      setTarefas(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          tasks: prev.tasks.filter(task => task.id !== taskId),
          totalTasks: prev.totalTasks - 1,
        };
      });
    } catch (error) {
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-16 bg-gray-100 dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Todas as Tarefas</h1>
      </div>

    

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Título</th>
              <th className="px-6 py-3">Descrição</th>
              <th className="px-6 py-3">Usuário</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Criado em</th>
              <th className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {tarefas?.tasks.map(task => (
              <tr key={task.id} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">{task.title}</td>
                <td className="px-6 py-4">{task.description}</td>
                <td className="px-6 py-4">{task.user.name}</td>
                <td className="px-6 py-4">{task.completed ? 'Concluída' : 'Pendente'}</td>
                <td className="px-6 py-4">{new Date(task.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="text-blue-600 hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedTask(task);
                      setModalOpen(true);
                    }}
                  >
                    Visualizar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {tarefas && (
          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={page}
              totalPages={tarefas.totalPages}
              hasNextPage={tarefas.hasNextPage}
              hasPreviousPage={tarefas.hasPreviousPage}
              onPageChange={(newPage: number) => setPage(newPage)}
            />
          </div>
        )}
      </div>

      {/* Renderização do modal */}
      {selectedTask && (
        <Modal isOpen={isModalOpen} onClose={() => { setModalOpen(false); setSelectedTask(null); }} title="Detalhes da Tarefa" userId={selectedTask.user.id} taskId={selectedTask.id} concluido={selectedTask.completed}>
          <div className="space-y-2">
            <p><strong>Título:</strong> {selectedTask.title}</p>
            <p><strong>Descrição:</strong> {selectedTask.description}</p>
            <p><strong>Status:</strong> {selectedTask.completed ? 'Concluída' : 'Pendente'}</p>
            <p><strong>Criado em:</strong> {new Date(selectedTask.createdAt).toLocaleDateString()}</p>
            <p><strong>Usuário:</strong> {selectedTask.user.name}</p>
          </div>
        </Modal>
      )}
    </>
  );
}
