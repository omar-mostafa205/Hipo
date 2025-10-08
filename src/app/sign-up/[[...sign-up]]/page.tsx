"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex bg-[#F3F4F6]">
      {/* Left Side - Clerk SignUp Form */}
      <div className="w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 flex justify-center items-center flex-col">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-primary mb-2">
                Welcome to Hipo
              </h1>
              <p className="text-gray-600">Create your account to get started</p>
            </div>
                <SignUp /> 
          </div>
        </div>
      </div>

      {/* Right Side - Image with Background */}
      <div className="w-1/2 flex items-center justify-center relative overflow-hidden">
        <div className="relative flex h-full w-full items-center justify-center bg-white">
          {/* Dot Pattern Background */}
          <div
            className={cn(
              "absolute inset-0",
              "[background-size:24px_24px]",
              "[background-image:radial-gradient(#e5e7eb_1.5px,transparent_1.5px)]",
              "opacity-50"
            )}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A]/10 via-[#3B82F6]/10 to-[#10B981]/10" />

          {/* Main Image */}
          <div className="relative z-10 flex items-center justify-center">
            <div className="relative group">
              <Image
                src="/hipo-secure.png"
                alt="Codelet Security Shield"
                width={400}
                height={400}
                className="rounded-2xl shadow-2xl object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />

              {/* Floating Accent Elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-[#3B82F6] rounded-full opacity-20 animate-pulse" />
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-[#10B981] rounded-full opacity-15 animate-pulse delay-1000" />
            </div>
          </div>

          {/* Bottom text overlay */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center z-20">
            <h2 className="text-xl font-semibold text-[#1E3A8A] mb-2">
              Secure & Trusted
            </h2>
            <p className="text-gray-600 text-sm max-w-xs">
              Your  data is protected with enterprise-grade security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
