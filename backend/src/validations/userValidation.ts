import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
  body: object({
    firstName: string({
      required_error: "firstName is required",
    }),
    lastName: string({
      required_error: "lastName is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short - should be 6 characters minimum"),
  }),
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
