"use client";
import { Button } from "@/components/ButtonComponent";
import { Card } from "@/components/CardComponent";
import NavBar from "@/components/NavBar";
import { Download, Palette, Shapes, User, ZoomIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  const route = useRouter();
  const features = [
    {
      icon: <User />,
      title: "Real-time Collaboration",
      description:
        "Work together with your team in real-time. See changes instantly as they happen.",
    },
    {
      icon: <Shapes />,
      title: "Different shape and Tool",
      description: "Can use different shapes and tools.",
    },

    {
      icon: <Palette />,
      title: "Modern Minimal UI",
      description:
        "Beautiful interface with light & dark themes for distraction-free work.",
    },
    {
      icon: <Download />,
      title: "Export Options",
      description:
        "Export your work in multiple formats including PNG, SVG, and PDF.",
    },
  ];
  return (
    <main>
      <div>
        <NavBar />
      </div>
      <div className="min-h-screen flex flex-col items-center justify-center ">
        <div className="max-w-7xl mx-auto -mt-26 ">
          <h1 className="text-8xl dark:text-white text-black  font-bold text-shadow-lg">
            Collaborate. Draw. <br />{" "}
            <span className="flex flex-col items-center justify-center text-cyan-500 font-bold text-shadow-lg">
              Create Together.
            </span>
          </h1>
          <div className="flex items-center justify-center mt-5">
            <h4 className="dark:text-neutral-400 text-neutral-800 flex flex-col items-center justify-center text-xl">
              A modern collaborative drawing platform that brings your team
              together. <br />{" "}
              <span>
                {" "}
                Sketch ideas, create diagrams, and visualize concepts in
                real-time.{" "}
              </span>
            </h4>
          </div>
        </div>
        <div>
          {isLoggedIn ? (
            <Button variant="secondary" size="lg" className="mt-5" children={"Create or Join room"} onClick={()=> route.push("/rooms")}/>
          ) : (
            <Button
              variant="secondary"
              size="lg"
              className="mt-5"
              onClick={() => route.push("/signup")}
            >
              Get Started
            </Button>
          )}
        </div>
      </div>
      <section className="-mt-64 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto ">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-600 dark:border-cyan-400/40 shadow-blur dark:bg-neutral-800 bg-neutral-100  shadow-blur-multi backdrop-blur-xl p-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl dark:text-white text-black font-bold">
                  Everything you need to create
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-cyan-400">
                  Powerful features designed for teams who want to collaborate
                  visually.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                {features.map((data, index) => (
                  <Card
                    key={index}
                    title={data.title}
                    description={data.description}
                    icon={data.icon}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="border-t dark:border-cyan-400/40 border-neutral-500 py-8 mb-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium text-2xl dark:text-white text-neutral-800">
                CollabCanvas
              </span>
            </div>
            <nav className="flex items-center gap-6 text-sm text-muted-foreground">
              <a
                href="#"
                className="hover:text-foreground transition-colors dark:text-white text-neutral-600 "
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-foreground transition-colors dark:text-white text-neutral-600 "
              >
                Terms
              </a>
              <a
                href="#"
                className="hover:text-foreground transition-colors dark:text-white text-neutral-600 "
              >
                Contact
              </a>
            </nav>
            <div className="flex items-center gap-4">
              <span className=" text-muted-foreground dark:text-white text-neutral-800   text-2xl">
                2026 CollabCanvas
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
