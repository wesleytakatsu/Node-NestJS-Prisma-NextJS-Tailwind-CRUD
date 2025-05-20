/*
{
  "users": [
    {
      "id": "cmaue8jwv0000wsyj7pakmii2",
      "name": "John Doe",
      "username": "johndoe"
    },
    {
      "id": "cmaueocw80000ws97caopdg4e",
      "name": "Teste do Wesley",
      "username": "teste"
    },
    {
      "id": "cmaugqdt10000wsrqhtrgda63",
      "name": "Teste do Wesley 2",
      "username": "teste 2"
    },
    {
      "id": "cmaumlmzb0000ws65xnrqqrei",
      "name": "Teste do Wesley 3",
      "username": "teste 3"
    },
    {
      "id": "cmauro8if0000wsj1y7p92pjv",
      "name": "teste4",
      "username": "teste4"
    }
  ],
  "totalUsers": 6,
  "totalPages": 2,
  "hasNextPage": true,
  "hasPreviousPage": false,
  "nextPage": "11",
  "previousPage": null
}
*/

'use client';

import { useEffect, useState } from 'react';
import { Pagination } from '@/components/pagination';

interface User {
  id: string;
  name: string;
  username: string;
}

interface UsersResponse {
  users: User[];
  totalUsers: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextPage: number | null;
  previousPage: number | null;
}

export default function Usuarios() {
  const [users, setUsers] = useState<UsersResponse | null>(null);
  const [page, setPage] = useState(1);

  const principalUrl = process.env.NEXT_PUBLIC_LOCAL_HOST;
  const alternativeUrl = process.env.NEXT_PUBLIC_ALTERNATIVE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let res = await fetch(`http://${principalUrl}:3000/user/page/${page}`);
        if (!res.ok) {
          throw new Error(`Erro status: ${res.status}`);
        }
        const data: UsersResponse = await res.json();
        setUsers(data);
      } catch (err) {
        try {
          let res = await fetch(`http://${alternativeUrl}:3000/user/page/${page}`);
          if (!res.ok) {
            throw new Error(`Erro status: ${res.status}`);
          }
          const data: UsersResponse = await res.json();
          setUsers(data);
        } catch (error) {
        }
      }
    };

    fetchUsers();
  }, [page]);

  return (
    <>
      <div className="flex justify-center items-center h-16 bg-gray-100 dark:bg-gray-800">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Lista de Usuários</h1>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nome</th>
              <th className="px-6 py-3">UserName</th>
            </tr>
          </thead>
          <tbody>
            {users?.users.map(user => ( // alterado de tasks para users
              <tr key={user.id} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-800 border-b dark:border-gray-700">
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.username}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {users && (
          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={page}
              totalPages={users.totalPages}
              hasNextPage={users.hasNextPage}
              hasPreviousPage={users.hasPreviousPage}
              onPageChange={(newPage: number) => setPage(newPage)}
            />
          </div>
        )}
      </div>
    </>
  );
}


// <div className="flex justify-center mt-4">
//   <Pagination
//     currentPage={page}
//     totalPages={tarefas.totalPages}
//     hasNextPage={tarefas.hasNextPage}
//     hasPreviousPage={tarefas.hasPreviousPage}
//     onPageChange={(newPage: number) => setPage(newPage)}
//   />
// </div>