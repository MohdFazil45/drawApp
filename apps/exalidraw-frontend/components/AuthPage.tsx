"use client"
export default function AuthPage({isSign}:{
    isSign:boolean
}){
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="p-2 m-2 bg-white rounded">
                <input type="text" placeholder="Email" />
                <input type="password"  placeholder="Password"/>

                <button onClick={()=>{}}>{isSign ? "SignIn" :"SignUp"}</button>
            </div>
        </div>
    )
}