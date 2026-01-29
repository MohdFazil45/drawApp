"use client";
import { FieldMeta, useForm } from "@tanstack/react-form";
import Input from "./InputComponent";
import ThemeToggle from "./ThemeToggleComponent";
import { useRouter } from "next/navigation";
import { Button } from "./ButtonComponent";
import { CreateUserSchema } from "@repo/common/types";
import { useState } from "react";
import { z } from "zod";
import axios from "axios";
import FieldInfo from "./ErrorMessage";

export function FormSignup() {
  const [serverError, setServerError] = useState();
  const route = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onChange: CreateUserSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_HTTP_BACKEND_URL}/signup`,
          {
            name: value.name,
            password: value.password,
            email: value.email,
          },
        );

        console.log("successfully signedup", response.data);
        route.push("/signin")
      } catch (error) {
        console.log(error)
      }
    },
  });

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-linear-to-br from-cyan-500/10 via-transparent to-cyan-500/10">
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>
      <div className="p-4 m-2 dark:bg-black w-[30vw] h-[36vw] rounded-lg text-white border  dark:border-cyan-400/40 border-neutral-700/50 shadow-lg dark:shadow-cyan-400/20 shadow-neutral-400  flex flex-col items-center justify-center gap-4 backdrop-blur-xl shadow-blur-multi ">
        <div
          className="text-4xl font-bold text-cyan-400 mt-4 cursor-pointer"
          onClick={() => route.push("/")}
        >
          CollabCanvas
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <form.Field
            name="name"
            children={(field) => (
              <div>
                <Input
                  title="Name"
                  type="text"
                  placeholder="Enter your name"
                  value={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                />
                <FieldInfo
                  isTouched={field.state.meta.isTouched}
                  errors={field.state.meta.errors}
                />
              </div>
            )}
          />

          <form.Field
            name="email"
            children={(field) => (
              <div>
                <Input
                  title={"Email"}
                  type="email"
                  placeholder="Enter your email"
                  value={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                />
                <FieldInfo
                  isTouched={field.state.meta.isTouched}
                  errors={field.state.meta.errors}
                />
              </div>
            )}
          />

          <form.Field
            name="password"
            children={(field) => (
              <div>
                <Input
                  title={"Password"}
                  type="password"
                  placeholder="Create your password"
                  value={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                />
                <FieldInfo
                  isTouched={field.state.meta.isTouched}
                  errors={field.state.meta.errors}
                />
              </div>
            )}
          />
          <div className="flex items-center justify-center mt-4">
            <Button type="submit" variant="secondary" size="lg">
              Signup
            </Button>
          </div>
          <div className="dark:text-neutral-500 text-neutral-800 mt-2 flex items-center justify-center ">
            Already have an account
            <span onClick={() => route.push("/signin")}>
              <a className="text-cyan-400 cursor-pointer"> signin</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

