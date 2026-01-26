import LandingPage from "@/pages/LandingPage";
import { cn } from "@/lib/utils"; 

export default function Home() {
  return (
    <div 
      className="min-h-screen w-screen bg-black p-2"
      style={{
        backgroundImage: "radial-gradient(#111111 0.8px, transparent 1px)",
        backgroundSize: "10px 10px"
      }}
    >
      <LandingPage />
    </div>
  );
}