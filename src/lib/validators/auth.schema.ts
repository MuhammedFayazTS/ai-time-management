import { z } from "zod";

const signInschema = z.object({
  email: z.string().email(),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
});

const signUpSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Password is required")
    .min(4, "Password must be more than 4 characters"),
  email: z.string(),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(6, "Password must be more than 6 characters")
    .max(32, "Password must be less than 32 characters"),
});

type SignInSchema = z.infer<typeof signInschema>;
type SignUpSchema = z.infer<typeof signUpSchema>;

export { signInschema, type SignInSchema, signUpSchema, type SignUpSchema };
