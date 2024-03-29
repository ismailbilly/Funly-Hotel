import { TypeOf, object, string } from "zod";

export const createLoginSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }),
    password: string({
      required_error: "Password is required",
    }),
  }),
});
export type CreateLoginInput = TypeOf<typeof createLoginSchema>;