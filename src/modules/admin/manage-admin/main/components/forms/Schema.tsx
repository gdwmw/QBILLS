import { z } from "zod";

export const Schema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: "Please enter Name minimum 3 character." }).max(32, { message: "Name maximum 32 character." }),
  password: z.string().min(8, { message: "Please enter Password minimum 8 character." }).max(16, { message: "Password maximum 16 character." }),
  role: z.string(),
  username: z.string().min(5, { message: "Please enter Username minimum 5 character." }).max(16, { message: "Username maximum 16 character." }),
});

export type TSchema = z.infer<typeof Schema>;