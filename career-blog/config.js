export const development = {
  servicePath: "http://localhost:8090",
  currentEnv: "development",
};

export const local = {
  servicePath: "http://localhost:8090",
  currentEnv: "local",
};

let config = development;
switch (import.meta.env.VITE_APP_ENV) {
  case "local": {
    config = local;
    break;
  }
  default: {
    config = development;
    break;
  }
}

export default config;
