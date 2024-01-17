"use server";

import type { TSignupSchema } from "./types";
import { signupSchema } from "./types";

export const logToConsole = (data: TSignupSchema) => {
  const result = signupSchema.safeParse(data);
  if (!result.success) {
    const errorMessage = result.error.issues
      .map((issue) => issue.message)
      .join("\n");
    return {
      error: errorMessage,
    };
  }
  console.log("Submitted to server", data);
};
