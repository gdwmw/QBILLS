import { deleteApi, getApi, postApi, putApi } from "../base";

export interface IMembership {
  id: string;
  name: string;
  "phone-number": string;
  point: number;
}

const label = "Membership";

export const GETMembership = async (): Promise<IMembership[]> => {
  const response = await getApi<IMembership[]>({
    endpoint: "/membership",
    label: label,
  });
  return response;
};

export const POSTMembership = async (data: IMembership): Promise<IMembership> => {
  const response = await postApi<IMembership>({
    data: data,
    endpoint: "/membership",
    label: label,
  });
  return response;
};

export const PUTMembership = async (data: IMembership): Promise<IMembership> => {
  const response = await putApi<IMembership>({
    data: data,
    endpoint: `/membership/${data.id}`,
    label: label,
  });
  return response;
};

export const DELETEMembership = async (id: string): Promise<IMembership> => {
  const response = await deleteApi<IMembership>({
    endpoint: `/membership/${id}`,
    label: label,
  });
  return response;
};

export const DELETEMultipleMembership = async (ids: string[]): Promise<IMembership[]> => {
  const results = await Promise.all(
    ids.map(async (id) => {
      const response = await deleteApi<IMembership>({
        endpoint: `/membership/${id}`,
        label: label,
      });
      return response;
    }),
  );
  return results;
};
