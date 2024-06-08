import { z } from "zod";

export const Schema = z.object({
  category: z.string().min(1, { message: "Please choose one of the options." }),
  code: z.string().min(5, { message: "Please enter Code minimum 5 character." }).max(10, { message: "Code maximum 10 character." }),
  description: z
    .string()
    .min(8, { message: "Please enter Description minimum 8 character." })
    .max(200, { message: "Description maximum 200 character." }),
  id: z.string(),
  image: z.any(),
  name: z.string().min(3, { message: "Please enter Name minimum 3 character." }).max(32, { message: "Name maximum 32 character." }),
  price: z.number().min(1000, { message: "Please enter Price minimum 1000 rupiah." }),
  size: z.string().min(1, { message: "Please choose one of the options." }),
  stock: z.string().min(1, { message: "Please choose one of the options." }),
});

export type TSchema = z.infer<typeof Schema>;
