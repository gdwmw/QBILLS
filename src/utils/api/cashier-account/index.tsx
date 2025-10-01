import { deleteApi, getApi, postApi, putApi } from "../base";

export interface ICashierAccount {
  id: string;
  name: string;
  password: string;
  role: string;
  username: string;
}

const label = "Cashier Account";

export const GETCashierAccount = async (): Promise<ICashierAccount[]> => {
  const response = await getApi<ICashierAccount[]>({
    endpoint: "/cashier",
    label: label,
  });
  return response;
};

export const POSTCashierAccount = async (data: ICashierAccount): Promise<ICashierAccount> => {
  const response = await postApi<ICashierAccount>({
    data: data,
    endpoint: "/cashier",
    label: label,
  });
  return response;
};

export const PUTCashierAccount = async (data: ICashierAccount): Promise<ICashierAccount> => {
  const response = await putApi<ICashierAccount>({
    data: data,
    endpoint: `/cashier/${data.id}`,
    label: label,
  });
  return response;
};

export const DELETECashierAccount = async (id: string): Promise<ICashierAccount> => {
  const response = await deleteApi<ICashierAccount>({
    endpoint: `/cashier/${id}`,
    label: label,
  });
  return response;
};

export const DELETEMultipleCashierAccount = async (ids: string[]): Promise<ICashierAccount[]> => {
  const results = await Promise.all(
    ids.map(async (id) => {
      const response = await deleteApi<ICashierAccount>({
        endpoint: `/cashier/${id}`,
        label: label,
      });
      return response;
    }),
  );
  return results;
};
