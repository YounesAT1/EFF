"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { useRouter } from "next/router";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
