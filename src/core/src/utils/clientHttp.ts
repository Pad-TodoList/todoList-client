import axios from "axios";

enum RequestMethods {
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
  POST = "POST",
}

type Headers = {
  [key: string]: string;
};

function clientHttp(
  endPoint: string,
  method: RequestMethods,
  header: Headers,
  data?: any
): Promise<any> {
  return axios({
    data: data,
    headers: header,
    method: method,
    url: import.meta.env.VITE_API_URL + endPoint,
  });
}

export { clientHttp, RequestMethods, Headers };
