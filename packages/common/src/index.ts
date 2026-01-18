import { email, z } from "zod"

const UserSchema = {
    email:z.string().email(),
    name:z.string(),
    password:z.string().min(8).max(20)
}