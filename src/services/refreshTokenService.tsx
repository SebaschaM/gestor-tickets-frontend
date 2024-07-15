import apiTicketsProject from "../api/apiTicketsProject";

const handleRefreshToken = async () => {
  try {
    const response = await apiTicketsProject.post(
      "/auth/refresh-token",
      {},
      {
        withCredentials: true,
      }
    );

    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token", error);
    throw error;
  }
};

export { handleRefreshToken };
