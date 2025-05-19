interface PaginationProps {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    onPageChange: (page: number) => void;
}

export function Pagination({
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    onPageChange,
}: PaginationProps) {
    // Gera uma lista de números de página
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav aria-label="Page navigation example">
            <ul className="flex items-center -space-x-px h-10 text-base">
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={!hasPreviousPage}
                        className={`flex items-center justify-center px-4 h-10 ms-0 leading-tight border border-gray-300 rounded-s-lg
              ${hasPreviousPage ? "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"}
              dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    >
                        <span className="sr-only">Previous</span>
                        <svg className="w-3 h-3 rtl:rotate-180" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                    </button>
                </li>

                {pageNumbers.map((page) => (
                    <li key={page}>
                        <button
                            onClick={() => onPageChange(page)}
                            className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 
                ${page === currentPage
                                    ? "text-blue-600 bg-blue-50 border-blue-300 dark:bg-gray-700 dark:text-white"
                                    : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"}
              `}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={!hasNextPage}
                        className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 rounded-e-lg
              ${hasNextPage ? "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"}
              dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                    >
                        <span className="sr-only">Next</span>
                        <svg className="w-3 h-3 rtl:rotate-180" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
}
