"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Keyboard, Mousewheel, FreeMode } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/free-mode';

import { MapPin, Eye } from 'lucide-react';

const GALLERY_DATA = [
  {
    id: 'gal-1',
    title: 'Minimalist Stone Atrium',
    category: 'Interior Design',
    location: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    description: 'Raw tactile limestone forms a monumental light shaft illuminating a single sand-etched gravel garden.'
  },
  {
    id: 'gal-2',
    title: 'Sienna Clay Corridor',
    category: 'Textural Study',
    location: 'Marrakesh, Morocco',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800',
    description: 'Sunbaked silt plaster hand-burnished to create deep earthen hues that shift dynamically under midday solar paths.'
  },
  {
    id: 'gal-3',
    title: 'Oxidized Steel Portal',
    category: 'Metal Works',
    location: 'Namib-Naukluft, Namibia',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800',
    description: 'A structural gateway designed to rust safely over decades, forming a protective velvet oxide skin.'
  },
  {
    id: 'gal-4',
    title: 'Brutalist Thermal Bath',
    category: 'Water Architecture',
    location: 'Vals, Switzerland',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800',
    description: 'Slabs of local quartzite stacked precisely to enclose geothermal steam chambers and cold plunge monoliths.'
  },
  {
    id: 'gal-5',
    title: 'Accreted Basalt Colonnade',
    category: 'Exterior Facade',
    location: 'Vík, Iceland',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=800',
    description: 'Geometric basalt columns framing the raw, windswept horizons of the subpolar Icelandic sea.'
  },
  {
    id: 'gal-6',
    title: 'Larch Wood Teahouse',
    category: 'Timber Joinery',
    location: 'Zermatt, Switzerland',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    description: 'Traditional wood joinery raised high on pilotis, creating a suspended space that breathes with alpine pine scent.'
  }
];

export default function GallerySwiper() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="w-full flex flex-col gap-6" id="gallery-swiper-section">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-natural-border pb-4 gap-4" id="gallery-header">
        <div className="flex flex-col gap-1">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-natural-sage">Visual Studies</p>
          <h2 className="text-3xl font-serif italic text-natural-dark">
            Smooth Gallery Scroll
          </h2>
        </div>
        <div className="flex items-center gap-4 text-xs text-natural-text/70" id="gallery-meta-controls">
          <span className="font-mono bg-natural-sage/10 text-natural-sage px-3 py-1 rounded-full uppercase text-[10px] tracking-wider">
            Continuous Free Scroll
          </span>
          <span className="font-mono text-natural-text/50 hidden sm:inline">
            SWIPE TO EXPLORE
          </span>
        </div>
      </div>

      <div className="relative w-full overflow-hidden py-4" id="gallery-swiper-wrapper-container">
        <Swiper
          id="gallery-smooth-swiper"
          modules={[Autoplay, Keyboard, Mousewheel, FreeMode]}
          loop={true}
          freeMode={true}
          speed={4500}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          keyboard={{ enabled: true }}
          mousewheel={{ forceToAxis: true }}
          grabCursor={true}
          centeredSlides={false}
          slidesPerView={1.2}
          spaceBetween={24}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 24,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 32,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 32,
            }
          }}
          className="w-full"
        >
          {GALLERY_DATA.map((item) => (
            <SwiperSlide key={item.id} className="opacity-100 transform-none">
              <div
                id={`gallery-slide-${item.id}`}
                onClick={() => setSelectedPhoto(item)}
                className="group flex flex-col gap-4 cursor-pointer"
              >
                <div className="relative aspect-3/2 w-full rounded-2xl overflow-hidden bg-[#F1ECE3] border border-natural-border shadow-sm transition-all duration-500 group-hover:shadow-md" id={`gallery-image-box-${item.id}`}>
                  <div className="absolute inset-0 bg-natural-dark/0 group-hover:bg-natural-dark/10 transition-all duration-300 z-10" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-natural-border text-natural-dark flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Eye className="w-4 h-4 text-natural-sage" />
                    </div>
                  </div>

                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-col gap-1.5 px-1" id={`gallery-text-box-${item.id}`}>
                  <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-natural-sage uppercase font-semibold">
                    <span>{item.category}</span>
                    <span className="text-natural-text/50">{item.location}</span>
                  </div>

                  <h3 className="text-base font-serif text-natural-dark group-hover:text-natural-sage transition-colors duration-300 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-natural-text/80 line-clamp-2 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {selectedPhoto && (
        <div
          id="gallery-modal-overlay"
          className="fixed inset-0 bg-[#2D2924]/75 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="bg-white border border-natural-border rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl flex flex-col relative"
            id="gallery-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              id="gallery-close-modal"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-natural-bg hover:bg-natural-border text-natural-text border border-natural-border flex items-center justify-center transition-all duration-300 cursor-pointer"
            >
              ✕
            </button>

            <div className="w-full aspect-16/10" id="gallery-modal-image-wrap">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-8 flex flex-col gap-4" id="gallery-modal-content">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-natural-sage uppercase tracking-widest font-semibold">
                  {selectedPhoto.category} • {selectedPhoto.location}
                </span>
                <h2 className="text-2xl font-serif italic text-natural-dark tracking-tight">
                  {selectedPhoto.title}
                </h2>
              </div>

              <p className="text-sm text-natural-text leading-relaxed font-sans font-light">
                {selectedPhoto.description}
              </p>

              <div className="flex items-center gap-2 text-xs font-mono text-natural-text/60 mt-2">
                <MapPin className="w-4 h-4 text-natural-sage" />
                <span>GPS Grounding Active • Landscape Context Study</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
