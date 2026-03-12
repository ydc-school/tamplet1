"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

export default function StudentToppers() {
    const [toppers, setToppers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchToppers = async () => {
            try {
                const response = await axios.get("/api/client/toper");
                if (response.data.status === "success") {
                    setToppers(response.data.data.data);
                }
            } catch (error) {
                console.error("Error fetching toppers:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchToppers();
    }, []);

    if (loading) {
        return (
            <section className="w-full py-24 bg-gray-50 flex items-center justify-center">
                <div className="animate-pulse text-gray-400 font-medium text-xl">Loading Toppers...</div>
            </section>
        );
    }

    if (toppers.length === 0) {
        return null;
    }

    return (
        <section className="w-full relative bg-linear-to-br from-blue-50 via-white to-blue-50 py-24 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-200 rounded-full blur-3xl opacity-30"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold tracking-wider mb-4 border border-blue-200">
                        OUR PRIDE
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        Student Toppers
                    </h2>
                    <p className="text-lg text-gray-600">
                        Celebrating the academic excellence and hard work of our brightest minds who have set new benchmarks.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
                    {toppers.map((student) => (
                        <div
                            key={student.Id}
                            className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300 transform hover:-translate-y-2 overflow-hidden flex flex-col"
                        >
                            <div className="w-full h-64 sm:h-56 relative bg-gray-100">
                                <Image
                                    src={`/uploads/${student.Image}`}
                                    alt={student.Student_Name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-blue-900/20 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100"></div>

                                {/* Rank Badge */}
                                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-md z-10 flex items-center gap-1">
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 2a.75.75 0 01.67.42l2.35 4.77 5.26.76a.75.75 0 01.42 1.28l-3.81 3.71.9 5.24a.75.75 0 01-1.09.79L10 16.34l-4.7 2.47a.75.75 0 01-1.09-.79l.9-5.24-3.81-3.71a.75.75 0 01.42-1.28l5.26-.76 2.35-4.77A.75.75 0 0110 2z" clipRule="evenodd"></path></svg>
                                    Rank {student.Rank}
                                </div>

                                {/* Bottom Info overlay */}
                                <div className="absolute bottom-0 left-0 w-full p-5 flex justify-between items-end z-10">
                                    <div>
                                        <span className="block text-white/90 text-sm font-medium mb-1 drop-shadow-md">
                                            {student[" Class"] || student.Class || student.Year}
                                        </span>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-md rounded-lg px-2.5 py-1.5 border border-white/30 text-white font-bold text-sm shadow-sm">
                                        {student.Marks_Percentage}%
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 flex-grow flex flex-col bg-white">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {student.Student_Name}
                                </h3>
                                <div className="flex items-center text-sm text-gray-500 mb-5 border-b border-gray-100 pb-5">
                                    <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                    <span>{student.Father_name}</span>
                                </div>
                                <div className="mt-auto">
                                    <Link
                                        href={`/student/${student.Id}`}
                                        className="w-full flex items-center justify-center text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-600 hover:text-white py-2.5 rounded-xl transition-all duration-300"
                                    >
                                        View Profile
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}