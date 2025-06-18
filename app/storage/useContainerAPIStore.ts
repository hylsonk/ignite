import axios, { AxiosResponse } from "axios";

const axiosInstance = axios.create({
  baseURL: "https://nps-func-dev.azurewebsites.net",
});

export const get = async <T>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.get(url);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição GET:", error);
    throw error;
  }
};

export const post = async <T>(url: string, data: any): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição POST:", error);
    throw error;
  }
};

export const put = async <T>(url: string, data: any): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição PUT:", error);
    throw error;
  }
};

export const del = async <T>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    console.error("Erro na requisição DELETE:", error);
    throw error;
  }
};
