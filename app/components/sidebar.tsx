import { FiLogOut } from "react-icons/fi";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  userName: string;
}

export default function Sidebar({ isOpen, toggleSidebar, userName }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <>
          <button
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
            onClick={toggleSidebar}
          ></button>
          <div className="fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 flex flex-col justify-between">
            <div className="p-4">
              <h2 className="text-xl font-bold text-blue-600">Hello, {userName}!</h2>
              <ul className="mt-4">
                <li className="py-2">
                  <a href="/settings" className="font-normal">Settings and Privacy</a>
                </li>
              </ul>
            </div>
            <a href="/logout" className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-100">
              <span className="text-red-600">Logout</span>
              <FiLogOut className="text-red-600" size={20} />
            </a>
            <button onClick={toggleSidebar} className="absolute top-4 right-4 text-xl">X</button>
          </div>
        </>
      )}
    </>
  );
}