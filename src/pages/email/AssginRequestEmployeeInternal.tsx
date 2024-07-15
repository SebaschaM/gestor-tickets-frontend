import { useLocation, Navigate, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import useAdmin from "../../hooks/useAdmin";
import { useEffect, useState } from "react";
import { showErrorToast, showSuccessToast } from "../../components";

const AssignRequestEmployeeInternal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const [isLoading, setIsLoading] = useState(true);

  const { handleAssignRequestToInternalEmployee } = useAdmin();

  if (!token) {
    return <Navigate to="/admin/dashboard/requests" />;
  }

  useEffect(() => {
    let isMounted = true;

    const onAssignRequest = async () => {
      setIsLoading(true);

      try {
        const { message, statusCode } =
          await handleAssignRequestToInternalEmployee(token);

        if (statusCode === 200 && isMounted) {
          showSuccessToast(message);
          return;
        }
        showErrorToast(message);
        return;
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
          navigate("/admin/dashboard/requests");
        }
      }
    };

    onAssignRequest();

    return () => {
      isMounted = false;
    };
  }, [token, handleAssignRequestToInternalEmployee]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Navigate to="/admin/dashboard/requests" replace />
      )}
    </>
  );
};

export default AssignRequestEmployeeInternal;
