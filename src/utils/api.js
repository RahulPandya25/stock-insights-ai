import { v4 as uuid } from "uuid";

const backendApi = import.meta.env.VITE_BACKEND_ENTRYPOINT_API_URL;

const send = async ({
  method,
  url = backendApi,
  queryParams = {},
  body,
  header,
}) => {
  const sessionId = sessionStorage.getItem("sessionId");

  const finalUrl =
    url +
    `${
      Object.keys(queryParams).length > 0
        ? `?${Object.keys(queryParams)
            .map((key) => `${key}=${queryParams[key]}`)
            .join("&")}`
        : ""
    }`;

  const response = await fetch(finalUrl, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      ...header,
      Authorization: sessionId,
    },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error
        ? data.error
        : `Something went wrong response status [${response.status}]`
    );
  }

  return data;
};

export const api = {
  askAI: (ticker) =>
    send({
      method: "POST",
      body: { ticker, action: `#AnalyzeStock`, threadId: uuid() },
    }),
};
