import { useForm } from "react-hook-form";
import useAdmin from "../hooks/useAdmin";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../store/userAtom";
import { isLoadingAtom } from "../store/isLoadingAtom";
import { RequestFormatted, RequestType, FamilyType, ServiceType } from "../interfaces/requestInterface";
import { showErrorToast, showSuccessToast } from "./Toast";

interface ModalAddRequestProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestCreated: () => void;
}

export const ModalAddRequest = ({
  isOpen,
  onClose,
  onRequestCreated,
}: ModalAddRequestProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RequestFormatted>();
  const [requestTypes, setRequestTypes] = useState<RequestType[]>([]);
  const [familyTypes, setFamilyTypes] = useState<FamilyType[]>([]);
  const [serviceTypes, setServiceTypes] = useState<ServiceType[]>([]);
  const [idFamily, setIdFamily] = useState(1);
  const [isServiceDisabled, setIsServiceDisabled] = useState(true);
  const {
    handleGetRequestTypes,
    handleGetFamilysTypes,
    handleGetServicesTypes,
    handleSendRequest,
  } = useAdmin();
  const [user] = useAtom(userAtom);
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom);

  const onSubmit = async (data: RequestFormatted) => {
    // Obtener los nombres seleccionados
    const selectedRequestType = requestTypes.find(
      (type) => type.tipo_solicitud_id === Number(data.tipoSolicitud)
    );
    const selectedFamilyType = familyTypes.find(
      (type) => type.tipo_familia_id === Number(data.tipoFamilia)
    );
    const selectedServiceType = serviceTypes.find(
      (type) => type.tipo_servicio_id === Number(data.tipoServicio)
    );

    // Mapeo de valores al formato requerido y conversión a número
    const formattedData = {
      asunto_solicitud: data.asuntoNombre,
      detalle_solicitud: data.asuntoDetalle,
      usuario_id: user.usuario_id,
      tipo_solicitud_id: Number(data.tipoSolicitud),
      nombre_tipo_solicitud: selectedRequestType
        ? selectedRequestType.nombre_tipo_solicitud
        : "",
      tipo_servicio_id: Number(data.tipoServicio),
      nombre_tipo_servicio: selectedServiceType
        ? selectedServiceType.nombre_tipo_servicio
        : "",
      numero_ticket: "",
      nombre_tipo_familia: selectedFamilyType
        ? selectedFamilyType.nombre_tipo_familia
        : "",
      tipo_estado_id: 1,
      tipo_prioridad_id: 1,
    };

    setIsLoading(true);
    reset();
    const { message, statusCode } = await handleSendRequest(formattedData);

    if (statusCode === 201) {
      showSuccessToast(message);
      onClose();
      setIsLoading(false);
      onRequestCreated();
      return;
    }

    showErrorToast(message);
  };

  const onGetRequestTypes = async () => {
    const response = await handleGetRequestTypes();
    setRequestTypes(response.data);
  };

  const onGetFamilysTypes = async () => {
    const response = await handleGetFamilysTypes();
    setFamilyTypes(response.data);
  };

  const onGetServicesTypes = async (idFamily: number) => {
    const response = await handleGetServicesTypes(idFamily);
    setServiceTypes(response.data);
  };

  useEffect(() => {
    if (isOpen) {
      onGetRequestTypes();
      onGetFamilysTypes();
      onGetServicesTypes(idFamily);
    }
  }, [isOpen]);

  useEffect(() => {
    if (idFamily) {
      onGetServicesTypes(idFamily);
    }
  }, [idFamily]);

  const handleFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIdFamily = Number(e.target.value);
    setIdFamily(selectedIdFamily);
    setIsServiceDisabled(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Agregar Nueva Solicitud</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label htmlFor="asuntoNombre" className="block mb-1">
              Nombre del asunto
            </label>
            <input
              id="asuntoNombre"
              {...register("asuntoNombre", {
                required: "El nombre del asunto es obligatorio",
              })}
              title="Nombre del asunto"
              type="text"
              className="w-full px-4 py-2 border rounded-lg"
              required
            />
            {errors.asuntoNombre && (
              <p className="text-red-500">{errors.asuntoNombre.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="asuntoDetalle" className="block mb-1">
              Detalle del asunto
            </label>
            <textarea
              id="asuntoDetalle"
              {...register("asuntoDetalle", {
                required: "El detalle del asunto es obligatorio",
              })}
              title="Detalle del asunto"
              className="w-full px-4 py-2 border rounded-lg resize-none"
              required
            ></textarea>
            {errors.asuntoDetalle && (
              <p className="text-red-500">{errors.asuntoDetalle.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="tipo" className="block mb-1">
              Seleccionar si es un Requerimiento o un Incidente
            </label>
            <select
              id="tipo"
              {...register("tipoSolicitud", {
                required: "Seleccionar el tipo es obligatorio",
              })}
              title="Seleccionar tipo"
              className="w-full px-4 py-2 border rounded-lg"
              required
            >
              <option value="">Seleccione una opción</option>
              {requestTypes.map((type) => (
                <option
                  key={type.tipo_solicitud_id}
                  value={type.tipo_solicitud_id} // Cambiado para usar el ID
                >
                  {type.nombre_tipo_solicitud}
                </option>
              ))}
            </select>
            {errors.tipoSolicitud && (
              <p className="text-red-500">{errors.tipoSolicitud.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="tipoFamilia" className="block mb-1">
              Seleccionar la casuística
            </label>
            <select
              id="tipoFamilia"
              {...register("tipoFamilia", {
                required: "Seleccionar la casuística es obligatorio",
              })}
              title="Seleccionar tipo de familia"
              className="w-full px-4 py-2 border rounded-lg"
              required
              onChange={handleFamilyChange}
            >
              <option value="">Seleccione una opción</option>
              {familyTypes.map((type) => (
                <option key={type.tipo_familia_id} value={type.tipo_familia_id}>
                  {type.nombre_tipo_familia}
                </option>
              ))}
            </select>
            {errors.tipoFamilia && (
              <p className="text-red-500">{errors.tipoFamilia.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="tipoServicio" className="block mb-1">
              Seleccionar el tipo de servicio que más se relaciona con la
              solicitud
            </label>
            <select
              id="tipoServicio"
              {...register("tipoServicio", {
                required: "Seleccionar el tipo de servicio es obligatorio",
              })}
              title="Seleccionar tipo de servicio"
              className="w-full px-4 py-2 border rounded-lg"
              required
              disabled={isServiceDisabled}
            >
              <option value="">Seleccione una opción</option>
              {serviceTypes.map((type) => (
                <option
                  key={type.tipo_servicio_id}
                  value={type.tipo_servicio_id} // Cambiado para usar el ID
                >
                  {type.nombre_tipo_servicio}
                </option>
              ))}
            </select>
            {errors.tipoServicio && (
              <p className="text-red-500">{errors.tipoServicio.message}</p>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <div className="w-8 h-8 border-t-2 border-b-2 border-green-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-lg"
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-green-600 rounded-lg"
              >
                Guardar
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
