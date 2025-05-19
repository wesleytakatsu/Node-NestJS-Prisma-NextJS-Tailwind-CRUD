'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const pathname = usePathname();

    // Atualiza o estado apenas no cliente
    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem('token'));
    }, []);

    const isActive = (path: string) =>
        pathname === path ? 'text-gray-400' : '';

    return (
        <header className="bg-gray-800 text-white">
            <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
                <h1 className="text-2xl font-bold">Gerenciador de Tarefas</h1>
                {isAuthenticated && (
                    <div className="hidden md:block">
                        <span className="text-sm">Bem-vindo, {localStorage.getItem('userName')}</span>
                    </div>
                )}

                {/* Hamburger button - shown only on mobile */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {menuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {/* Menu */}
                <nav
                    className={`${menuOpen ? 'block' : 'hidden'
                        } md:block absolute md:static top-16 left-0 w-full md:w-auto bg-gray-800 z-10`}
                >
                    <ul className="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0">
                        <li>
                            <Link href="/" className={`block py-2 hover:text-gray-400 ${isActive('/')}`}>
                                Home
                            </Link>
                        </li>
                        {!isAuthenticated && (
                            <li>
                                <Link href="/usuarios/cadastrar" className={`block py-2 hover:text-gray-400 ${isActive('/')}`}>
                                    Cadastrar
                                </Link>
                            </li>
                        )}
                        {!isAuthenticated && (
                            <li>
                                <Link href="/usuarios/login" className={`block py-2 hover:text-gray-400 ${isActive('/')}`}>
                                    Login
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link href="/usuarios" className={`block py-2 hover:text-gray-400 ${isActive('/')}`}>
                                Usuários
                            </Link>
                        </li>

                        {isAuthenticated && (
                            <li>
                                <Link href="/usuarios/logout" className={`block py-2 hover:text-gray-400 ${isActive('/')}`}>
                                    Logout
                                </Link>
                            </li>
                        )}
                        <li>
                            <Link href="/tarefas" className={`block py-2 hover:text-gray-400 ${isActive('/')}`}>
                                Tarefas
                            </Link>
                        </li>
                        {isAuthenticated && (
                            <li>
                                <Link href="/tarefas/minhas" className={`block py-2 hover:text-gray-400 ${isActive('/')}`}>
                                    Minhas Tarefas
                                </Link>
                            </li>
                        )}
                        {isAuthenticated && (
                            <li>
                                <Link href="/tarefas/cadastrar" className={`block py-2 hover:text-gray-400 ${isActive('/')}`}>
                                    Cadastrar Tarefa
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
