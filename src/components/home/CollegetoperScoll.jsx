"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

import { useSchool } from "@/context/SchoolContext";



export default function CollegetoperScoll() {
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
                "name": "TAMANNA",
                "rank": 1,
                "class": "B.Sc. (PS)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/1.png"
            },
            {
                "name": "ANKITA",
                "rank": 1,
                "class": "B.Sc. (ZH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/2.png"
            },
            {
                "name": "ANTIM",
                "rank": 1,
                "class": "B.Sc. (ZH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/3.png"
            },
            {
                "name": "KAJAL",
                "rank": 1,
                "class": "B.Sc. (ZH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/4.png"
            },
            {
                "name": "SUPRIYA",
                "rank": 1,
                "class": "B.Sc. (ZH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/5.png"
            },
            {
                "name": "SONAM",
                "rank": 1,
                "class": "B.Sc. (CH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/6.png"
            },
            {
                "name": "PRIYA",
                "rank": 1,
                "class": "B.Sc. (ZH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/7.png"
            },
            {
                "name": "HEENA",
                "rank": 1,
                "class": "B.Sc. (NM)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/heena.png"
            },
            {
                "name": "SHIWANI",
                "rank": 1,
                "class": "B.Sc. (CH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/9.png"
            },
            {
                "name": "KIRAN",
                "rank": 1,
                "class": "B.A",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/10.png"
            },
            {
                "name": "NISHA",
                "rank": 1,
                "class": "B.Sc. (ZH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/11.png"
            },
            {
                "name": "MANJU",
                "rank": 1,
                "class": "B.Sc. (ZH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/12.png"
            },
            {
                "name": "SAKSHI",
                "rank": 1,
                "class": "B.Sc. (NM)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/13.png"
            },
            {
                "name": "ALKA",
                "rank": 1,
                "class": "B.Sc. (Med.)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/14.png"
            },
            {
                "name": "POOJA",
                "rank": 1,
                "class": "B.Sc. (MH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/15.png"
            },
            {
                "name": "ANMOL",
                "rank": 1,
                "class": "B.Sc. (ZH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/16.png"
            },
            {
                "name": "RINKI",
                "rank": 1,
                "class": "B.Sc. (MH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/17.png"
            },
            {
                "name": "NIKITA",
                "rank": 1,
                "class": "B.Sc. (CH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/18.png"
            },
            {
                "name": "ABHISHEK",
                "rank": 1,
                "class": "B.Sc. (CH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/19.png"
            },
            {
                "name": "PRATHAM",
                "rank": 1,
                "class": "B.Sc. (MH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/20.png"
            },
            {
                "name": "SANGEETA",
                "rank": 1,
                "class": "B.Sc. (PH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/21.png"
            },
            {
                "name": "MAMTA",
                "rank": 1,
                "class": "B.Sc. (ZH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/22.png"
            },
            {
                "name": "AMBIKA",
                "rank": 1,
                "class": "B.Sc. (MH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/23.png"
            },
            {
                "name": "PRIYA",
                "rank": 1,
                "class": "B.Sc. (ZH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/24.png"
            },
            {
                "name": "LATIKA",
                "rank": 1,
                "class": "B.Sc. (Med.)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/25.png"
            },
            {
                "name": "EKTA",
                "rank": 1,
                "class": "B.Sc. (MH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/26.png"
            },
            {
                "name": "SUDHA",
                "rank": 1,
                "class": "B.Com. (Hons.)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/27.png"
            },
            {
                "name": "TANISHA",
                "rank": 1,
                "class": "B.Sc. (MH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/28.png"
            },
            {
                "name": "POOJA",
                "rank": 1,
                "class": "B.Sc. (ZH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/29.png"
            },
            {
                "name": "MONIKA",
                "rank": 1,
                "class": "B.Sc. (ZH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/30.png"
            },
            {
                "name": "ANNU",
                "rank": 1,
                "class": "B.Sc. (ZH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/31.png"
            },
            {
                "name": "ALPA",
                "rank": 1,
                "class": "B.Sc. (NM)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/32.png"
            },
            {
                "name": "MUSKNAN",
                "rank": 1,
                "class": "B.A",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/33.png"
            },
            {
                "name": "PRITI",
                "rank": 1,
                "class": "B.Sc. (MH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/34.png"
            },
            {
                "name": "DIKSHIKA",
                "rank": 1,
                "class": "B.Sc. (CH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/35.png"
            },
            {
                "name": "TINKESH",
                "rank": 1,
                "class": "B.Sc. (NM)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/36.png"
            },
            {
                "name": "SUDHA",
                "rank": 1,
                "class": "B.Com. (H)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/37.png"
            },
            {
                "name": "SHEETAL",
                "rank": 1,
                "class": "B.Com.",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/38.png"
            },
            {
                "name": "PAYAL",
                "rank": 1,
                "class": "B.Sc. (PH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/39.png"
            },
            {
                "name": "NEHA",
                "rank": 1,
                "class": "B.Com.",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/40.png"
            },
            {
                "name": "AARTI",
                "rank": 1,
                "class": "B.Com.",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/41.png"
            },
            {
                "name": "PREETI",
                "rank": 1,
                "class": "B.Com.",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/42.png"
            },
            {
                "name": "NISHA",
                "rank": 1,
                "class": "B.Com.",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/43.png"
            },
            {
                "name": "ASHA",
                "rank": 1,
                "class": "B.A",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/44.png"
            },
            {
                "name": "MUSKAN YADAV",
                "rank": 1,
                "class": "B.Com.",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/45.png"
            },
            {
                "name": "HARSHITA",
                "rank": 1,
                "class": "B.A",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/46.png"
            },
            {
                "name": "SNEHA",
                "rank": 1,
                "class": "B.TECH",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/47.png"
            },
            {
                "name": "PRIYA",
                "rank": 1,
                "class": "B.Sc. (ZH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/48.png"
            },
            {
                "name": "EKTA",
                "rank": 1,
                "class": "B.Sc. (MH)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/49.png"
            },
            {
                "name": "MANISHA",
                "rank": 1,
                "class": "B.COM. (Hons.)",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/50.png"
            },
            {
                "name": "MAHAK",
                "rank": 1,
                "class": "B.A",
                "image": "https://admin.yaduvanshigroup.edu.in/uploads/college-top/51.png"
            }
        
    ];



    if (branchType !== "college") return null;



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
                        {cardData?.map((card, index) => (
                            <div key={index} className="w-72  shadow-[0_20px_30px_-10px_rgba(38,57,77)]  mx-4 h-[20rem] relative group hover:scale-95 transition-all duration-300 flex-shrink-0">
                                <img src={`${card?.image}`} alt="card" className="w-full overflow-hidden h-[90%] object-contain" />
                                <div className="flex items-center justify-center px-4 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute bottom-0 backdrop-blur-[1px] left-0 w-full h-full bg-black/20">
                                    <p className="text-white text-lg font-semibold text-center">
                                        {card?.name}
                                    </p>
                                </div>

                                <div className="absolute bg-emerald-600 w-21 h-21 flex justify-center items-center bottom-0 right-0   rotate-45 hover:rotate-[405deg] transition-transform duration-500 ease-linear decoration-2  z-1">
                                    <h1 className="text-white text-5xl font-bold text-center  -rotate-45"><span className="text-xl">Rank</span>1</h1>
                                </div>

                                <h1 className="text-center text-2xl font-bold ">{`${card?.class}`}</h1>
                                <h1 className="text-center text-2xl font-bold py-1">{`${card?.name}`}</h1>


                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
            </div>

            <div className='gallery-body'>
                <div className="gallery max-w-8xl">
                    <img src="https://ydcmgh.yaduvanshigroup.edu.in/_next/image?url=%2Fuploads%2F1777005133806-1acfdabf6058a25e.jpg&w=1280&q=75" alt='' />
                    <img src='https://ydcmgh.yaduvanshigroup.edu.in/_next/image?url=%2Fuploads%2F1777004035235-1f1f6a290ded343d.jpg&w=1280&q=75' alt='' />
                    <img src='https://ydcmgh.yaduvanshigroup.edu.in/_next/image?url=%2Fuploads%2F1777002909368-54fdcbe1c3b9f8a0.jpg&w=1280&q=75' alt='' />
                    <img src='https://ydcmgh.yaduvanshigroup.edu.in/_next/image?url=%2Fuploads%2F1777004123635-7d19877a25514506.jpg&w=1280&q=75' alt='' />
                    <img src='https://ydcmgh.yaduvanshigroup.edu.in/_next/image?url=%2Fuploads%2F1777004809345-c694e73ffe7d2eda.jpg&w=1280&q=75' alt='' />
                    <img src='https://ydcmgh.yaduvanshigroup.edu.in/_next/image?url=%2Fuploads%2F1777004220370-4cac205454fe85a5.jpg&w=1280&q=75' alt='' />
                    <img src='http://ydcmgh.yaduvanshigroup.edu.in/_next/image?url=%2Fuploads%2F1777005305834-cd2b348bddc0c88c.jpg&w=1280&q=75' alt='' />
                    <img src='https://ydcmgh.yaduvanshigroup.edu.in/_next/image?url=%2Fuploads%2F1777005305834-248a201ac03080f5.jpg&w=1280&q=75' alt='' />
                    <img src='https://ydcmgh.yaduvanshigroup.edu.in/_next/image?url=%2Fuploads%2F1777002978819-1b8fc495396a1715.jpg&w=1280&q=75' alt='' />
                    <img src='https://ydcmgh.yaduvanshigroup.edu.in/_next/image?url=%2Fuploads%2F1777005305834-346b8fb6b2f4e6e6.jpg&w=1280&q=75' alt='' />
                </div>
            </div>

        </>
    );
}
