import { ArrowRight } from "lucide-react";
import React from "react";

const Subscription = () => {
  return (
    <section className="flex flex-col gap-8 text_change items-center py-40">
      <div className="flex flex-col gap-6 text-center items-center">
        <h4 className="text-5xl font-semibold">Keep your eyes on us</h4>
        <p className="text-lg font-semibold max-w-[415px]">
          Sign up to have access to new drops in advance and get special
          discounts for the launch.
        </p>
      </div>
      <form className=" flex w-full items-center justify-around max-w-md overflow-hidden rounded-full bg-[#e5dfe6] shadow-[0px_10px_25px_rgba(19,16,20,0.5)] focus-within:shadow-none transition-shadow duration-500">
        <input
          type="email"
          placeholder="Your email"
          className="flex-1 px-5  py-4 bg-transparent text-black placeholder-gray-600 outline-none "
        />
        <button
          type="submit"
          className="bg-black mr-2 text-white p-3 h-fit rounded-full group cursor-pointer"
        >
          <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
        </button>
      </form>
    </section>
  );
};

export default Subscription;
