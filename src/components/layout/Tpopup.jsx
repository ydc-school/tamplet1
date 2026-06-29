"use client";
import Link from 'next/link';
import React, { useState } from 'react';

export const Tpopup = () => {
    // Popup ko dikhane ya chhupane ke liye state
    const [isOpen, setIsOpen] = useState(true);

    // Agar isOpen false hai, to kuch bhi render nahi hoga
    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 z-[1000] w-screen h-screen flex justify-center items-center bg-black/70 backdrop-blur-sm p-4'>

            {/* Main Popup Container */}
            <div className='relative max-h-[85vh] w-full max-w-4xl  rounded-xl overflow-hidden shadow-2xl flex flex-col items-center justify-center'>

                {/* Close Button (X) */}
                <button
                    onClick={() => setIsOpen(false)}
                    className='absolute top-3 right-3 z-[1010] bg-white/80 hover:bg-white text-black font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-95'
                    aria-label="Close popup"
                >
                    ✕
                </button>

                {/* Responsive Image Container */}
                <Link href="/careers-form">
                    <div className='w-full h-full flex items-center justify-center p-2'>
                        <img
                            src="./poster/pop/1.jpeg"
                            alt="Poster"
                            className='max-h-[80vh] w-full object-contain rounded-lg'
                        />
                    </div>
                </Link>

            </div>
        </div>
    );
};