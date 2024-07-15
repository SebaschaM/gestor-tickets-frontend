import { useState } from "react";
import { Aside } from "../components";
import { FaBars } from "react-icons/fa";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Aside isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex-1 p-4 overflow-auto relative">
        <button
          title="Abrir menú lateral"
          className="lg:hidden p-4 bg-gray-800 text-white fixed bottom-4 left-4 rounded-full shadow-md"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};
