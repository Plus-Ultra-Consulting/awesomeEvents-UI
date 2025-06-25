import {Modal} from "bootstrap";
import { getConfig, setConfig } from "./state";

export const hasAccessToken = () => {
  return localStorage.getItem("auth.accessToken");
};

export const getApiUrl = () => {
  console.log("api url is", getConfig().api_url_base);
  return getConfig().api_url_base;
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

export const loadConfig = async () => {
const response = await fetch(`/config.json`);
  if (!response.ok) {
    console.log("Can't fetch config from server");
    return;
  }
  const result = await response.json();
  console.log("Fetched config: ", result);
  setConfig(result);
}
