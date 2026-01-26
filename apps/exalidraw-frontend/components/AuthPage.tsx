"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ButtonComponent";
import Input from "./InputComponent";

export default function AuthPage({ isSign }: { isSign: boolean }) {
    const route = useRouter()
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-linear-to-br from-cyan-500/10 via-transparent to-cyan-500/10">
      <div className="p-4 m-2 bg-black w-[30vw] h-[36vw] rounded-lg text-white border  border-cyan-400/40 shadow-lg shadow-cyan-400/20 flex flex-col items-center justify-center gap-4 backdrop-blur-xl shadow-blur-multi cursor-pointer" onClick={() => route.push("/")}>
        <div  className="text-4xl font-bold text-cyan-400 mt-4">
            CollabCanvas
        </div>
        <div className="flex flex-col w-[25vw] gap-4 mb-8">
          <div>
            <label>Email</label>
            <Input type="email" placeholder="Enter your email"/>
          </div>
          {isSign ? (
            <div></div>
          ) : (
            <div>
              <label>Name</label>
              <Input type="email" placeholder="Enter your name" />
            </div>
          )}
          <div>
            <label>Password</label>
            <Input type="password" placeholder={`${isSign ? "Enter your password" :"Create your password"}`} />
          </div>
        </div>
        <Button variant="secondary" size="lg" onClick={() => {}}>
          {isSign ?"Signin": "Signup"}
        </Button>
        <div>{`${isSign?"Don't Have an account":"Already have an account"}`} <span onClick={() =>( isSign?  route.push("/signup") :route.push("/signin") )}><a className="text-cyan-400 cursor-pointer">{isSign  ?"signup":"signin"}</a></span></div>
      </div>
    </div>
  );
}
