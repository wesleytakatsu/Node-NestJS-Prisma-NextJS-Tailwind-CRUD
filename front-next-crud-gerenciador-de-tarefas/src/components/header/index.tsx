export function Header() {
    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <h1 className="text-2xl font-bold">Gerenciador de Tarefas</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <a href="/" className="hover:text-gray-400">
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="/usuarios" className="hover:text-gray-400">
                            Usuários
                        </a>
                    </li>
                    <li>
                        <a href="/tarefas" className="hover:text-gray-400">
                            Tarefas
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}