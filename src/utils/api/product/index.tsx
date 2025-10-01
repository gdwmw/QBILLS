import { deleteApi, getApi, postApi, putApi } from "../base";

export interface IProduct {
  category: string;
  code: string;
  description: string;
  id: string;
  image: any;
  name: string;
  price: number;
  size: string;
  stock: string;
}

const label = "Product";

export const GETProduct = async (): Promise<IProduct[]> => {
  const response = await getApi<IProduct[]>({
    endpoint: "/product",
    label: label,
  });
  return response;
};

export const POSTProduct = async (data: IProduct): Promise<IProduct> => {
  const response = await postApi<IProduct>({
    data: data,
    endpoint: "/product",
    label: label,
  });
  return response;
};

export const PUTProduct = async (data: IProduct): Promise<IProduct> => {
  const response = await putApi<IProduct>({
    data: data,
    endpoint: `/product/${data.id}`,
    label: label,
  });
  return response;
};

export const DELETEProduct = async (id: string): Promise<IProduct> => {
  const response = await deleteApi<IProduct>({
    endpoint: `/product/${id}`,
    label: label,
  });
  return response;
};

export const DELETEMultipleProduct = async (ids: string[]): Promise<IProduct[]> => {
  const results = await Promise.all(
    ids.map(async (id) => {
      const response = await deleteApi<IProduct>({
        endpoint: `/product/${id}`,
        label: label,
      });
      return response;
    }),
  );
  return results;
};
