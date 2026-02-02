import { ReactNode } from "react";

export function IconButton({
    icon,
    activated,
    onClick
}:{
    icon:ReactNode,
    activated?:boolean,
    onClick:()=>void
}){
    return <div className={`pointer rounded-md border-2 border-white p-2 bg-neutral-700 hover:bg-neutral-500 ${activated ? "text-green-600" : "text-white"}`} onClick={onClick}>
        {icon}
    </div>
}