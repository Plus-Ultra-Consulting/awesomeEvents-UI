export const hasAccessToken = () => {
  return localStorage.getItem("auth.accessToken");
};

export const getApiUrl = () => {
  return import.meta.env.VITE_API_URL;
};
