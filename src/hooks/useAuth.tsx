// hooks/useAuth.ts
import { AxiosError } from "axios";
import { handleManagmentError } from "../helpers/HookManagmentError";
import { useNavigate } from "react-router-dom";
import apiTicketsProject from "../api/apiTicketsProject";
import { LoginFormRequest } from "../interfaces/loginInterface";
import { useSetAtom } from "jotai";
import { userAtom } from "../store/userAtom";

const useAuth = () => {
  const navigate = useNavigate();
  const setUser = useSetAtom(userAtom); // Corrección aquí

  const handleAuthLogin = async (data: LoginFormRequest) => {
    try {
      const response = await apiTicketsProject.post("/auth/login", data);
      const { accessToken, message, statusCode, user } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      return { message, statusCode, user };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleAuthLogout = () => {
    localStorage.clear();
    setUser(null); // Limpiar el estado del usuario
    navigate("/auth/login");
  };

  const handleGetTokenLocalStorage = () => {
    return localStorage.getItem("accessToken");
  };

  return {
    handleAuthLogin,
    handleAuthLogout,
    handleGetTokenLocalStorage,
  };
};

export default useAuth;
