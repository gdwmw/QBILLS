const API_URL = process.env.NEXT_PUBLIC_ALLDATA;

if (!API_URL) {
  throw new Error("The URL is not defined. Please check your environment variables.");
}

import { IAdminAccount, ICashierAccount, IMembership, IProduct, ITransaction } from "..";

export interface IDashboard {
  admin: IAdminAccount[];
  cashier: ICashierAccount[];
  id: string;
  membership: IMembership[];
  product: IProduct[];
  transaction: ITransaction[];
}

export const GETDashboard = async (): Promise<IDashboard> => {
  try {
    const res = await fetch(API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: Dashboard with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};
