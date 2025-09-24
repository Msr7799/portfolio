"use client";
import Image from "next/image";
import { title } from "process";

interface SocialSidebarProps {
  onMessageClick: () => void;
}

export default function SocialSidebar({ onMessageClick }: SocialSidebarProps) {
  return (
    <div className="fixed right-0 top-190 transform -translate-y-1/2 bg-white shadow-lg z-40 w-16 hover:w-48 transition-all duration-300 group">
      {/* Social Links */}
      <div className="social-info-area p-2">
        <a
          href="#"
          className="flex items-center py-2 px-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 border-b border-gray-100"
          data-tooltip="Facebook"
          title="Facebook"
        >
          <i className="fa fa-facebook text-lg min-w-[20px] text-center"></i>
          <span className="text-sm font-medium ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Facebook
          </span>
        </a>
        
        <a
          href="#"
          className="flex items-center py-2 px-2 text-gray-700 hover:text-blue-400 hover:bg-blue-50 transition-all duration-300 border-b border-gray-100"
          data-tooltip="Twitter"
          title="Twitter"
        >
          <i className="fa fa-twitter text-lg min-w-[20px] text-center"></i>
          <span className="text-sm text-foreground/90 bg-muted/40font-medium ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Twitter
          </span>
        </a>
        
        <a
          href="#"
          className="flex items-center py-2 px-2 text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300 border-b border-gray-100"
          data-tooltip="Pinterest"
          title="Pinterest"
        >
          <i className="fa fa-pinterest text-lg min-w-[20px] text-center"></i>
          <span className="text-sm text-foreground/90 bg-muted/40 font-medium ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Pinterest
          </span>
        </a>
        
        <a
          href="#"
          className="flex items-center py-2 px-2 text-gray-700 hover:text-blue-500 hover:bg-blue-50 transition-all duration-300 border-b border-gray-100"
          data-tooltip="Behance"
          title="Behance"
        >
          <i className="fa fa-behance text-lg min-w-[20px] text-center"></i>
          <span className="text-sm text-foreground/90 font-medium ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Behance
          </span>
        </a>
      </div>
      
      {/* Message Box */}
      <div className="message-box border-t border-gray-200 p-2">
        <button
          onClick={onMessageClick}
          className="w-full flex items-center py-2 px-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
          aria-label="Open contact form"
        >
          <Image 
            src="/img/core-img/envelope.png" 
            alt="Contact"
            width={20}
            height={20}
            className="min-w-[20px] transition-transform duration-300"
          />
          <span className="text-sm font-medium ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Contact
          </span>
        </button>
      </div>
    </div>
  );
}
