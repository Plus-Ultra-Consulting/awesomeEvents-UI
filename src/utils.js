export const hasAccessToken = () => {
  return localStorage.getItem("auth.accessToken");
};
