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
            name: "TAMANNA",
            rank: "1",
            class: "B.Sc. (PS)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/1.png"
        },
        {
            name: "ANKITA",
            rank: "1",
            class: "B.Sc. (ZH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/2.png"
        },
        {
            name: "ANTIM",
            rank: "1",
            class: "B.Sc. (ZH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/3.png"
        },
        {
            name: "KAJAL",
            rank: "1",
            class: "B.Sc. (ZH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/4.png"
        },
        {
            name: "SUPRIYA",
            rank: "1",
            class: "B.Sc. (ZH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/5.png"
        },
        {
            name: "SONAM",
            rank: "1",
            class: "B.Sc. (CH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/6.png"
        },
        {
            name: "PRIYA",
            rank: "1",
            class: "B.Sc. (ZH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/7.png"
        },
        {
            name: "HEENA",
            rank: "1",
            class: "B.Sc. (NM)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/8.png"
        },
        {
            name: "SHIWANI",
            rank: "1",
            class: "B.Sc. (CH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/9.png"
        },
        {
            name: "KIRAN",
            rank: "1",
            class: "B.A",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/10.png"
        },
        {
            name: "NISHA",
            rank: "1",
            class: "B.Sc. (ZH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/11.png"
        },
        {
            name: "MANJU",
            rank: "1",
            class: "B.Sc. (ZH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/12.png"
        },
        {
            name: "SAKSHI",
            rank: "1",
            class: "B.Sc. (NM)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/13.png"
        },
        {
            name: "AMBIKA",
            rank: "1",
            class: "B.Sc. (MH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/14.png"
        },
        {
            name: "PRIYA",
            rank: "1",
            class: "B.Sc. (ZH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/15.png"
        },
        {
            name: "ALKA",
            rank: "1",
            class: "B.Sc. (Med.)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/16.png"
        },
        {
            name: "POOJA",
            rank: "1",
            class: "B.Sc. (MH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/17.png"
        },
        {
            name: "ANMOL",
            rank: "1",
            class: "B.Sc. (ZH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/18.png"
        },
        {
            name: "LATIKA",
            rank: "1",
            class: "B.Sc. (Med.)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/19.png"
        },
        {
            name: "RINKI",
            rank: "1",
            class: "B.Sc. (MH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/20.png"
        },
        {
            name: "NIKITA",
            rank: "1",
            class: "B.Sc. (CH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/21.png"
        },
        {
            name: "ABHISHEK",
            rank: "1",
            class: "B.Sc. (CH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/22.png"
        },
        {
            name: "PRATHAM",
            rank: "1",
            class: "B.Sc. (MH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/23.png"
        },
        {
            name: "SANGEETA",
            rank: "1",
            class: "B.Sc. (PH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/24.png"
        },
        {
            name: "MAMTA",
            rank: "1",
            class: "B.Sc. (ZH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/25.png"
        },
        {
            name: "EKTA",
            rank: "1",
            class: "B.Sc. (MH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/26.png"
        },
        {
            name: "SUDHA",
            rank: "1",
            class: "B.COM.(Hons.)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/27.png"
        },
        {
            name: "TANISHA",
            rank: "1",
            class: "B.Sc. (MH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/28.png"
        },
        {
            name: "POOJA",
            rank: "1",
            class: "B.Sc. (ZH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/29.png"
        },
        {
            name: "MONIKA",
            rank: "1",
            class: "B.Sc. (ZH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/30.png"
        },
        {
            name: "ANNU",
            rank: "1",
            class: "B.Sc. (ZH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/31.png"
        },
        {
            name: "ALPA",
            rank: "1",
            class: "B.Sc. (NM)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/32.png"
        },
        {
            name: "MUSKNAN",
            rank: "1",
            class: "Β.Α.",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/33.png"
        },
        {
            name: "PRITI",
            rank: "1",
            class: "B.Sc. (MH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/34.png"
        },
        {
            name: "DIKSHIKA",
            rank: "1",
            class: "B.Sc. (CH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/35.png"
        },
        {
            name: "TINKESH",
            rank: "1",
            class: "B.Sc (NM)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/36.png"
        },
        {
            name: "SUDHA",
            rank: "1",
            class: "B.Com. (H)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/37.png"
        },
        {
            name: "SHEETAL",
            rank: "1",
            class: "B.Com.",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/38.png"
        },
        {
            name: "PAYAL",
            rank: "1",
            class: "B.Sc. (PH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/39.png"
        },
        {
            name: "NEHA",
            rank: "1",
            class: "B.Com.",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/40.png"
        },
        {
            name: "AARTI",
            rank: "1",
            class: "B.Com.",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/41.png"
        },
        {
            name: "MUSKAN YADAV",
            rank: "1",
            class: "B.COM.",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/42.png"
        },
        {
            name: "HARSHITA",
            rank: "1",
            class: "B.A",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/43.png"
        },
        {
            name: "SNEHA",
            rank: "1",
            class: "B.TECH",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/44.png"
        },
        {
            name: "PRIYA",
            rank: "1",
            class: "B.Sc (ZH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/45.png"
        },
        {
            name: "EKTA",
            rank: "1",
            class: "B.Sc (MH)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/46.png"
        },
        {
            name: "MANISHA",
            rank: "1",
            class: "B.COM. (Hons.)",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/47.png"
        },
        {
            name: "MAHAK",
            rank: "1",
            class: "B.A",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/48.png"
        },
        {
            name: "PREETI",
            rank: "1",
            class: "B.Com.",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/49.png"
        },
        {
            name: "NISHA",
            rank: "1",
            class: "B.Com.",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/50.png"
        },
        {
            name: "ASHA",
            rank: "1",
            class: "B.A",
            image: "https://admin.yaduvanshigroup.edu.in/uploads/college-top/51.png"
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


            <div class="min-h-screen flex justify-center items-center bg-[#bdd8f1]">
                <div class="gallery grid grid-cols-[repeat(2,45vw)] grid-rows-[repeat(5,18vh)] min-[40em]:grid-rows-[repeat(2,20vh)] min-[10em]:landscape:grid-cols-[repeat(5,18vw)] min-[10em]:landscape:grid-rows-[repeat(2,45vh)] min-[60em]:grid-cols-[repeat(10,8vw)] min-[60em]:grid-rows-[25vh] bg-[#82a6cb] rounded-[10px] p-[0.25em] cursor-zoom-in transition-all duration-300 ease-in-out [&_img]:first:rounded-t-[10px] [&_img]:last:rounded-b-[10px] min-[40em]:max-[59.99em]:[&_img]:first:rounded-tl-[10px] min-[40em]:max-[59.99em]:[&_img]:first:rounded-tr-none min-[40em]:max-[59.99em]:[&_img]:nth-child(5):rounded-tr-[10px] min-[40em]:max-[59.99em]:[&_img]:nth-child(6):rounded-br-[10px] min-[40em]:max-[59.99em]:[&_img]:last:rounded-bl-[10px] min-[40em]:max-[59.99em]:[&_img]:last:rounded-br-none min-[60em]:[&_img]:first:rounded-l-[10px] min-[60em]:[&_img]:first:rounded-r-none min-[60em]:[&_img]:last:rounded-r-[10px] min-[60em]:[&_img]:last:rounded-l-none">

                    <img src="https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max" alt="" class="object-cover w-full h-full left-0 top-0 transition-all duration-150 ease-in-out relative opacity-[0.67] sepia-[80%] hue-rotate-180 hover:opacity-100 hover:z-10 hover:sepia-0 hover:hue-rotate-0 hover:rounded-[5px] hover:w-[300%] hover:h-[300%] hover:left-[-100%] hover:top-[-100%] min-[40em]:hover:w-[250%] min-[40em]:hover:h-[500%] min-[40em]:hover:left-[-75%] min-[40em]:hover:top-[-200%] min-[10em]:landscape:hover:w-[250%] min-[10em]:landscape:hover:h-[200%] min-[40em]:portrait:hover:w-[300%] min-[40em]:portrait:hover:h-[300%] min-[40em]:portrait:hover:left-[-100%] min-[40em]:portrait:hover:top-[-100%] min-[60em]:hover:w-[350%] min-[60em]:hover:h-[150%] min-[60em]:hover:left-[-75%] min-[60em]:hover:top-[-25%] min-[60em]:landscape:hover:w-[300%] min-[60em]:landscape:hover:h-[300%] min-[60em]:landscape:hover:left-[-75%] min-[60em]:landscape:hover:top-[-100%] [&:hover~img]:min-[60em]:left-[175%] [&:hover~img]:min-[60em]:landscape:left-[100%]"/>

                        <img src="https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max" alt="" class="object-cover w-full h-full left-0 top-0 transition-all duration-150 ease-in-out relative opacity-[0.67] sepia-[80%] hue-rotate-180 hover:opacity-100 hover:z-10 hover:sepia-0 hover:hue-rotate-0 hover:rounded-[5px] hover:w-[300%] hover:h-[300%] hover:left-[-100%] hover:top-[-100%] min-[40em]:hover:w-[250%] min-[40em]:hover:h-[500%] min-[40em]:hover:left-[-75%] min-[40em]:hover:top-[-200%] min-[10em]:landscape:hover:w-[250%] min-[10em]:landscape:hover:h-[200%] min-[40em]:portrait:hover:w-[300%] min-[40em]:portrait:hover:h-[300%] min-[40em]:portrait:hover:left-[-100%] min-[40em]:portrait:hover:top-[-100%] min-[60em]:hover:w-[350%] min-[60em]:hover:h-[150%] min-[60em]:hover:left-[-75%] min-[60em]:hover:top-[-25%] min-[60em]:landscape:hover:w-[300%] min-[60em]:landscape:hover:h-[300%] min-[60em]:landscape:hover:left-[-75%] min-[60em]:landscape:hover:top-[-100%] [&:hover~img]:min-[60em]:left-[175%] [&:hover~img]:min-[60em]:landscape:left-[100%]"/>

                            <img src="https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max" alt="" class="object-cover w-full h-full left-0 top-0 transition-all duration-150 ease-in-out relative opacity-[0.67] sepia-[80%] hue-rotate-180 hover:opacity-100 hover:z-10 hover:sepia-0 hover:hue-rotate-0 hover:rounded-[5px] hover:w-[300%] hover:h-[300%] hover:left-[-100%] hover:top-[-100%] min-[40em]:hover:w-[250%] min-[40em]:hover:h-[500%] min-[40em]:hover:left-[-75%] min-[40em]:hover:top-[-200%] min-[10em]:landscape:hover:w-[250%] min-[10em]:landscape:hover:h-[200%] min-[40em]:portrait:hover:w-[300%] min-[40em]:portrait:hover:h-[300%] min-[40em]:portrait:hover:left-[-100%] min-[40em]:portrait:hover:top-[-100%] min-[60em]:hover:w-[350%] min-[60em]:hover:h-[150%] min-[60em]:hover:left-[-75%] min-[60em]:hover:top-[-25%] min-[60em]:landscape:hover:w-[300%] min-[60em]:landscape:hover:h-[300%] min-[60em]:landscape:hover:left-[-75%] min-[60em]:landscape:hover:top-[-100%] [&:hover~img]:min-[60em]:left-[175%] [&:hover~img]:min-[60em]:landscape:left-[100%]"/>

                                <img src="https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max" alt="" class="object-cover w-full h-full left-0 top-0 transition-all duration-150 ease-in-out relative opacity-[0.67] sepia-[80%] hue-rotate-180 hover:opacity-100 hover:z-10 hover:sepia-0 hover:hue-rotate-0 hover:rounded-[5px] hover:w-[300%] hover:h-[300%] hover:left-[-100%] hover:top-[-100%] min-[40em]:hover:w-[250%] min-[40em]:hover:h-[500%] min-[40em]:hover:left-[-75%] min-[40em]:hover:top-[-200%] min-[10em]:landscape:hover:w-[250%] min-[10em]:landscape:hover:h-[200%] min-[40em]:portrait:hover:w-[300%] min-[40em]:portrait:hover:h-[300%] min-[40em]:portrait:hover:left-[-100%] min-[40em]:portrait:hover:top-[-100%] min-[60em]:hover:w-[350%] min-[60em]:hover:h-[150%] min-[60em]:hover:left-[-75%] min-[60em]:hover:top-[-25%] min-[60em]:landscape:hover:w-[300%] min-[60em]:landscape:hover:h-[300%] min-[60em]:landscape:hover:left-[-75%] min-[60em]:landscape:hover:top-[-100%] [&:hover~img]:min-[60em]:left-[175%] [&:hover~img]:min-[60em]:landscape:left-[100%]"/>

                                    <img src="https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max" alt="" class="object-cover w-full h-full left-0 top-0 transition-all duration-150 ease-in-out relative opacity-[0.67] sepia-[80%] hue-rotate-180 hover:opacity-100 hover:z-10 hover:sepia-0 hover:hue-rotate-0 hover:rounded-[5px] hover:w-[300%] hover:h-[300%] hover:left-[-100%] hover:top-[-100%] min-[40em]:hover:w-[250%] min-[40em]:hover:h-[500%] min-[40em]:hover:left-[-75%] min-[40em]:hover:top-[-200%] min-[10em]:landscape:hover:w-[250%] min-[10em]:landscape:hover:h-[200%] min-[40em]:portrait:hover:w-[300%] min-[40em]:portrait:hover:h-[300%] min-[40em]:portrait:hover:left-[-100%] min-[40em]:portrait:hover:top-[-100%] min-[60em]:hover:w-[350%] min-[60em]:hover:h-[150%] min-[60em]:hover:left-[-75%] min-[60em]:hover:top-[-25%] min-[60em]:landscape:hover:w-[300%] min-[60em]:landscape:hover:h-[300%] min-[60em]:landscape:hover:left-[-75%] min-[60em]:landscape:hover:top-[-100%] [&:hover~img]:min-[60em]:left-[175%] [&:hover~img]:min-[60em]:landscape:left-[100%]"/>

                                        <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max" alt="" class="object-cover w-full h-full left-0 top-0 transition-all duration-150 ease-in-out relative opacity-[0.67] sepia-[80%] hue-rotate-180 hover:opacity-100 hover:z-10 hover:sepia-0 hover:hue-rotate-0 hover:rounded-[5px] hover:w-[300%] hover:h-[300%] hover:left-[-100%] hover:top-[-100%] min-[40em]:hover:w-[250%] min-[40em]:hover:h-[500%] min-[40em]:hover:left-[-75%] min-[40em]:hover:top-[-200%] min-[10em]:landscape:hover:w-[250%] min-[10em]:landscape:hover:h-[200%] min-[40em]:portrait:hover:w-[300%] min-[40em]:portrait:hover:h-[300%] min-[40em]:portrait:hover:left-[-100%] min-[40em]:portrait:hover:top-[-100%] min-[60em]:hover:w-[350%] min-[60em]:hover:h-[150%] min-[60em]:hover:left-[-75%] min-[60em]:hover:top-[-25%] min-[60em]:landscape:hover:w-[300%] min-[60em]:landscape:hover:h-[300%] min-[60em]:landscape:hover:left-[-75%] min-[60em]:landscape:hover:top-[-100%] [&:hover~img]:min-[60em]:left-[175%] [&:hover~img]:min-[60em]:landscape:left-[100%]"/>

                                            <img src="https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max" alt="" class="object-cover w-full h-full left-0 top-0 transition-all duration-150 ease-in-out relative opacity-[0.67] sepia-[80%] hue-rotate-180 hover:opacity-100 hover:z-10 hover:sepia-0 hover:hue-rotate-0 hover:rounded-[5px] hover:w-[300%] hover:h-[300%] hover:left-[-100%] hover:top-[-100%] min-[40em]:hover:w-[250%] min-[40em]:hover:h-[500%] min-[40em]:hover:left-[-75%] min-[40em]:hover:top-[-200%] min-[10em]:landscape:hover:w-[250%] min-[10em]:landscape:hover:h-[200%] min-[40em]:portrait:hover:w-[300%] min-[40em]:portrait:hover:h-[300%] min-[40em]:portrait:hover:left-[-100%] min-[40em]:portrait:hover:top-[-100%] min-[60em]:hover:w-[350%] min-[60em]:hover:h-[150%] min-[60em]:hover:left-[-75%] min-[60em]:hover:top-[-25%] min-[60em]:landscape:hover:w-[300%] min-[60em]:landscape:hover:h-[300%] min-[60em]:landscape:hover:left-[-75%] min-[60em]:landscape:hover:top-[-100%] [&:hover~img]:min-[60em]:left-[175%] [&:hover~img]:min-[60em]:landscape:left-[100%]"/>

                                                <img src="https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max" alt="" class="object-cover w-full h-full left-0 top-0 transition-all duration-150 ease-in-out relative opacity-[0.67] sepia-[80%] hue-rotate-180 hover:opacity-100 hover:z-10 hover:sepia-0 hover:hue-rotate-0 hover:rounded-[5px] hover:w-[300%] hover:h-[300%] hover:left-[-100%] hover:top-[-100%] min-[40em]:hover:w-[250%] min-[40em]:hover:h-[500%] min-[40em]:hover:left-[-75%] min-[40em]:hover:top-[-200%] min-[10em]:landscape:hover:w-[250%] min-[10em]:landscape:hover:h-[200%] min-[40em]:portrait:hover:w-[300%] min-[40em]:portrait:hover:h-[300%] min-[40em]:portrait:hover:left-[-100%] min-[40em]:portrait:hover:top-[-100%] min-[60em]:hover:w-[350%] min-[60em]:hover:h-[150%] min-[60em]:hover:left-[-75%] min-[60em]:hover:top-[-25%] min-[60em]:landscape:hover:w-[300%] min-[60em]:landscape:hover:h-[300%] min-[60em]:landscape:hover:left-[-75%] min-[60em]:landscape:hover:top-[-100%] [&:hover~img]:min-[60em]:left-[175%] [&:hover~img]:min-[60em]:landscape:left-[100%]"/>

                                                    <img src="https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max" alt="" class="object-cover w-full h-full left-0 top-0 transition-all duration-150 ease-in-out relative opacity-[0.67] sepia-[80%] hue-rotate-180 hover:opacity-100 hover:z-10 hover:sepia-0 hover:hue-rotate-0 hover:rounded-[5px] hover:w-[300%] hover:h-[300%] hover:left-[-100%] hover:top-[-100%] min-[40em]:hover:w-[250%] min-[40em]:hover:h-[500%] min-[40em]:hover:left-[-75%] min-[40em]:hover:top-[-200%] min-[10em]:landscape:hover:w-[250%] min-[10em]:landscape:hover:h-[200%] min-[40em]:portrait:hover:w-[300%] min-[40em]:portrait:hover:h-[300%] min-[40em]:portrait:hover:left-[-100%] min-[40em]:portrait:hover:top-[-100%] min-[60em]:hover:w-[350%] min-[60em]:hover:h-[150%] min-[60em]:hover:left-[-75%] min-[60em]:hover:top-[-25%] min-[60em]:landscape:hover:w-[300%] min-[60em]:landscape:hover:h-[300%] min-[60em]:landscape:hover:left-[-75%] min-[60em]:landscape:hover:top-[-100%] [&:hover~img]:min-[60em]:left-[175%] [&:hover~img]:min-[60em]:landscape:left-[100%]"/>

                                                        <img src="https://images.unsplash.com/photo-1504595403659-9088ce801e29?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max" alt="" class="object-cover w-full h-full left-0 top-0 transition-all duration-150 ease-in-out relative opacity-[0.67] sepia-[80%] hue-rotate-180 hover:opacity-100 hover:z-10 hover:sepia-0 hover:hue-rotate-0 hover:rounded-[5px] hover:w-[300%] hover:h-[300%] hover:left-[-100%] hover:top-[-100%] min-[40em]:hover:w-[250%] min-[40em]:hover:h-[500%] min-[40em]:hover:left-[-75%] min-[40em]:hover:top-[-200%] min-[10em]:landscape:hover:w-[250%] min-[10em]:landscape:hover:h-[200%] min-[40em]:portrait:hover:w-[300%] min-[40em]:portrait:hover:h-[300%] min-[40em]:portrait:hover:left-[-100%] min-[40em]:portrait:hover:top-[-100%] min-[60em]:hover:w-[350%] min-[60em]:hover:h-[150%] min-[60em]:hover:left-[-75%] min-[60em]:hover:top-[-25%] min-[60em]:landscape:hover:w-[300%] min-[60em]:landscape:hover:h-[300%] min-[60em]:landscape:hover:left-[-75%] min-[60em]:landscape:hover:top-[-100%] [&:hover~img]:min-[60em]:left-[175%] [&:hover~img]:min-[60em]:landscape:left-[100%]"/>
                                                        </div>
                                                    </div>

                                                </>
                                                );
}
