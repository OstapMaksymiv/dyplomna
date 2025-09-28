import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-12 pt-20  text_change">
      <h4 className=" text-[250px] font-bold relative leading-[220px]">
        Budgix
        <span className="absolute  transform text-6xl -bottom-1">®</span>
      </h4>
      <div className="flex flex-row justify-between text-base font-bold">
        <div className="flex flex-row gap-4 ">
          <Link href="/" className="relative group">
            <span className="transition-all duration-300 group-hover:opacity-80">
              Instagram
            </span>
            <span
              className="
                absolute 
                bottom-0 
                left-0 
                h-[2px] 
                mix-blend-difference
                w-0 
                bg-white 
                transition-all 
                duration-300 
                group-hover:w-full
              "
              aria-hidden="true"
            />
          </Link>
          <Link href="/" className="relative group">
            <span className="transition-all duration-300 group-hover:opacity-80">
              Linkedin
            </span>
            <span
              className="
                absolute 
                bottom-0 
                left-0 
                mix-blend-difference
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
          <Link href="/" className="relative group">
            <span className="transition-all duration-300 group-hover:opacity-80">
              Twitter
            </span>
            <span
              className="
                absolute 
                bottom-0 
                left-0 
                h-[2px] 
                mix-blend-difference
                w-0 
                bg-white 
                transition-all 
                duration-300 
                group-hover:w-full
              "
              aria-hidden="true"
            />
          </Link>
        </div>
        <span>budgix@gmail.com</span>
      </div>
    </footer>
  );
};

export default Footer;
