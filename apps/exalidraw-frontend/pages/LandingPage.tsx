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
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="max-w-9xl xs:-mt-[30vw] mx-auto sm:-mt-[70vw] md:-mt-[60vw] lg:-mt-[20vw] xl:-mt-[6vw] xl:max-w-7xl">
          <h1 className="xs:text-3xl font-semibold text-black text-shadow-lg sm:text-[44px] sm:leading-11 xl:text-8xl xl:leading-25 dark:text-white">
            <span className="xs:ml-7 sm:ml-2">
              Collaborate. Draw. <br />{" "}
            </span>
            <span className="flex flex-col items-center justify-center font-bold text-cyan-500 text-shadow-lg">
              Create Together.
            </span>
          </h1>
          <div className="xs:mt-2 flex items-center justify-center sm:mt-1 xl:mt-8">
            <h4 className="xs:text-[9px] flex flex-col items-center justify-center text-neutral-800 sm:text-[10px] xl:text-2xl dark:text-neutral-400">
              <span className="flex items-center justify-center">
                A modern collaborative drawing platform that brings your team
                together.{" "}
              </span>
              <span>
                Sketch ideas, create diagrams, and visualize concepts in
                real-time.
              </span>
            </h4>
          </div>
        </div>
        <div className="xs:-mt-6 sm:-mt-5 md:mt-4 lg:mt-6 xl:mt-0">
          {isLoggedIn ? (
            <Button
              variant="secondary"
              size="lg"
              className="xl:mt-5"
              children={"Create or Join room"}
              onClick={() => route.push("/rooms")}
            />
          ) : (
            <Button
              variant="secondary"
              size="lg"
              className="mt-18 lg:mt-5"
              onClick={() => route.push("/signup")}
            >
              Get Started
            </Button>
          )}
        </div>
      </div>
      <section className="xs:mb-20 xs:-mt-[40vw] sm:-mt-[70vw] sm:mb-10 md:-mt-[60vw] lg:-mt-[30vw] xl:-mt-30">
        <div className="container mx-auto sm:px-5">
          <div className="mx-auto sm:max-w-6xl">
            <div className="shadow-blur shadow-blur-multi relative overflow-hidden rounded-2xl border border-neutral-600 bg-neutral-100 p-8 backdrop-blur-xl dark:border-cyan-400/40 dark:bg-neutral-800">
              <div className="text-center sm:mb-12">
                <h2 className="xs:text-xl font-bold text-black sm:text-2xl md:text-3xl xl:text-4xl dark:text-white">
                  Everything you need to create
                </h2>
                <p className="text-muted-foreground xs:text-xs xs:mb-4 mx-auto mt-4 max-w-2xl text-cyan-400 sm:text-sm md:text-lg xl:text-2xl">
                  Powerful features designed for teams who want to collaborate
                  visually.
                </p>
              </div>
              <div className="xs:gap-2 flex flex-wrap sm:gap-4 md:items-center md:justify-center">
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
      <footer className="xs:my-2 xs:py-6 border-t border-neutral-500 sm:py-8 md:py-8 xl:mb-8 dark:border-cyan-400/40">
        <div className="container mx-auto xl:px-2">
          <div className="xs:gap-2 flex flex-col items-center justify-between sm:gap-2 md:flex-row md:gap-3 xl:flex-row xl:gap-4">
            <div className="flex items-center gap-2">
              <span className="xs:text-sm xs:font-medium font-medium text-neutral-800 sm:text-xl md:text-xl xl:text-3xl dark:text-white">
                CollabCanvas
              </span>
            </div>
            <nav className="text-muted-foreground xs:text-xs xs:font-light xs:gap-2 flex items-center sm:gap-6 sm:text-xs md:text-[12px] xl:text-lg">
              <a
                href="#"
                className="hover:text-foreground text-neutral-600 transition-colors dark:text-white"
              >
                Privacy
              </a>
              <a
                href="#"
                className="hover:text-foreground text-neutral-600 transition-colors dark:text-white"
              >
                Terms
              </a>
              <a
                href="#"
                className="hover:text-foreground text-neutral-600 transition-colors dark:text-white"
              >
                Contact
              </a>
            </nav>
            <div className="flex items-center justify-center gap-4">
              <span className="xs:text-sm xs:font-medium md:text-lxg font-medium text-neutral-800 sm:text-xl xl:text-3xl dark:text-white">
                2026
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
