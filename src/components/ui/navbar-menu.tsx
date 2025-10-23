"use client";
import React from "react";
import { motion } from "motion/react";
 
 
 
const transition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};
 
export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  return (
    <div onMouseEnter={() => setActive(item)} className="relative ">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-light text-lg font-semibold tracking-wide px-4 py-2 rounded-lg hover:bg-primary-glow/20 hover:scale-105 hover:text-white transition-all duration-300 ease-in-out backdrop-blur-sm border border-transparent hover:border-primary-glow/30 hover:shadow-lg hover:shadow-primary-glow/20"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-primary/90 backdrop-blur-md rounded-2xl overflow-hidden border border-primary-glow/40 shadow-2xl shadow-primary-glow/30 z-50"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
 
export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)} // resets the state
      className="relative rounded-b-full border border-primary-glow/30 bg-primary-glow/60 backdrop-blur-md shadow-lg shadow-primary-glow/20 flex justify-center space-x-6 px-8 py-4 overflow-visible"
    >
      {children}
    </nav>
  );
};
 
export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <a href={href} className="flex space-x-3 p-3 rounded-xl hover:bg-primary-glow/20 transition-all duration-300 hover:scale-105 group">
      <img
        src={src}
        width={140}
        height={70}
        alt={title}
        className="shrink-0 rounded-lg shadow-lg border border-primary-glow/20 group-hover:shadow-xl group-hover:border-primary-glow/40 transition-all duration-300"
      />
      <div className="flex flex-col justify-center">
        <h4 className="text-lg font-bold mb-2 text-white group-hover:text-light transition-colors duration-300">
          {title}
        </h4>
        <p className="text-sm max-w-[10rem] text-light/80 group-hover:text-light transition-colors duration-300 leading-relaxed">
          {description}
        </p>
      </div>
    </a>
  );
};
 
export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <a
      {...rest}
      className="text-light/70 hover:text-white font-medium transition-all duration-300 hover:scale-105 px-2 py-1 rounded-md hover:bg-primary-glow/20"
    >
      {children}
    </a>
  );
};