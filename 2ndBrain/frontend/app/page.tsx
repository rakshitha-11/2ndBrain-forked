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
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <HomePage></HomePage>
    </div>
  );
}
