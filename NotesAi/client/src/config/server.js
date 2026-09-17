const configuredServerUrl = import.meta.env.VITE_SERVER_URL;

export const ServerUrl = (
  configuredServerUrl || "https://examnotesai-d7lt.onrender.com"
).replace(/\/+$/, "");

export const serverUrl = (path = "") => {
  const resourcePath = String(path);

  if (/^(?:[a-z][a-z\d+\-.]*:|\/\/)/i.test(resourcePath)) {
    return resourcePath;
  }

  return `${ServerUrl}/${resourcePath.replace(/^\/+/, "")}`;
};
