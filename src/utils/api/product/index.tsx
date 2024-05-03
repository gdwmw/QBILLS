const URL = process.env.NEXT_PUBLIC_PRODUCT;

if (!URL) {
  throw new Error("The URL is not defined. Please check your environment variables.");
}

export interface IProduct {
  id: string;
  code: string;
  name: string;
  description: string;
  category: string;
  size: string;
  price: number;
  stock: string;
  image: any;
}

export const GETProduct = async (): Promise<IProduct[]> => {
  try {
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: data.code,
        name: data.name,
        description: data.description,
        category: data.category,
        size: data.size,
        price: data.price,
        stock: data.stock,
        image: data.image,
      }),
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
    const res = await fetch(`${URL}/${parseInt(data.id)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: data.code,
        name: data.name,
        description: data.description,
        category: data.category,
        size: data.size,
        price: data.price,
        stock: data.stock,
        image: data.image,
      }),
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
    const res = await fetch(`${URL}/${parseInt(id)}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
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
        const res = await fetch(`${URL}/${parseInt(id)}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
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
