  import { ReactNode } from "react";

  export function Card({
    icon,
    className,
    title,
    description,
  }: {
    icon: ReactNode;
    className?: string;
    title: string;
    description: string;
  }) {
    return (
      <>
        <div className="min-w-90 h-40 flex-1 shadow-xl/5 shadow-neutral-200 border border-white/30 hover:border-white/50 rounded-2xl p-4 hover:bg-neutral-50/10 inset
        ">
          <div className="text-white border rounded-full w-fit p-2 mb-2">{icon}</div>
          <div>
            <h2 className="text-2xl font-medium text-white m-1">{title}</h2>
          </div>
          <div>
            <h3 className="text-cyan-400 text-sm ">{description}</h3>
          </div>
        </div>
      </>
    );
  }

