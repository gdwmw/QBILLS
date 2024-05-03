const URL = process.env.NEXT_PUBLIC_TRANSACTION;

if (!URL) {
  throw new Error("The URL is not defined. Please check your environment variables.");
}

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
  try {
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
    const res = await fetch(`${URL}/${parseInt(id)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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
        const res = await fetch(`${URL}/${parseInt(id)}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
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
