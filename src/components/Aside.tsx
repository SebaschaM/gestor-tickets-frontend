import { FaSignOutAlt } from "react-icons/fa";
import { PrivateRoutesPaths } from "../routes/PrivateRoutesPaths";
import useAuth from "../hooks/useAuth";
import { useAtom } from "jotai";
import { userAtom } from "../store/userAtom";

interface AsideProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Aside = ({ isOpen, onToggle }: AsideProps) => {
  const { handleAuthLogout } = useAuth();
  const [user] = useAtom(userAtom);
  const onLogout = async () => {
    await handleAuthLogout();
  };

  return (
    <div
      className={`fixed inset-0 lg:relative lg:inset-auto bg-[#031019] text-white flex flex-col justify-between transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 transition-transform duration-200 ease-in-out z-50`}
    >
      <div className="flex justify-end p-4 lg:hidden">
        <button onClick={onToggle} className="text-2xl text-white">
          ×
        </button>
      </div>
      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col items-center py-6 space-y-6">
          <img
            src="https://res.cloudinary.com/dvzjgzqbn/image/upload/v1720917548/svsegxphlutmgrrsh0ax.png"
            alt="empresa"
            className="h-[6rem]"
          />
          <div className="flex flex-col items-start w-full px-4 space-y-4">
            {PrivateRoutesPaths.filter((route) => route.showInSidebar).map(
              (route, index) => (
                <button
                  key={index}
                  className="flex items-center w-full py-2 px-4 rounded hover:bg-[#374151]"
                >
                  <route.icon />
                  <span className="ml-4">{route.label}</span>
                </button>
              )
            )}
          </div>
        </div>
        <div className="flex items-center justify-between p-6 gap-5 bg-[#1F2937] hover:bg-[#374151] transition-colors duration-200 ease-in-out">
          <div className="flex items-center gap-5">
            <img
              src="https://res.cloudinary.com/dvzjgzqbn/image/upload/v1720653918/rjsroyuxdsxk9gw3gtyw.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <div className="ml-3">
              <p className="font-semibold uppercase">{user.nombre_usuario}</p>
              <p className="text-sm text-gray-400 normal-case">{user.rol}</p>
              <p className="text-sm text-gray-400">{user.correo}</p>
            </div>
          </div>
          <button
            title="Cerrar sesión"
            onClick={onLogout}
            className="text-red-600 transition-colors duration-200 ease-in-out hover:text-red-800"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </div>
  );
};
