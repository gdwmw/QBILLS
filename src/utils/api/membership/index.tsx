const URL = process.env.NEXT_PUBLIC_MEMBERSHIP;

export interface IMembership {
  id: string;
  name: string;
  "phone-number": number;
  point: number;
}

export type TMembership = {
  name: string;
  "phone-number": number;
  point: number;
};

export const GETMembership = async (): Promise<IMembership[]> => {
  if (!URL) {
    throw new Error("URL is not defined");
  }

  try {
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch: Membership");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to fetch: Membership");
  }
};

export const POSTMembership = async (data: TMembership): Promise<IMembership> => {
  if (!URL) {
    throw new Error("URL is not defined");
  }

  try {
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to post: Membership");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to post: Membership");
  }
};

export const PUTMembership = async (data: IMembership): Promise<IMembership> => {
  if (!URL) {
    throw new Error("URL is not defined");
  }

  try {
    const res = await fetch(`${URL}/${parseInt(data.id)}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: data.name, "phone-number": data["phone-number"], point: data.point }),
    });

    if (!res.ok) {
      throw new Error("Failed to put: Membership");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to put: Membership");
  }
};

export const DELETEMembership = async (id: string): Promise<IMembership> => {
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
      throw new Error("Failed to delete: Membership");
    }

    return await res.json();
  } catch (error) {
    throw new Error("Failed to delete: Membership");
  }
};

export const DELETEMultipleMembership = async (ids: string[]): Promise<IMembership[]> => {
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
          throw new Error(`Failed to delete: Membership with id ${id}`);
        }

        return await res.json();
      }),
    );

    return results;
  } catch (error) {
    throw new Error("Failed to delete: Memberships");
  }
};
