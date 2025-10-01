import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, Method } from "axios";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

interface I {
  data?: unknown;
  endpoint?: string;
  headers?: AxiosRequestHeaders;
  label: string;
  method?: Method;
  params?: Record<string, any>;
}

export const apiRequest = async <T>(props: I): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      data: props.data,
      headers: {
        ...props.headers,
      },
      method: props.method,
      params: props.params,
      url: props.endpoint ? `${API_URL}${props.endpoint}` : API_URL,
    };

    const res: AxiosResponse<T> = await axios(config);

    return res.data;
  } catch (error) {
    const statusCode = (error as any)?.response?.status;
    const errorMessage = (error as any)?.response?.data?.error?.message || (error as Error)?.message;

    console.error(
      "--- API Request Error ---",
      `An error occurred while processing ${props.method} request for ${props.label} || Status Code: ${statusCode} || Message: ${errorMessage}`,
    );

    throw new Error(errorMessage);
  }
};

export const getApi = <T>(props: Omit<I, "data" | "method">): Promise<T> => apiRequest<T>({ ...props, method: "GET" });

export const postApi = <T>(props: Omit<I, "method" | "params">): Promise<T> => apiRequest<T>({ ...props, method: "POST" });

export const putApi = <T>(props: Omit<I, "method" | "params">): Promise<T> => apiRequest<T>({ ...props, method: "PUT" });

export const deleteApi = <T>(props: Omit<I, "data" | "method" | "params">): Promise<T> => apiRequest<T>({ ...props, method: "DELETE" });
