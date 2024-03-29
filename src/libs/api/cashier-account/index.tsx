const URL = "https://65d4d0d13f1ab8c63436117f.mockapi.io/qbills/v1/cashieraccount";

export interface ICashierAccount {
  id: string;
  name: string;
  username: string;
  password: string;
  role: string;
}

export type TCashierAccount = {
  name: string;
  username: string;
  password: string;
  role: string;
};

export const GETCashierAccount = async (): Promise<ICashierAccount[]> => {
  try {
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch: Cashier Account");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to fetch: Cashier Account");
  }
};

export const POSTCashierAccount = async (data: TCashierAccount): Promise<ICashierAccount> => {
  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to post: Cashier Account");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to post: Cashier Account");
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
      throw new Error("Failed to put: Cashier Account");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to put: Cashier Account");
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
      throw new Error("Failed to delete: Cashier Account");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to delete: Cashier Account");
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
          throw new Error(`Failed to delete: Cashier Account with id ${id}`);
        }

        return await res.json();
      }),
    );

    return results;
  } catch (error) {
    throw new Error("Failed to delete: Cashier Accounts");
  }
};
