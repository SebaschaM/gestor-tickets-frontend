import { AxiosError } from "axios";
import { handleManagmentError } from "../helpers/HookManagmentError";
import apiTicketsProject from "../api/apiTicketsProject";

const useAdmin = () => {
  const handleGetAllRequests = async (currentPageRequest: number) => {
    try {
      const response = await apiTicketsProject.get(
        `/request/all/${currentPageRequest}`
      );

      return response.data;
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleGetServicesTypes = async (idFamily: number) => {
    try {
      const response = await apiTicketsProject.get(
        `/seed/type-services/${idFamily}`
      );
      return response;
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleGetFamilysTypes = async () => {
    try {
      const response = await apiTicketsProject.get("/seed/type-families");

      return response;
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleGetRequestTypes = async () => {
    try {
      const response = await apiTicketsProject.get("/seed/type-requests");

      return response;
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleSendRequest = async (data: any) => {
    try {
      const response = await apiTicketsProject.post("/request/create", data);

      const { message, statusCode } = response.data;

      return { message, statusCode };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleAssignRequestToHelpDesk = async (token: string) => {
    try {
      const response = await apiTicketsProject.post(`/request/assign-help-desk/${token}`);

      const { message, statusCode } = response.data;

      return { message, statusCode };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  const handleAssignRequestToInternalEmployee = async (token: string) => {
    try {
      const response = await apiTicketsProject.post(
        `/request/assign/${token}`
      );

      const { message, statusCode } = response.data;

      return { message, statusCode };
    } catch (error) {
      return handleManagmentError((error as AxiosError) || (error as Error));
    }
  };

  return {
    handleGetAllRequests,
    handleGetServicesTypes,
    handleGetFamilysTypes,
    handleGetRequestTypes,
    handleSendRequest,
    handleAssignRequestToHelpDesk,
    handleAssignRequestToInternalEmployee
  };
};

export default useAdmin;
