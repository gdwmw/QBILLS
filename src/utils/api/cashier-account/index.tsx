const URL = process.env.NEXT_PUBLIC_CASHIER_ACCOUNT;

if (!URL) {
  throw new Error("The URL is not defined. Please check your environment variables.");
}

export interface ICashierAccount {
  id: string;
  name: string;
  password: string;
  role: string;
  username: string;
}

export const GETCashierAccount = async (): Promise<ICashierAccount[]> => {
  try {
    const res = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
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
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
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
    const res = await fetch(`${URL}/${data.id}`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
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
    const res = await fetch(`${URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
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
        const res = await fetch(`${URL}/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
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
