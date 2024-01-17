This repo is an example of using react hook form along with zod for client side and server validation in next.js

## Getting Started

Install Required Packages

```bash
npm install react-hook-form zod
```

## Import Packages

```
import { useForm, type FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
```

## Create Schema with Zod

```
const signupSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The passwords do not match",
    path: ["confirmPassword"],
  });
```

## Create Type with Zod

```
type TSignupSchema = z.infer<typeof signupSchema>;

```

## Use the hook

```
const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
  });
```

## That's it

Now we can create the form and use it
