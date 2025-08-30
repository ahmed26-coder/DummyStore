"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";
import Image from "next/image";

function HeroSlider() {
  return (
    <div className="hero w-full h-fit bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-10">
      <div className="container mx-auto px-4">
        <Swiper
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          className="rounded-2xl overflow-hidden shadow-xl"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-md p-6 md:p-12">
              {/* Text */}
              <div className="max-w-lg text-white">
                <h4 className="text-lg font-light opacity-80">Introducing the new</h4>
                <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                  Microsoft Xbox <br /> 360 Controller
                </h3>
                <p className="text-lg opacity-90 mb-6">
                  Windows Xp/10/7/8 Ps3, Tv Box
                </p>
                <Link
                  href="/"
                  className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition-transform transform hover:-translate-y-1"
                >
                  Shop Now
                </Link>
              </div>
              {/* Image */}
              <div className="mt-6 md:mt-0 flex-1 flex justify-center">
                <Image
                  src="/banner_Hero1.png"
                  alt="slider hero 1"
                  width={900}
                  height={600}
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-md p-6 md:p-12">
              <div className="max-w-lg text-white">
                <h4 className="text-lg font-light opacity-80">Introducing the new</h4>
                <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                  Microsoft Xbox <br /> 360 Controller
                </h3>
                <p className="text-lg opacity-90 mb-6">
                  Windows Xp/10/7/8 Ps3, Tv Box
                </p>
                <Link
                  href="/"
                  className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition-transform transform hover:-translate-y-1"
                >
                  Shop Now
                </Link>
              </div>
              <div className="mt-6 md:mt-0 flex-1 flex justify-center">
                <Image
                  src="/banner_Hero2.png"
                  alt="slider hero 2"
                  width={900}
                  height={600}
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="flex flex-col md:flex-row items-center justify-between bg-white/10 backdrop-blur-md p-6 md:p-12">
              <div className="max-w-lg text-white">
                <h4 className="text-lg font-light opacity-80">Introducing the new</h4>
                <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                  Microsoft Xbox <br /> 360 Controller
                </h3>
                <p className="text-lg opacity-90 mb-6">
                  Windows Xp/10/7/8 Ps3, Tv Box
                </p>
                <Link
                  href="/"
                  className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition-transform transform hover:-translate-y-1"
                >
                  Shop Now
                </Link>
              </div>
              <div className="mt-6 md:mt-0 flex-1 flex justify-center">
                <Image
                  src="/banner_Hero3.png"
                  alt="slider hero 3"
                  width={900}
                  height={600}
                  priority
                  className="object-contain"
                />
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Swiper Pagination Custom Style */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.6);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #ffffff;
          transform: scale(1.2);
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
        }
      `}</style>
    </div>
  );
}

export default HeroSlider;
