"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import { useSchool } from "@/context/SchoolContext";



export default function SchoolToperScoll() {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [stopScroll, setStopScroll] = useState(false);


    const { schoolInfo } = useSchool();
    const [branchType, setBranchType] = useState("");
    if (!loading && achievements?.length === 0) return null;





    useEffect(() => {
        if (!schoolInfo?.Branch_Id) return;
        const formatYear = (y) => {
            if (!y) return "";
            const d = new Date(y);
            return isNaN(d) ? y : d.getFullYear();
        };

        axios
            .get(`/api/client/branch/${schoolInfo.Branch_Id}`)
            .then((res) => {
                if (res.data.status === "success") {
                    setBranchType(res.data.data.Branch_Type);
                }
            })
            .catch(() => { });
    }, [schoolInfo]);


const cardData = [
    {
        image: "https://admin.yaduvanshigroup.edu.in/uploads/Neet-poster/IMG-20260718-WA0003.jpg"
    },
    {
        image: "https://admin.yaduvanshigroup.edu.in/uploads/Neet-poster/IMG-20260718-WA0004.jpg"
    },
    {
        image: "https://admin.yaduvanshigroup.edu.in/uploads/Neet-poster/IMG-20260718-WA0005.jpg"
    },
    {
        image: "https://admin.yaduvanshigroup.edu.in/uploads/Neet-poster/IMG-20260718-WA0006.jpg"
    },
    {
        image: "https://admin.yaduvanshigroup.edu.in/uploads/Neet-poster/IMG-20260718-WA0007.jpg"
    },
    {
        image: "https://admin.yaduvanshigroup.edu.in/uploads/Neet-poster/IMG-20260718-WA0008.jpg"
    },
    {
        image: "https://admin.yaduvanshigroup.edu.in/uploads/Neet-poster/IMG-20260718-WA0009.jpg"
    },
    {
        image: "https://admin.yaduvanshigroup.edu.in/uploads/Neet-poster/IMG-20260718-WA0010.jpg"
    },
    {
        image: "https://admin.yaduvanshigroup.edu.in/uploads/Neet-poster/IMG-20260718-WA0012.jpg"
    }
];





    if (branchType !== "school") return null;

    return (
        <>
            <style>{`
        .marquee-inner {
            animation: marqueeScroll linear infinite;
        }

        @keyframes marqueeScroll {
            0% {
                transform: translateX(0%);
            }
            100% {
                transform: translateX(-50%);
            }
        }
      `}</style>

            <div className="overflow-hidden bg-academic-gold py-8 w-full relative max-w-6xl mx-auto" onMouseEnter={() => setStopScroll(true)} onMouseLeave={() => setStopScroll(false)}>
                <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
                <div className="marquee-inner flex w-fit" style={{ animationPlayState: stopScroll ? "paused" : "running", animationDuration: cardData.length * 2500 + "ms" }}>
                    <div className="flex">
                        <div className="flex">
                            {cardData?.map((card, index) => (
                                <div key={index} className="w-72 mx-4 h-[20rem] relative group hover:scale-95 flex-shrink-0 transition-transform duration-500 ease-in-out [transform-style:preserve-3d] hover:[transform:rotateY(360deg)] ">
                                    <img src={`${card?.image}`} alt="card" className="w-full h-full object-contain" />
                                    <div className="flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-[1px] left-0 w-full h-full bg-black/20">
                                        <p className="text-white text-lg font-semibold text-center">
                                            {card?.Name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>
        </>
    );
}
