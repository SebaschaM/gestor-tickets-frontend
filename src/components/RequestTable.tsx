import { RequestResponse } from "../interfaces/requestInterface";
import { convertToLocalTime } from "../utils/convertToLocalTime";

interface RequestTableProps {
  request: RequestResponse[];
}

const headers = [
  "Número de Ticket",
  "Asunto",
  "Fecha Asignada",
  "Usuario asignado",
  "Area asignada",
  "Tipo Solicitud",
  "Tipo Servicio",
  "Tipo Estado",
  "Fecha Creación",
];

export const RequestTable = ({ request }: RequestTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {request.map((req, index) => (
            <tr key={index}>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {req.numero_ticket}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {req.asunto_solicitud}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {req.fecha_asignada
                  ? convertToLocalTime(req.fecha_asignada)
                  : "Sin asignar"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {req.solicitud_usuario[0]
                  ? req.solicitud_usuario[0].usuario.nombre_usuario
                  : "Sin asignar"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {req.solicitud_usuario[0]
                  ? req.solicitud_usuario[0].usuario.rol.nombre_rol
                  : "Sin asignar"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {req.tipo_solicitud.nombre_tipo_solicitud}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {req.tipo_servicio.nombre_tipo_servicio}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {req.tipo_estado.nombre_tipo_estado}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                {convertToLocalTime(req.fecha_creacion)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
