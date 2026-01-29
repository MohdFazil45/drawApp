import { email, z } from "zod"

export const CreateUserSchema = z.object({
    email:z.string().email("Must be an email"),
    password:z.string(),
    name:z.string().min(3, "Must be at least of three characters").max(20, "Not exceed the 20 characters")
})

export const SigninSchema = z.object({
    email:z.string().email("Must be an email"),
    password:z.string()
})

export const CreateRoomSchema = z.object({
    slug:z.string().min(3).max(20)
})