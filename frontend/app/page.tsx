"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Header from "@/components/Header";
import ParallaxImage from "@/components/ParallaxImage";
import { MainInfo } from "@/components/MainInfo";
import Features from "@/components/Features";
import Reasons from "@/components/Reasons";
import InfoBlock from "@/components/InfoBlock";
import Testimonials from "@/components/Testimonials/Testimonials";
import Subscription from "@/components/Subscription";
import Footer from "@/components/Footer";
const CARD_W = 340; // ← за потреби зменш
const CARD_H = CARD_W * 0.6225; // 16:9

export default function Home() {
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const [canShowMainContent, setCanShowMainContent] = useState(false);

  return (
    <>
      <motion.div
        className="relative min-h-screen w-full overflow-hidden "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <main className=" flex  flex-col ">
          <motion.div
            initial={{ opacity: 0, y: 500 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <ParallaxImage />
          </motion.div>

          <MainInfo />

          <Features />
          <div className="hr_s" />
          <Reasons />
          <div className="hr_s" />
          <InfoBlock />
          <div className="hr_s" />
          <Testimonials />
          <Subscription />
        </main>
      </motion.div>
    </>
  );
}
