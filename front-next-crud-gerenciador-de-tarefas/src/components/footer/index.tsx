import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 text-center">
            <p>© {new Date().getFullYear()} - Um projeto do Wesley Sieiro Takatsu de Araujo.</p>
            <a
                className="text-blue-400 hover:underline"
                href="https://www.linkedin.com/in/wesleytakatsu/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Meu LinkedIn
            </a>
        </footer>
    );
};

export default Footer;