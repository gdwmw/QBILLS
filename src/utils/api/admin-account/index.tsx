const URL = process.env.NEXT_PUBLIC_ADMIN_ACCOUNT;

export interface IAdminAccount {
  id: string;
  name: string;
  username: string;
  password: string;
  role: string;
}

export const GETAdminAccount = async (): Promise<IAdminAccount[]> => {
  if (!URL) {
    throw new Error("URL is not defined");
  }

  try {
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch: Admin Account");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to fetch: Admin Account");
  }
};

export const POSTAdminAccount = async (data: IAdminAccount): Promise<IAdminAccount> => {
  if (!URL) {
    throw new Error("URL is not defined");
  }

  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data.name, username: data.username, password: data.password, role: data.role }),
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
  if (!URL) {
    throw new Error("URL is not defined");
  }

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
  if (!URL) {
    throw new Error("URL is not defined");
  }

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

export const DELETEMultipleAdminAccount = async (ids: string[]): Promise<IAdminAccount[]> => {
  if (!URL) {
    throw new Error("URL is not defined");
  }

  try {
    const results = await Promise.all(
      ids.map(async (id) => {
        const res = await fetch(`${URL}/${parseInt(id)}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to delete: Admin Account with id ${id}`);
        }

        return await res.json();
      }),
    );

    return results;
  } catch (error) {
    throw new Error("Failed to delete: Admin Accounts");
  }
};
