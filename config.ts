interface Config {
  baseUrl: string;
}

const checkConfig = (server: string): Config | object => {
  let config: Config | object = {};
  switch (server) {
    case "production":
      config = {
        baseUrl: "http://localhost:4000/api/v1",
      };
      break;
    case "local":
      config = {
        baseUrl: "http://localhost:4000/api/v1",
      };
      break;
    default:
      break;
  }
  return config;
};

export const selectServer = "local";
export const config = checkConfig(selectServer) as Config;
