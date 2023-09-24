import {
  HttpClient,
  RequestConfig,
} from "../../todoList-client-core/src/services/types/httpClient.ts";

function createApiUrlProvider(httpClient: HttpClient): HttpClient {
  return {
    sendHttpRequest<Response>(config: RequestConfig): Promise<Response> {
      return httpClient.sendHttpRequest({
        baseUrl: "/api",
        ...config,
      });
    },
  };
}

export { createApiUrlProvider };
