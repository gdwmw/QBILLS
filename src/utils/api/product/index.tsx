const URL = process.env.NEXT_PUBLIC_PRODUCT;

if (!URL) {
  throw new Error("The URL is not defined. Please check your environment variables.");
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
    const res = await fetch(URL, {
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
    const res = await fetch(URL, {
      body: JSON.stringify({
        category: data.category,
        code: data.code,
        description: data.description,
        image: data.image,
        name: data.name,
        price: data.price,
        size: data.size,
        stock: data.stock,
      }),
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
    const res = await fetch(`${URL}/${data.id}`, {
      body: JSON.stringify({
        category: data.category,
        code: data.code,
        description: data.description,
        image: data.image,
        name: data.name,
        price: data.price,
        size: data.size,
        stock: data.stock,
      }),
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
    const res = await fetch(`${URL}/${id}`, {
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
        const res = await fetch(`${URL}/${id}`, {
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
