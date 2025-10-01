import { deleteApi, getApi, postApi, putApi } from "../base";

export interface IAdminAccount {
  id: string;
  name: string;
  password: string;
  role: string;
  username: string;
}

const label = "Admin Account";

export const GETAdminAccount = async (): Promise<IAdminAccount[]> => {
  const response = await getApi<IAdminAccount[]>({
    endpoint: "/admin",
    label: label,
  });
  return response;
};

export const POSTAdminAccount = async (data: IAdminAccount): Promise<IAdminAccount> => {
  const response = await postApi<IAdminAccount>({
    data: data,
    endpoint: "/admin",
    label: label,
  });
  return response;
};

export const PUTAdminAccount = async (data: IAdminAccount): Promise<IAdminAccount> => {
  const response = await putApi<IAdminAccount>({
    data: data,
    endpoint: `/admin/${data.id}`,
    label: label,
  });
  return response;
};

export const DELETEAdminAccount = async (id: string): Promise<IAdminAccount> => {
  const response = await deleteApi<IAdminAccount>({
    endpoint: `/admin/${id}`,
    label: label,
  });
  return response;
};

export const DELETEMultipleAdminAccount = async (ids: string[]): Promise<IAdminAccount[]> => {
  const results = await Promise.all(
    ids.map(async (id) => {
      const response = await deleteApi<IAdminAccount>({
        endpoint: `/admin/${id}`,
        label: label,
      });
      return response;
    }),
  );
  return results;
};
