import React from "react";
import { serviceTiles } from "../constants/index";
import Image from "next/image";
const Reasons = () => {
  return (
    <section className="pt-40 pb-27  flex flex-col items-center gap-12 w-full">
      <div className="flex flex-col gap-6 max-w-lg text-center text_change">
        <h2 className="text-5xl font-semibold">
          Trusted by thousands for a reason
        </h2>
        <p
          className="text-lg font-semibold"
          style={{ color: "rgba(19,16,20,0.4)" }}
        >
          Our commitment has earned the trust of thousands of customers around
          the world.
        </p>
      </div>
      <div className="grid grid-rows-1 grid-cols-[repeat(4,350px)] gap-12">
        {serviceTiles.map(({ title, description, icon }) => (
          <div
            key={title}
            className="flex flex-col pt-6 pl-6 pr-6 pb-13 rounded-3xl items-center  border-white border-solid border-1  bg-[#212121]"
          >
            <Image
              src={icon}
              alt={`${icon}`}
              width={48}
              height={48}
              className="h-12 w-12 mx-auto invert"
            />
            <h3 className="text-center font-semibold pt-6">{title}</h3>
            <p className="text-center text-sm text-muted-foreground pt-3  max-w-54">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reasons;
