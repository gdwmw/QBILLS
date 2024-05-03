const URL = process.env.NEXT_PUBLIC_ADMIN_ACCOUNT;

if (!URL) {
  throw new Error("The URL is not defined. Please check your environment variables.");
}

export interface IAdminAccount {
  id: string;
  name: string;
  username: string;
  password: string;
  role: string;
}

export const GETAdminAccount = async (): Promise<IAdminAccount[]> => {
  try {
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: Admin Account with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const POSTAdminAccount = async (data: IAdminAccount): Promise<IAdminAccount> => {
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data.name, username: data.username, password: data.password, role: data.role }),
    });

    if (!res.ok) {
      throw new Error(`Failed to post: Admin Account with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
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
      throw new Error(`Failed to put: Admin Account with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
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
      throw new Error(`Failed to delete: Admin Account with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const DELETEMultipleAdminAccount = async (ids: string[]): Promise<IAdminAccount[]> => {
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
          throw new Error(`Failed to delete: Admin Account with id ${id} and status ${res.status}`);
        }

        return await res.json();
      }),
    );

    return results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
