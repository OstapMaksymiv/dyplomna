"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

const ArrowIcon = (props: React.ComponentProps<"svg">) => (
  <FaArrowRight {...props} />
);
// 👉 Зображення для каруселі
const images = [
  {
    id: 1,
    src: "/spend_copy.jpg",
    title: "Track Your Spending",
    desc: "No more leaks.",
  },
  {
    id: 2,
    src: "/atm_copy.jpg",
    title: "Plan Smartly",
    desc: "Stay in control.",
  },
  {
    id: 3,
    src: "/notes_copy.jpg",
    title: "Visualize Your Budget",
    desc: "See the full picture.",
  },
];

const slideDuration = 4_000; // ⏱️ мс на кожен слайд

export default function MotionImageCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax рух
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  // 🚚 Parallax, реагує на рух миші
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const moveX = ((offsetX - centerX) / centerX) * 20; // max ±20px
    const moveY = ((offsetY - centerY) / centerY) * 20;

    x.set(moveX);
    y.set(moveY);
  };

  // 🔁 Автоматична зміна слайдів
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, slideDuration);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex]);

  // 🎭 Варіанти анімації для плавного fade‑in / fade‑out
  const variants = {
    enter: { opacity: 0, scale: 1.02 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  } as const;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative  aspect-[16/9] overflow-hidden rounded-3xl shadow-2xl mx-auto flex mt-5 bg-black "
      style={{ userSelect: "none" }}
    >
      {/* 🎞️ Карусель із плавним переходом */}
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={images[currentIndex].id}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ x, y }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].src}
            alt={`slide-${images[currentIndex].id}`}
            fill
            className="object-cover scale-105 rounded-3xl"
            style={{
              imageRendering: "pixelated",
            }}
            priority
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={images[currentIndex].id}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ x, y }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex].src}
            alt={`slide-${images[currentIndex].id}`}
            fill
            className="object-cover scale-105 rounded-3xl"
            priority
          />
        </motion.div>

        <motion.div
          key={"text-" + images[currentIndex].id} // унікальний ключ для тексту
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute top-95 right-10 -translate-y-1/2 text-white  text-right"
        >
          <h2 className="text-5xl font-semibold drop-shadow-md ">
            {images[currentIndex].title}
          </h2>
          <Link
            href={"/"}
            className="relative inline-flex items-center group text-lg"
          >
            <span
              className="
          absolute 
          bottom-0 
          left-0 
          h-[2px] 
          bg-white
          w-0 
          transition-[width] 
          duration-300 
          group-hover:w-full
        "
              aria-hidden="true"
            />
            <span className="transition-transform duration-300 group-hover:-translate-x-2 mt-2">
              {images[currentIndex].desc}
            </span>
            <ArrowIcon
              className="ml-2 opacity-0 transition-opacity group-hover:opacity-100"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-1/2 right-4 flex flex-col -translate-y-1/2 space-y-3 pr-2 ">
        {images.map((img, idx) => (
          <button
            key={img.id}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              idx === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
            aria-label={`Перейти до слайду ${idx + 1}`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </section>
  );
}
