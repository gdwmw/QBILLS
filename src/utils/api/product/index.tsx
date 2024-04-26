const URL = process.env.NEXT_PUBLIC_PRODUCT;

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
      throw new Error("Failed to fetch: Product");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to fetch: Product");
  }
};

export const POSTProduct = async (data: IProduct): Promise<IProduct> => {
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
      throw new Error("Failed to post: Product");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to post: Product");
  }
};

export const PUTProduct = async (data: IProduct): Promise<IProduct> => {
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
      throw new Error("Failed to put: Product");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to put: Product");
  }
};

export const DELETEProduct = async (id: string): Promise<IProduct> => {
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
      throw new Error("Failed to delete: Product");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to delete: Product");
  }
};

export const DELETEMultipleProduct = async (ids: string[]): Promise<IProduct[]> => {
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
          throw new Error(`Failed to delete: Product with id ${id}`);
        }

        return await res.json();
      }),
    );

    return results;
  } catch (error) {
    throw new Error("Failed to delete: Products");
  }
};
