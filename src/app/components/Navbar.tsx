"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../../components/ui/navbar-menu";
import { cn } from "../../components/lib/utils";
import { useNavbarPeek } from "../../hooks/useNavbarPeek";
import Image from "next/image";
import { Home } from "lucide-react";

export function NavbarHeader() {
  return (
    <div className="relative w-full flex  items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { isExpanded, setNavbarRef } = useNavbarPeek();
  
  return (
    <div
      ref={setNavbarRef}
      className={cn(
        "fixed inset-x-0 bg-gradient-to-b from-very-dark-bg via-dark to-user-bg max-w-4xl mx-auto z-50 mt-0 transition-all border-2 border-slate/30 rounded-b-full duration-700 ease-out transform cursor-pointer backdrop-blur-xl",
        "shadow-2xl shadow-black/60 hover:shadow-3xl hover:shadow-primary-glow/30",
        "glass-dark animated-glow navbar-3d",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary-glow/15 before:via-transparent before:to-primary-glow/15 before:rounded-b-full before:blur-sm",
        "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-primary-glow/60 after:to-transparent",
        isExpanded 
          ? "navbar-expanded top-6 opacity-100 scale-100" 
          : "navbar-peek -top-12 opacity-95 scale-95 shadow-3xl",
        className
      )}
      style={{
        // Always show a peek of the navbar (bottom part visible) with 3D perspective
        transform: isExpanded 
          ? 'translateY(-15%) perspective(1000px) rotateX(0deg)' 
          : 'translateY(-77%) perspective(1000px) rotateX(-8deg)',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* 3D Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-glow/5 via-transparent to-primary-glow/10 rounded-b-full pointer-events-none"></div>
      
      {/* Peek indicator - 3D visual hint when navbar is collapsed */}
      {!isExpanded && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
          <div className="w-12 h-2 bg-gradient-to-r from-transparent via-primary-glow/60 to-transparent rounded-full animate-pulse shadow-lg shadow-primary-glow/30"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-light/40 rounded-full blur-sm"></div>
        </div>
      )}
      
      {/* Inner Container with 3D depth */}
      <div className="relative bg-gradient-to-b from-dark/90 to-very-dark-bg/70 rounded-b-full mx-2 my-1 shadow-inner shadow-black/40 border border-slate/20 hover:border-primary-glow/30 transition-all duration-500">
        <Menu setActive={setActive}>
        {/* Home Link */}
        <MenuItem setActive={setActive} active={active} item="Home">
          <div className="flex flex-col space-y-5 text-sm">
            <HoveredLink href="/">Home Page</HoveredLink>
          </div>
        </MenuItem>

        {/* Pages Menu */}
        <MenuItem setActive={setActive} active={active} item="Pages">
          <div className="flex flex-col space-y-3 text-sm">
            <HoveredLink href="https://collactions.vercel.app">collections website</HoveredLink>
            <HoveredLink href="https://msr-quran-app.vercel.app/">quran website</HoveredLink>
            <HoveredLink href="https://msr-portfolio.vercel.app/">Portfolio</HoveredLink>
            <HoveredLink href="https://github.com/Msr7799/Atlas-AI/tree/main?tab=readme-ov-file#atlas-ai---advanced-ai-assistant">Atlas flutter App</HoveredLink>
            <HoveredLink href="https://msr-quran-data.vercel.app/">quran Data website API</HoveredLink>
            <HoveredLink href="mailto:alromaihi2224@gmail.com">Contact</HoveredLink>
          </div>
        </MenuItem>

        {/* Portfolio Menu */}
        <MenuItem setActive={setActive} active={active} item="Portfolio">
          <div className="text-sm grid grid-cols-2 gap-10 p-4">
            <ProductItem
              title="Photography Portfolio"
              href="/portfolio"
              src="/img/core-img/portfolio-1.jpg"
              description="Explore our stunning photography collection and creative works."
            />
            <ProductItem
              title="Design Portfolio"
              href="/portfolio"
              src="/img/core-img/portfolio-2.jpg"
              description="Creative designs and visual solutions for modern brands."
            />
            <ProductItem
              title="Recent Projects"
              href="/portfolio"
              src="/img/core-img/portfolio-3.jpg"
              description="Latest projects showcasing innovation and creativity."
            />
            <ProductItem
              title="Client Work"
              href="/portfolio"
              src="/img/core-img/portfolio-4.jpg"
              description="Professional work delivered for satisfied clients worldwide."
            />
          </div>
        </MenuItem>

        {/* Services Menu */}
        <MenuItem setActive={setActive} active={active} item="Services">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/v-cloning"> voice cloning & voice changging notebook ipynb </HoveredLink>
            <HoveredLink href="/chat">Design</HoveredLink>
            <HoveredLink href="/services/web-development">Web Development</HoveredLink>
            <HoveredLink href="/services/branding">Branding</HoveredLink>
          </div>
        </MenuItem>

        {/* About & Contact */}
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/about">About me</HoveredLink>
            <HoveredLink href="mailto:alromaihi2224@gmail.com">Contact</HoveredLink>
            <HoveredLink href="/blog">Blog</HoveredLink>
          </div>
        </MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default NavbarHeader;