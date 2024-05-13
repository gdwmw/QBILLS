import { maxLength, minLength, object, string } from "valibot";

export const Schema = object({
  id: string(),
  name: string([minLength(3, "Please enter name minimum 3 character."), maxLength(32, "Please enter name maximum 32 character.")]),
  username: string([minLength(5, "Please enter username minimum 5 character."), maxLength(16, "Please enter username maximum 16 character.")]),
  password: string([minLength(5, "Please enter password minimum 5 character."), maxLength(16, "Please enter password maximum 16 character.")]),
  role: string(),
});
