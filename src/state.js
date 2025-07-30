export const state = {
  config: {},
};

export const getConfig = () => {
  return state.config;
}

export const setConfig = (cfg) => {
  state.config = cfg ?? {};
}
