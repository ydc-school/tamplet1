"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Award, BookOpen, User, Calendar, Percent } from "lucide-react";

export default function StudentProfile() {
    const { id } = useParams();
    const router = useRouter();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                // Fetching all toppers and finding the one with matching ID
                // Ideally there should be a single student endpoint: /api/client/toper/${id}
                const response = await axios.get("/api/client/toper");
                if (response.data.status === "success") {
                    const foundStudent = response.data.data.data.find(s => s.Id.toString() === id);
                    setStudent(foundStudent);
                }
            } catch (error) {
                console.error("Error fetching student details:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchStudent();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-500 font-medium">Loading Profile...</p>
                </div>
            </div>
        );
    }

    if (!student) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center px-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Student Not Found</h2>
                    <p className="text-gray-600 mb-8 text-lg">The profile you are looking for does not exist or has been removed.</p>
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all"
                    >
                        <ArrowLeft className="w-5 h-5" /> Go Back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20">
            <div className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8">

                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="group mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Toppers
                </button>

                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 overflow-hidden border border-gray-100">
                    <div className="flex flex-col md:flex-row">

                        {/* Left: Image Section */}
                        <div className="w-full md:w-2/5 p-8 lg:p-12 bg-linear-to-br from-blue-50 to-indigo-50/50 flex flex-col items-center">
                            <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white mb-8 group">
                                <Image
                                    src={`/uploads/${student.Image}`}
                                    alt={student.Student_Name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 font-black px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 text-sm">
                                    <Award className="w-4 h-4" />
                                    RANK {student.Rank}
                                </div>
                            </div>

                            <div className="w-full space-y-4">
                                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                        <Percent className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Score</p>
                                        <p className="text-xl font-black text-gray-900">{student.Marks_Percentage}%</p>
                                    </div>
                                </div>
                                <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Academic Year</p>
                                        <p className="text-xl font-black text-gray-900">{student.Year}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Info Section */}
                        <div className="w-full md:w-3/5 p-8 lg:p-12 lg:pl-4">
                            <div className="mb-10">
                                <span className="inline-block py-1.5 px-4 rounded-full bg-blue-100 text-blue-800 text-sm font-bold tracking-wider mb-4 border border-blue-200">
                                    STUDENT PROFILE
                                </span>
                                <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-2 leading-tight">
                                    {student.Student_Name}
                                </h1>
                                <p className="text-xl text-blue-600 font-bold uppercase tracking-widest flex items-center gap-2">
                                    {student[" Class"] || student.Class}
                                    <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                                    {student.Gender}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Father's Name</h4>
                                        <p className="text-lg font-bold text-gray-900">{student.Father_name}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600">
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Batch</h4>
                                        <p className="text-lg font-bold text-gray-900">{student.Year}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                                    <span className="w-8 h-1 bg-blue-600 rounded-full"></span>
                                    About Achievement
                                </h3>
                                <p className="text-lg text-gray-600 leading-relaxed font-medium">
                                    {student.Description}
                                </p>
                                <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50 border-l-4 border-l-blue-600 italic text-blue-900 font-medium">
                                    "Success is not final, failure is not fatal: it is the courage to continue that counts."
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
