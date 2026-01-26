interface Input{
    type:string;
    placeholder:string;
}

export default function Input({type,placeholder}:Input) {
    return <input type={type} placeholder={placeholder} className="py-2 rounded-lg border border-white w-full p-2 hover:border-cyan-400/60"  /> 
}