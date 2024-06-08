import { z } from "zod";

export const Schema = z.object({
  password: z.string().min(1, { message: "Please enter your Password." }),
  username: z.string().min(1, { message: "Please enter your Username." }),
});

export type TSchema = z.infer<typeof Schema>;
