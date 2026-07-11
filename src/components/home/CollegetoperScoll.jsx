"use client";

import { useSchool } from "@/context/SchoolContext";
import { useState, useEffect } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export const CollegetoperScoll = () => {
    const { schoolInfo } = useSchool();
    const [branchType, setBranchType] = useState("");

    useEffect(() => {
        if (!schoolInfo?.Branch_Id) return;

        axios
            .get(`/api/client/branch/${schoolInfo.Branch_Id}`)
            .then((res) => {
                if (res.data.status === "success") {
                    setBranchType(res.data.data.Branch_Type);
                }
            })
            .catch(() => {});
    }, [schoolInfo]);

    if (branchType !== "college") return null;

    const toppers = [
        "https://admin.yaduvanshigroup.edu.in/uploads/college-top/topper-1.png",
        "https://admin.yaduvanshigroup.edu.in/uploads/college-top/topper-2.png",
        "https://admin.yaduvanshigroup.edu.in/uploads/college-top/topper-3.png",
        "https://admin.yaduvanshigroup.edu.in/uploads/college-top/topper-4.png",
        "https://admin.yaduvanshigroup.edu.in/uploads/college-top/topper-5.png",
    ];

    return (
        <div className="w-full bg-white py-4">
            <Swiper
                modules={[Autoplay]}
                loop={true}
                speed={7000}
                autoplay={{
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                allowTouchMove={true}
                spaceBetween={20}
                slidesPerView={"auto"}
            >
                {toppers.map((src, index) => (
                    <SwiperSlide
                        key={index}
                        className="!w-auto"
                    >
                        <div className="h-64 rounded-2xl p-3 bg-white">
                            <img
                                src={src}
                                alt={`Topper ${index + 1}`}
                                className="h-full w-auto object-contain"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};