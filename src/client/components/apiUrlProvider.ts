import { HttpClient, RequestConfig } from "@todo-list/services";

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
