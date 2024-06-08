import { z } from "zod";

export const Schema = z.object({
  id: z.string(),
  name: z.string().min(3, { message: "Please enter Name minimum 3 character." }).max(32, { message: "Name maximum 32 character." }),
  "phone-number": z.string().min(8, { message: "Please enter Phone Number minimum 8 number." }).max(12, { message: "Phone Number maximum 12 number." }),
  point: z.number().min(1, { message: "Please enter minimum 1 point." }).max(100000, { message: "Maximum 100000 point." }),
});

export type TSchema = z.infer<typeof Schema>;