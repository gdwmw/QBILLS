const URL = process.env.NEXT_PUBLIC_CASHIER_ACCOUNT;

if (!URL) {
  throw new Error("The URL is not defined. Please check your environment variables.");
}

export interface ICashierAccount {
  id: string;
  name: string;
  username: string;
  password: string;
  role: string;
}

export const GETCashierAccount = async (): Promise<ICashierAccount[]> => {
  try {
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: Cashier Account with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const POSTCashierAccount = async (data: ICashierAccount): Promise<ICashierAccount> => {
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data.name, username: data.username, password: data.password, role: data.role }),
    });

    if (!res.ok) {
      throw new Error(`Failed to post: Cashier Account with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const PUTCashierAccount = async (data: ICashierAccount): Promise<ICashierAccount> => {
  try {
    const res = await fetch(`${URL}/${parseInt(data.id)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data.name, username: data.username, password: data.password, role: data.role }),
    });

    if (!res.ok) {
      throw new Error(`Failed to put: Cashier Account with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const DELETECashierAccount = async (id: string): Promise<ICashierAccount> => {
  try {
    const res = await fetch(`${URL}/${parseInt(id)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to delete: Cashier Account with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const DELETEMultipleCashierAccount = async (ids: string[]): Promise<ICashierAccount[]> => {
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
          throw new Error(`Failed to delete: Cashier Account with id ${id} and status ${res.status}`);
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
