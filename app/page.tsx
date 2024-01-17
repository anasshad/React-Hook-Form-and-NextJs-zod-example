"use client";

import * as React from "react";
//STEP 1: Import the required packages
import { useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signupSchema } from "@/lib/types";
import type { TSignupSchema } from "@/lib/types";

//import server action
import { logToConsole } from "@/lib/actions";

function Home() {
  //Step 4: Use the hook
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    getValues,
  } = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: TSignupSchema) => {
    const response = await logToConsole(data);
    if (response?.error) {
      //output error message from server
      console.log(response.error);
    }

    reset();
  };

  //Step 5: Create the form
  return (
    <div className="container mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="p-3 rounded-md shadow-sm"
        />
        {errors.email && (
          <p className="text-red-500">{`${errors.email.message}`}</p>
        )}
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="p-3 rounded-md shadow-sm"
        />
        {errors.password && (
          <p className="text-red-500">{`${errors.password.message}`}</p>
        )}
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm password"
          className="p-3 rounded-md shadow-sm"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{`${errors.confirmPassword.message}`}</p>
        )}
        <button
          type="submit"
          className="p-3 rounded-md shadow-sm bg-indigo-500 text-white"
          disabled={isSubmitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Home;
