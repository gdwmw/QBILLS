const API_URL = process.env.NEXT_PUBLIC_ADMIN_ACCOUNT;

if (!API_URL) {
  throw new Error("The URL is not defined. Please check your environment variables.");
}

export interface IAdminAccount {
  id: string;
  name: string;
  password: string;
  role: string;
  username: string;
}
type TGETAdminAccount = {
  id?: string;
  limit?: number;
  page?: number;
  search?: string;
};

export const GETAdminAccount = async ({ id, limit, page, search }: TGETAdminAccount): Promise<IAdminAccount[]> => {
  const url = new URL(API_URL, window.location.origin);
  id && url.searchParams.append("id", id);
  search && url.searchParams.append("search", search);
  page && url.searchParams.append("page", page.toString());
  limit && url.searchParams.append("limit", limit.toString());

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
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
    const res = await fetch(API_URL, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
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
    const res = await fetch(`${API_URL}/${data.id}`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
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
    const res = await fetch(`${API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
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
        const res = await fetch(`${API_URL}/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
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
