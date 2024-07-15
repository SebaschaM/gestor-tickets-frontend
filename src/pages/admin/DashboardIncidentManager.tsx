import { useEffect, useState } from "react";
import { AdminLayout } from "../../layouts/AdminLayout";
import useAdmin from "../../hooks/useAdmin";
import { ModalAddRequest, Pagination, RequestTable } from "../../components";
import { RequestResponse } from "../../interfaces/requestInterface";

const DashboardRequestManager = () => {
  const { handleGetAllRequests } = useAdmin();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [requestData, setRequestData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onGetAllRequests = async (currentPageRequest: number) => {
    const { statusCode, data, requestsPerPage, totalPages, currentPage } =
      await handleGetAllRequests(currentPageRequest);

    if (statusCode === 200) {
      setRequestData(data);
      setFilteredData(data);
      setItemsPerPage(requestsPerPage);
      setTotalPages(totalPages);
      setCurrentPage(currentPage);
    }
  };

  useEffect(() => {
    onGetAllRequests(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const filtered = requestData.filter((req: RequestResponse) =>
      req.asunto_solicitud.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, requestData]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleRequestCreated = () => {
    onGetAllRequests(currentPage); // Vuelve a cargar las solicitudes cuando se cree una nueva
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="mb-4 text-2xl font-bold uppercase">
          Gestión de solicitudes
        </h1>
        <div className="flex justify-between mb-4">
          <div>
            <button
              className="px-4 py-2 mr-6 text-white transition bg-green-600 rounded-lg shadow-md hover:bg-green-700"
              onClick={() => setIsModalOpen(true)}
            >
              Crear solicitud
            </button>
            <button className="px-4 py-2 mr-6 text-white transition bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
              <a
                rel="noreferrer noopener"
                href="https://sinergia.minam.gob.pe/servicios_ogti/"
                target="_blank"
                className="px-4 py-2 text-white transition bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
              >
                Catálogo de servicios
              </a>
            </button>
          </div>
          {filteredData.length > 0 && (
            <input
              type="text"
              placeholder="Buscar..."
              className="px-4 py-2 border rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </div>
        {filteredData.length > 0 ? (
          <RequestTable request={filteredData} />
        ) : (
          <p>No hay registros disponibles</p>
        )}
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalPages * itemsPerPage}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      <ModalAddRequest
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRequestCreated={handleRequestCreated}
      />
    </AdminLayout>
  );
};

export default DashboardRequestManager;
