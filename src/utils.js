import {Modal} from "bootstrap";

export const hasAccessToken = () => {
  return localStorage.getItem("auth.accessToken");
};

export const getApiUrl = () => {
  return import.meta.env.VITE_API_URL;
};

export const showModalWhenReady = (modalElementId) => {
  const modalElement = document.getElementById(modalElementId);
  const modal = Modal.getInstance(modalElement) || new Modal(modalElement);

  if (document.visibilityState === 'visible'){
    modal.show();
  } else {
    const handler = () => {
      if (document.visibilityState === 'visible'){
        modal.show();
        document.removeEventListener('visibilitychange', handler);
      }
    };
    document.addEventListener('visibilitychange', handler);
  }
}
