import { any, maxLength, minLength, minValue, number, object, Output, string } from "valibot";

export const Schema = object({
  category: string([minLength(1, "Please choose one of the options.")]),
  code: string([minLength(5, "Please enter code minimum 5 character."), maxLength(10, "Code maximum 10 character.")]),
  description: string([minLength(8, "Please enter description minimum 8 character."), maxLength(200, "Description maximum 200 character.")]),
  id: string(),
  image: any(),
  name: string([minLength(3, "Please enter Name minimum 3 character."), maxLength(32, "Name maximum 32 character.")]),
  price: number([minValue(1000, "Please enter price minimum 1000 rupiah.")]),
  size: string([minLength(1, "Please choose one of the options.")]),
  stock: string([minLength(1, "Please choose one of the options.")]),
});

export type TSchema = Output<typeof Schema>;
