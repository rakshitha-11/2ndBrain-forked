"use client"
import Image from "next/image";
import Particles from "@/components/ui/particles";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { VelocityScroll } from "@/components/ui/scroll-based-velocity";
import HomePage from "@/components/Home/HomePage";

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [color, setColor] = useState("#ffffff");
 
  useEffect(() => {
    setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
  }, [resolvedTheme]);
  return (
    // <div>
    //   <Particles
    //     className="absolute inset-0"
    //     quantity={100}
    //     ease={80}
    //     color={"black"}
    //     refresh
    //   />
     
    // </div>
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      {/* <div className="h-screen flex justify-center items-center">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Second Brain
      </span>
      </div>
      
       <VelocityScroll
        text="Velocity Scroll"
        default_velocity={5}
        className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
      /> */}
      <HomePage></HomePage>
      {/* <Particles
              className="absolute inset-0"
              quantity={1000}
              ease={80}
              color={color}
              refresh
      /> */}
    </div>
  );
}
