const URL = process.env.NEXT_PUBLIC_TRANSACTION;

if (!URL) {
  throw new Error("The URL is not defined. Please check your environment variables.");
}

export interface ITransaction {
  amount: number;
  cashier: string;
  code: string;
  customer: string;
  date: string;
  id: string;
  payment: string;
  status: string;
  time: string;
}

export const GETTransaction = async (): Promise<ITransaction[]> => {
  try {
    const res = await fetch(URL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: Transaction with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const POSTTransaction = async (data: ITransaction): Promise<ITransaction> => {
  try {
    const res = await fetch(URL, {
      body: JSON.stringify({
        amount: data.amount,
        cashier: data.cashier,
        code: data.code,
        customer: data.customer,
        date: data.date,
        payment: data.payment,
        status: data.status,
        time: data.time,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!res.ok) {
      throw new Error(`Failed to post: Transaction with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const PUTTransaction = async (data: ITransaction): Promise<ITransaction> => {
  try {
    const res = await fetch(`${URL}/${data.id}`, {
      body: JSON.stringify({
        amount: data.amount,
        cashier: data.cashier,
        code: data.code,
        customer: data.customer,
        date: data.date,
        payment: data.payment,
        status: data.status,
        time: data.time,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    if (!res.ok) {
      throw new Error(`Failed to put: Transaction with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const DELETETransaction = async (id: string): Promise<ITransaction> => {
  try {
    const res = await fetch(`${URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`Failed to delete: Transaction with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const DELETEMultipleTransaction = async (ids: string[]): Promise<ITransaction[]> => {
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
          throw new Error(`Failed to delete: Transaction with id ${id} and status ${res.status}`);
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
