const API_URL = process.env.NEXT_PUBLIC_PRODUCT;

if (!API_URL) {
  throw new Error("The API URL is not defined. Please check your environment variables.");
}

export interface IProduct {
  category: string;
  code: string;
  description: string;
  id: string;
  image: any;
  name: string;
  price: number;
  size: string;
  stock: string;
}

export const GETProduct = async (): Promise<IProduct[]> => {
  try {
    const res = await fetch(API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: Product with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const POSTProduct = async (data: IProduct): Promise<IProduct> => {
  try {
    const res = await fetch(API_URL, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!res.ok) {
      throw new Error(`Failed to post: Product with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const PUTProduct = async (data: IProduct): Promise<IProduct> => {
  try {
    const res = await fetch(`${API_URL}/${data.id}`, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    if (!res.ok) {
      throw new Error(`Failed to put: Product with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const DELETEProduct = async (id: string): Promise<IProduct> => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`Failed to delete: Product with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const DELETEMultipleProduct = async (ids: string[]): Promise<IProduct[]> => {
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
          throw new Error(`Failed to delete: Product with id ${id} and status ${res.status}`);
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
