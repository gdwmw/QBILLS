import { IAdminAccount, ICashierAccount, IMembership, IProduct, ITransaction } from "..";
import { getApi } from "../base";

export interface IDashboard {
  admin: IAdminAccount[];
  cashier: ICashierAccount[];
  id: string;
  membership: IMembership[];
  product: IProduct[];
  transaction: ITransaction[];
}

export const GETDashboard = async (): Promise<IDashboard> => {
  const label = "Dashboard";
  const response = await getApi<IDashboard>({
    label: label,
  });
  return response;
};
