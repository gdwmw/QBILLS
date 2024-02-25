const URL = "https://65d4d0d13f1ab8c63436117f.mockapi.io/qbills/v1/adminaccount";

export interface IAdminAccount {
  id: string;
  name: string;
  username: string;
  password: string;
  role: string;
}

export type TAdminAccount = {
  name: string;
  username: string;
  password: string;
  role: string;
};

export const GETAdminAccount = async (): Promise<IAdminAccount[]> => {
  try {
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch: Admin Account");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to fetch: Admin Account");
  }
};

export const POSTAdminAccount = async (data: TAdminAccount): Promise<IAdminAccount> => {
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to post: Admin Account");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to post: Admin Account");
  }
};

export const PUTAdminAccount = async (data: IAdminAccount): Promise<IAdminAccount> => {
  try {
    const res = await fetch(`${URL}/${parseInt(data.id)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data.name, username: data.username, password: data.password, role: data.role }),
    });

    if (!res.ok) {
      throw new Error("Failed to put: Admin Account");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to put: Admin Account");
  }
};

export const DELETEAdminAccount = async (id: string): Promise<IAdminAccount> => {
  try {
    const res = await fetch(`${URL}/${parseInt(id)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete: Admin Account");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to delete: Admin Account");
  }
};
