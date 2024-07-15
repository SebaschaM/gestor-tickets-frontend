import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { showErrorToast, showSuccessToast } from "../../components/Toast";
import { LoginFormRequest } from "../../interfaces/loginInterface";
import { isLoadingAtom } from "../../store/isLoadingAtom";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { handleAuthLogin } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormRequest>();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  const onSubmit = async (data: LoginFormRequest) => {
    setIsLoading(true);
    const { message, statusCode } = await handleAuthLogin(data);
    reset();

    if (statusCode === 200) {
      showSuccessToast(message);

      setTimeout(() => {
        navigate("/admin/dashboard/requests");
        setIsLoading(false);
      }, 2000);
      return;
    }

    showErrorToast(message);
    setIsLoading(false);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-center bg-cover"
      style={{
        backgroundImage:
          "url(https://res.cloudinary.com/dvzjgzqbn/image/upload/v1720913680/abutd2oq4mpyi16tztaf.jpg)",
      }}
    >
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="mb-6 text-2xl font-bold text-center">Iniciar sesión</h2>
        <p className="mb-6 text-center text-gray-600">
          Ingresa tu nombre de usuario y contraseña para acceder a tu cuenta.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="nombre_usuario"
            >
              Nombre de Usuario
            </label>
            <input
              className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="nombre_usuario"
              type="text"
              placeholder="Nombre de Usuario"
              {...register("nombre_usuario", {
                required: "El nombre de usuario es obligatorio",
              })}
            />
            {errors.nombre_usuario && (
              <p className="text-xs italic text-red-500">
                {errors.nombre_usuario.message}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-sm font-bold text-gray-700"
              htmlFor="contrasenia"
            >
              Contraseña
            </label>
            <div className="relative">
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="contrasenia"
                type={showPassword ? "text" : "password"}
                placeholder="Contraseña"
                {...register("contrasenia", {
                  required: "La contraseña es obligatoria",
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 py-2 text-gray-600 focus:outline-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {errors.contrasenia && (
              <p className="text-xs italic text-red-500">
                {errors.contrasenia.message}
              </p>
            )}
          </div>
          {isLoading ? (
            <p className="w-full px-4 py-2 font-bold text-center text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline">
              Cargando...
            </p>
          ) : (
            <button
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Entrar
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
