import { AxiosError, isAxiosError } from "axios";

export const handleManagmentError = (error: AxiosError | Error) => {
  if (isAxiosError(error)) {
    return {
      message: error.response?.data?.message || "Ocurrió un error",
      statusCode: error.response?.status || 500,
      data : error.response?.data,
      access_token: error.response?.data?.access_token,
      ok: false,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
      statusCode: 500,
      ok: false,
    };
  } else {
    return {
      message: "Ocurrió un error",
      statusCode: 500,
      ok: false,
    };
  }
};
