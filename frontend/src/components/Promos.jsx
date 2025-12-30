import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Promos() {
  const slides = [
    {
      title: "Summer styles are finally here",
      subtitle: "This year, our new summer collection will shelter you from the harsh elements.",
      img: "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg",
      bgColor: "bg-white"
    },
    {
      title: "New Arrivals: Tech & Gadgets",
      subtitle: "Upgrade your lifestyle with the latest electronics and smart home accessories.",
      img: "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg",
      bgColor: "bg-indigo-50"
    },
    {
      title: "Home Decor Essentials",
      subtitle: "Transform your living space with our curated furniture and lighting collection.",
      img: "https://tailwindcss.com/plus-assets/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg",
      bgColor: "bg-gray-50"
    }
  ];

  return (
    <div className="relative w-full">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper min-h-[70vh] lg:min-h-[85vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={`relative overflow-hidden ${slide.bgColor} min-h-[70vh] lg:min-h-[85vh] flex items-center`}>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
                <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
                  
                  {/* Left Content */}
                  <div className="z-10 text-center lg:text-left lg:max-w-xl">
                    <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
                      {slide.title}
                    </h1>
                    <p className="mt-6 text-xl text-gray-500">
                      {slide.subtitle}
                    </p>
                    <div className="mt-10">
                      <a href="#" className="inline-block rounded-md border border-transparent bg-indigo-600 px-10 py-4 text-center font-medium text-white hover:bg-indigo-700 text-lg transition-all">
                        Shop Collection
                      </a>
                    </div>
                  </div>

                  {/* Right Image (The "Hero" Image) */}
                  <div className="relative shrink-0 w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <div className="h-[400px] w-[300px] lg:h-[600px] lg:w-[450px] overflow-hidden rounded-2xl shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                      <img
                        src={slide.img}
                        alt={slide.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {/* Decorative Background Blob */}
                    <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-72 w-72 bg-indigo-200 rounded-full blur-3xl opacity-50"></div>
                  </div>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style dangerouslySetInnerHTML={{ __html: `
  .swiper-button-next, .swiper-button-prev {
    color: #4f46e5 !important;
    background: white;
    width: 50px !important;
    height: 50px !important;
    border-radius: 50%;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }
  .swiper-button-next:after, .swiper-button-prev:after {
    font-size: 20px !important;
    font-weight: bold;
  }
  .swiper-pagination-bullet-active {
    background: #4f46e5 !important;
  }
` }} />
    </div>
  );
}