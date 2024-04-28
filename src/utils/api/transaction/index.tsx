const URL = process.env.NEXT_PUBLIC_TRANSACTION;

export interface ITransaction {
  id: string;
  code: string;
  cashier: string;
  customer: string;
  payment: string;
  date: string;
  time: string;
  amount: number;
  status: string;
}

export const GETTransaction = async (): Promise<ITransaction[]> => {
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
      throw new Error("Failed to fetch: Transaction");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to fetch: Transaction");
  }
};

export const POSTTransaction = async (data: ITransaction): Promise<ITransaction> => {
  if (!URL) {
    throw new Error("URL is not defined");
  }

  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: data.code,
        cashier: data.cashier,
        customer: data.customer,
        payment: data.payment,
        date: data.date,
        time: data.time,
        amount: data.amount,
        status: data.status,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to post: Transaction");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to post: Transaction");
  }
};

export const PUTTransaction = async (data: ITransaction): Promise<ITransaction> => {
  if (!URL) {
    throw new Error("URL is not defined");
  }

  try {
    const res = await fetch(`${URL}/${parseInt(data.id)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: data.code,
        cashier: data.cashier,
        customer: data.customer,
        payment: data.payment,
        date: data.date,
        time: data.time,
        amount: data.amount,
        status: data.status,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to put: Transaction");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to put: Transaction");
  }
};

export const DELETETransaction = async (id: string): Promise<ITransaction> => {
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
      throw new Error("Failed to delete: Transaction");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to delete: Transaction");
  }
};

export const DELETEMultipleTransaction = async (ids: string[]): Promise<ITransaction[]> => {
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
          throw new Error(`Failed to delete: Transaction with id ${id}`);
        }

        return await res.json();
      }),
    );

    return results;
  } catch (error) {
    throw new Error("Failed to delete: Transactions");
  }
};
