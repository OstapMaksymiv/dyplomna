import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
const ArrowIcon = (props: React.ComponentProps<"svg">) => (
  <FaArrowRight {...props} />
);
const InfoBlock = () => {
  return (
    <section className="pt-40 pb-27 text_change flex flex-row justify-around">
      <div className="max-w-[552px]">
        <h2 className="text-5xl font-semibold">
          Built for those who value confidence.
        </h2>
        <p
          className="max-w-[368px] pt-23 pb-6 text-lg font-semibold"
          style={{ color: "rgba(19,16,20,0.4)" }}
        >
          We believe trust is earned through consistency, not promises. That’s
          why everything we create is made to last — solid foundations, clear
          systems, and results you can rely on.
        </p>
        <Link href="/" className="relative inline-flex items-center group">
          <span
            className="transition-transform duration-500 text-lg font-semibold group-hover:-translate-x-2 mt-2"
            style={{
              textDecoration: "underline",
              textDecorationThickness: "2px",
              textDecorationColor: "black",
              textUnderlineOffset: "4px",
            }}
          >
            The studio
          </span>
          <ArrowIcon className="ml-2 mt-3" aria-hidden="true" />
        </Link>
      </div>
      <Image
        src="/rel.webp"
        alt="info img"
        className="rounded-3xl object-cover h-[700px] "
        width={647}
        height={700}
        quality={95}
        priority
      />
    </section>
  );
};

export default InfoBlock;
