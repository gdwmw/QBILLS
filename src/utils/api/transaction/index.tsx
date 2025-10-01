import { deleteApi, getApi, postApi, putApi } from "../base";

export interface ITransaction {
  amount: number;
  cashier: string;
  code: string;
  customer: string;
  date: string;
  id: string;
  payment: string;
  status: string;
  time: string;
}

const label = "Transaction";

export const GETTransaction = async (): Promise<ITransaction[]> => {
  const response = await getApi<ITransaction[]>({
    endpoint: "/transaction",
    label: label,
  });
  return response;
};

export const POSTTransaction = async (data: ITransaction): Promise<ITransaction> => {
  const response = await postApi<ITransaction>({
    data: data,
    endpoint: "/transaction",
    label: label,
  });
  return response;
};

export const PUTTransaction = async (data: ITransaction): Promise<ITransaction> => {
  const response = await putApi<ITransaction>({
    data: data,
    endpoint: `/transaction/${data.id}`,
    label: label,
  });
  return response;
};

export const DELETETransaction = async (id: string): Promise<ITransaction> => {
  const response = await deleteApi<ITransaction>({
    endpoint: `/transaction/${id}`,
    label: label,
  });
  return response;
};

export const DELETEMultipleTransaction = async (ids: string[]): Promise<ITransaction[]> => {
  const results = await Promise.all(
    ids.map(async (id) => {
      const response = await deleteApi<ITransaction>({
        endpoint: `/transaction/${id}`,
        label: label,
      });
      return response;
    }),
  );
  return results;
};
