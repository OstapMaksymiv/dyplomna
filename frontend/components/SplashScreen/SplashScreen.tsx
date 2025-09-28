"use client";
import { rawImages } from "@/constants";
import { Instrument_Serif } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
// import Swiper from "swiper";
import "./splashScreen.css";
import { Autoplay } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import { AnimatePresence, motion } from "framer-motion";
const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"],
  style: ["italic"],
});
const SplashScreen = () => {
  const [images, setImages] = useState(rawImages);

  return (
    <body>
      <motion.div
        className="bg-[#0a0a0a] absolute min-h-screen w-full overflow-hidden  flex items-center  flex-col z-50  left-0 top-0"
        initial={{ opacity: 0 }}
        transition={{ delay: 1, duration: 1, ease: "easeOut" }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8 } }}
      >
        <div className="min-h-[60vh] flex justify-center items-center">
          <h1 className=" text-[100px] font-bold ">
            Budgix{" "}
            <span
              className={`${instrumentSerif.className} font-light text-[60px] uppercase italic`}
            >
              studio
            </span>
          </h1>
        </div>
        <div className="flex items-center justify-end w-full gap-2.5 absolute bottom-[-300px] right-[-380px]">
          <div
            className="z-10"
            style={{
              transform: "perspective(1200px) rotateX(20deg) rotateY(20deg) ",
            }}
          >
            <div className="flex items-center w-full  relative">
              <div className="h-[640px] w-full relative">
                <div className="flex w-full h-full items-center">
                  <div className="flex flex-row  w-full h-full relative">
                    <Swiper
                      spaceBetween={50}
                      slidesPerView="auto"
                      loop={true}
                      autoplay={{
                        delay: 0,
                        disableOnInteraction: false,
                      }}
                      allowTouchMove={false}
                      keyboard={{ enabled: false }}
                      speed={10000}
                      pagination={false}
                      navigation={false}
                      modules={[Autoplay]}
                      className="swiperADW w-[2300px]"
                    >
                      {images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <Image
                            alt={image.src}
                            src={image.src}
                            width={500}
                            height={700}
                            quality={95}
                            priority
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </body>
  );
};

export default SplashScreen;
