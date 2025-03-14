"use client";

import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { useState, useEffect } from "react";
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

interface iAppProps {
  images: string[];
}

export default function ImageGallery({ images }: iAppProps) {
  const [bigImage, setBigImage] = useState(images[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    // Find index of current big image
    const index = images.findIndex(img => img === bigImage);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [bigImage, images]);

  const handleSmallImageClick = (image: string, index: number) => {
    setBigImage(image);
    setActiveIndex(index);
    setIsZoomed(false);
  };

  const handleNextImage = () => {
    const nextIndex = (activeIndex + 1) % images.length;
    setBigImage(images[nextIndex]);
    setActiveIndex(nextIndex);
    setIsZoomed(false);
  };

  const handlePrevImage = () => {
    const prevIndex = (activeIndex - 1 + images.length) % images.length;
    setBigImage(images[prevIndex]);
    setActiveIndex(prevIndex);
    setIsZoomed(false);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Thumbnail Gallery */}
      <div className="order-last mt-6 flex gap-4 overflow-x-auto lg:order-none lg:mt-0 lg:flex-col lg:overflow-x-visible">
        {images.map((image: string, idx: number) => (
          <div 
            key={idx} 
            className={`overflow-hidden rounded-lg border-2 transition-all duration-300 cursor-pointer flex-shrink-0 w-24 h-24 lg:w-auto lg:h-24 ${
              activeIndex === idx 
                ? "border-indigo-500 shadow-md scale-105" 
                : "border-transparent hover:border-indigo-200"
            }`}
          >
            <Image
              src={urlFor(image).url()}
              alt={`Product thumbnail ${idx + 1}`}
              className="h-full w-full object-cover object-center transition-all duration-300 hover:opacity-90"
              width={120}
              height={120}
              onClick={() => handleSmallImageClick(image, idx)}
            />
          </div>
        ))}
      </div>
      
      {/* Main Image - Significantly taller now */}
      <div className="relative overflow-hidden rounded-lg bg-gray-50 lg:col-span-4 h-96 sm:h-[500px] md:h-[600px] lg:h-[700px]">
        {/* Navigation Arrows */}
        <button 
          onClick={handlePrevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md z-10 transition-all duration-300 opacity-80 hover:opacity-100"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>
        
        <button 
          onClick={handleNextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-md z-10 transition-all duration-300 opacity-80 hover:opacity-100"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>
        
        {/* Zoom Button */}
        <button 
          onClick={toggleZoom}
          className="absolute right-4 bottom-4 bg-white/80 hover:bg-white p-3 rounded-full shadow-md z-10 transition-all duration-300 opacity-80 hover:opacity-100"
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        >
          <ZoomIn className="h-6 w-6 text-gray-700" />
        </button>
        
        {/* Main Image */}
        <div className="h-full w-full overflow-hidden">
          <Image
            src={urlFor(bigImage).url()}
            alt="Product main image"
            width={1200}
            height={1200}
            priority
            className={`h-full w-full object-contain transition-all duration-500 ${
              isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"
            }`}
            onClick={toggleZoom}
          />
        </div>
        
        {/* Sale Tag */}
        <div className="absolute left-0 top-0 z-10">
          <div className="relative">
            <div className="bg-red-500 px-6 py-2 text-sm uppercase tracking-wider text-white font-medium shadow-md">
              Sale
            </div>
            <div className="absolute top-0 -right-5 h-0 w-0 border-l-[20px] border-l-transparent border-t-[36px] border-t-red-500"></div>
          </div>
        </div>
        
        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 bg-black/60 text-white text-sm px-3 py-1.5 rounded-full">
          {activeIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}