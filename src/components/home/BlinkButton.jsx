import React from 'react';
import Link from 'next/link'; // Next.js use kar rahe hain toh isko import zaroor karein

export const BlinkButton = () => {
  return (
    <>
      {/* 1. Global CSS Injector */}
      <style>{`
        @keyframes changeBg {
          0% { background-color: #DE3163; }
          50% { background-color: #2ed573; }
        }
        .custom-animate-btn {
          animation: changeBg 1s steps(1) infinite;
        }
      `}</style>

      {/* 2. Fixed Button Link Structure */}
      <Link 
        href="/careers-form" 
        target="_blank" 
        rel="noopener noreferrer"
        className="custom-animate-btn text-white right-0 top-4/5 fixed z-[2000] font-bold py-3 px-5 rounded-l-lg shadow-lg flex items-center justify-center transition-transform active:scale-95 hover:brightness-110"
      >
        <span className="material-symbols-outlined text-2xl mr-2">
          Recruitment
        </span>
       
      </Link>
    </>
  );
};