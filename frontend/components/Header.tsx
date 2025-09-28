"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  // 👇 Слідкуємо за прокруткою
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // після 50px зменшуємо шрифт
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className=" transform -translate-y-12  fixed z-20  w-full max-w-[1900px]  pr-24 transition-all duration-300 mix-blend-difference "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex flex-row justify-between items-center ">
        <Link href="/">
          <div className="relative">
            <p
              className={clsx(
                "font-bold  transition-all duration-300 ",
                scrolled ? "text-3xl " : "text-5xl"
              )}
            >
              Budgix
              <span
                className={clsx(
                  "absolute translate-x-1 transform transition-all duration-300 ",
                  scrolled ? "translate-y-4 text-lg " : "translate-y-6 text-2xl"
                )}
              >
                ®
              </span>
            </p>
          </div>
        </Link>

        <nav className="flex items-center justify-center flex-row gap-6 font-bold ">
          <Link href="/projects" className="relative group">
            <span className="transition-all duration-300 group-hover:opacity-80">
              Our pieces
            </span>
            <span
              className="
                absolute 
                bottom-0 
                left-0 
                h-[2px] 
                w-0 
                bg-white 
                transition-all 
                duration-300 
                group-hover:w-full
              "
              aria-hidden="true"
            />
          </Link>
          <Link href="/projects" className="relative group">
            <span className="transition-all duration-300 group-hover:opacity-80">
              The studio
            </span>
            <span
              className="
                absolute 
                bottom-0 
                left-0 
                h-[2px] 
                w-0 
                bg-white 
                transition-all 
                duration-300 
                group-hover:w-full
              "
              aria-hidden="true"
            />
          </Link>
          <Link href="/projects" className="relative group">
            <span className="transition-all duration-300 group-hover:opacity-80">
              Get in touch
            </span>
            <span
              className="
                absolute 
                bottom-0 
                left-0 
                h-[2px] 
                w-0 
                bg-white 
                transition-all 
                duration-300 
                group-hover:w-full
              "
              aria-hidden="true"
            />
          </Link>
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;
