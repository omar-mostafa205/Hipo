"use client"
import React from "react";
import { AuroraBackground } from "../components/aurora-background";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import {  ArrowRight } from "lucide-react";
export const Hero = () =>  {

return(
<AuroraBackground>
  <motion.div
    initial={{ opacity: 0.0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{
      delay: 0.3,
      duration: 0.8,
      ease: "easeInOut",
    }}
    className="relative flex flex-col items-center justify-center px-4 py-20 min-h-screen mx-auto max-w-7xl "
  >
    {/* Main Heading */}
    <div className="text-6xl md:text-8xl font-bold dark:text-white text-center max-w-5xl mb-8">
      Your Market place for{" "}
      <span className="text-[#8445d5]">
        <span className="text-black mr-1.5">high</span>
        Modern Fashion
      </span>
    </div>
    
    {/* Subtitle */}
    <div className="mb-12">
      <p className="text-center text-lg text-foreground-muted max-w-3xl leading-relaxed"> 
      Elevating your style with high-quality, trend-forward essentials.            </p>
    </div>
    
    {/* Action Buttons */}
    <div className="flex flex-col sm:flex-row gap-4">
      <Button className="bg-primary" size="lg">
        Browse Trends
      </Button>
      <Button variant="ghost" size="lg">
        Browse Collections <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  </motion.div>
</AuroraBackground>
)}