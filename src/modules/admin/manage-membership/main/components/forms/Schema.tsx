import { maxLength, maxValue, minLength, minValue, number, object, Output, string } from "valibot";

export const Schema = object({
  id: string(),
  name: string([minLength(3, "Please enter Name minimum 3 character."), maxLength(32, "Name maximum 32 character.")]),
  "phone-number": string([minLength(8, "Please enter Phone Number minimum 8 number."), maxLength(12, "Phone Number maximum 12 number.")]),
  point: number([minValue(1, "Please enter minimum 1 point."), maxValue(100000, "Maximum 100000 point.")]),
});

export type TSchema = Output<typeof Schema>;
