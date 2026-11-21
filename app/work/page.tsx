import type { Metadata } from "next";
import { ProjectDirectory } from "@/components/sections/work";

export const metadata: Metadata = {
  title: "All projects",
  description:
    "Explore DevsDen Tech’s portfolio of web platforms, mobile apps and storefronts.",
};

export default function WorkIndex() {
  return <ProjectDirectory />;
}
