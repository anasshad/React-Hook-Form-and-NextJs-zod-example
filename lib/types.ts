import { z } from "zod";

//STEP 2: Create the schema
export const signupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords do not match",
    path: ["confirmPassword"],
  });

//STEP 3: Create the type
export type TSignupSchema = z.infer<typeof signupSchema>;
