import axios from "axios";
import {
  HttpClient,
  HttpMethods,
  RequestConfig,
} from "../../todoList-client-core/src/services/types/httpClient.ts";

function sendRequest<Response>(config: RequestConfig): Promise<Response> {
  const requestData =
    config.method === HttpMethods.GET
      ? { params: config.data }
      : { data: config.data };

  return new Promise<Response>((resolve, reject) =>
    axios({
      url: config.baseUrl + config.endpoint,
      method: config.method,
      headers: {
        "Content-Type": "application/json",
        ...config.headers,
      },
      ...requestData,
    })
      .then(({ data }) => resolve(data))
      .catch((error) =>
        reject(
          !!error.response
            ? error.response.data
            : !!error.request
            ? error.request
            : error
        )
      )
  );
}

function cleanHeaders(headers: { [p: string]: string } | undefined) {
  return headers
    ? Object.entries(headers)
        // @ts-ignore
        .filter(([key, value]) => !!value)
        .reduce(
          (nextHeaders, [key, value]) => ({ ...nextHeaders, [key]: value }),
          {}
        )
    : undefined;
}

function createHttpClient(): HttpClient {
  return {
    sendHttpRequest<Response>(config: RequestConfig): Promise<Response> {
      return sendRequest({
        ...config,
        headers: cleanHeaders(config.headers),
      });
    },
  };
}

export { createHttpClient };
