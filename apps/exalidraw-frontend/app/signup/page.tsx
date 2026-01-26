import AuthPage from "@/components/AuthPage";

export default function Signin() {
  return (
    <div className="overflow-hidden">
      <div
        className="h-screen w-screen bg-black "
        style={{
          backgroundImage: "radial-gradient(#111111 0.8px, transparent 1px)",
          backgroundSize: "10px 10px",
        }}
      >
        <AuthPage isSign={false} />
      </div>
    </div>
  );
}
