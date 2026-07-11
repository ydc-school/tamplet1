"use client";
import { useSchool } from "@/context/SchoolContext";
import { useState, useEffect } from "react";
import axios from "axios";



export const CollegetoperScoll = () => {
    const { schoolInfo, loading, setLoading } = useSchool();
    const [branchType, setBranchType] = useState([]);

    useEffect(() => {
        axios
            .get(`/api/client/branch/${schoolInfo.Branch_Id}`)
            .then((res) => {
                if (res.data.status === "success") {
                    setBranchType(res?.data?.data?.Branch_Type);
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    if (branchType !== "college") return null;
    return (
        <div className="w-screen h-76 flex flex-row items-center bg-white overflow-hidden relative">
            <h2 className="text-headline-lg font-bold text-black">Our Top Performers</h2>

            <div className="flex flex-row w-max animate-[scroll_20s_linear_infinite]">

                <div className="w-auto  bg-white rounded-2xl p-3 h-62 flex-shrink-0">
                    <img className="w-auto h-full object-contain" src="https://admin.yaduvanshigroup.edu.in/uploads/college-top/topper-1.png" alt="" />
                </div>
                <div className="w-auto  bg-white rounded-2xl p-3 h-62 flex-shrink-0">
                    <img className="w-auto h-full object-contain" src="https://admin.yaduvanshigroup.edu.in/uploads/college-top/topper-2.png" alt="" />
                </div>
                <div className="w-auto  bg-white rounded-2xl p-3 h-62 flex-shrink-0">
                    <img className="w-auto h-full object-contain" src="https://admin.yaduvanshigroup.edu.in/uploads/college-top/topper-3.png" alt="" />
                </div>
                <div className="w-auto  bg-white rounded-2xl p-3 h-62 flex-shrink-0">
                    <img className="w-auto h-full object-contain" src="https://admin.yaduvanshigroup.edu.in/uploads/college-top/topper-4.png" alt="" />
                </div>

                <div className="w-auto  bg-white rounded-2xl p-3 h-62 flex-shrink-0">
                    <img className="w-auto h-full object-contain" src="https://admin.yaduvanshigroup.edu.in/uploads/college-top/topper-5.png" alt="" />
                </div>
            </div>
        </div>
    )
}