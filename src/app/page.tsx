"use client";
import { useState } from "react";
import Image from "next/image";
import NavbarHeader from "./components/Navbar";
import WelcomeSlider from "./components/WelcomeSlider";
import SocialSidebar from "./components/SocialSidebar";
import ContactModal from "./components/ContactModal";
import Preloader from "./components/Preloader";
import SafeScripts from "../components/SafeScripts";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);

  return (
    <>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}
      
      {/* Logo on the far left */}
      <div className="fixed -mt-15 left-8 z-40 animate-fadeIn">
        <Image
          src="/img/bg-img/Portfoloi.gif"
          alt="Portfolio Logo"
          width={32}
          height={110}
          className=" hover:scale-105  duration-300 cursor-pointer"
          priority
        />
      </div>

      {/* Gradient Background Overlay */}
      <NavbarHeader />
      <div className="gradient-background-overlay"> </div>
      
      <SocialSidebar onMessageClick={() => setIsModalOpen(true)} />
      <WelcomeSlider />
      
      {isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} />}
      
      <footer className="text-center py-4 text-md text-gray-600">
        <p>
          Copyright &copy;{new Date().getFullYear()} All rights reserved | This template is made with{" "}
          <i className="fa fa-heart-o" aria-hidden="true"></i> by{" "}
          <a href="https://colorlib.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Colorlib
          </a>
        </p>
      </footer>
      
      <SafeScripts />
    </>
  );
}
