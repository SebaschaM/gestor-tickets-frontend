import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";

const TIMEOUT = 1000;

const commonStyle = {
  color: "#fff",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px", 
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
};

const iconStyle = {
  marginRight: "8px",
};

// Error Toast
export const showErrorToast = (message: string) => {
  toast.error(
    <div style={{ display: "flex", alignItems: "center" }}>
      <FaExclamationCircle style={iconStyle} />
      {message}
    </div>,
    {
      position: "top-right",
      autoClose: TIMEOUT,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        ...commonStyle,
        background: "#ff4d4f", 
      },
      icon: false, 
    }
  );
};

// Success Toast
export const showSuccessToast = (message: string) => {
  toast.success(
    <div style={{ display: "flex", alignItems: "center" }}>
      <FaCheckCircle style={iconStyle} />
      {message}
    </div>,
    {
      position: "top-right",
      autoClose: TIMEOUT,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        ...commonStyle,
        background: "#52c41a", 
      },
      icon: false, 
    }
  );
};

// Warning Toast
export const showWarningToast = (message: string) => {
  toast.warn(
    <div style={{ display: "flex", alignItems: "center" }}>
      <FaExclamationTriangle style={iconStyle} />
      {message}
    </div>,
    {
      position: "top-right",
      autoClose: TIMEOUT,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        ...commonStyle,
        background: "#faad14", 
      },
      icon: false,
    }
  );
};

// Info Toast
export const showInfoToast = (message: string) => {
  toast.info(
    <div style={{ display: "flex", alignItems: "center" }}>
      <FaInfoCircle style={iconStyle} />
      {message}
    </div>,
    {
      position: "top-right",
      autoClose: TIMEOUT,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        ...commonStyle,
        background: "#1890ff", 
      },
      icon: false, 
    }
  );
};