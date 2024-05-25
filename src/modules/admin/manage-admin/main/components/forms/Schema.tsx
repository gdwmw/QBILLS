import { maxLength, minLength, object, Output, string } from "valibot";

export const Schema = object({
  id: string(),
  name: string([minLength(3, "Please enter Name minimum 3 character."), maxLength(32, "Name maximum 32 character.")]),
  password: string([minLength(5, "Please enter Password minimum 5 character."), maxLength(16, "Password maximum 16 character.")]),
  role: string(),
  username: string([minLength(5, "Please enter Username minimum 5 character."), maxLength(16, "Username maximum 16 character.")]),
});

export type TSchema = Output<typeof Schema>;
