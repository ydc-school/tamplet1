"use client";
import { useSchool } from "@/context/SchoolContext";

export default function AchievementsSection() {
    const { schoolInfo, loading } = useSchool();

    // Fallback data if API data is missing or still loading
    const achievements = [
        {
            id: 1,
            number: schoolInfo?.Experience || "26",
            label: "Unparalleled Years"
        },
        {
            id: 2,
            number: schoolInfo?.Students || "55000",
            label: "Pupils"
        },
        {
            id: 3,
            number: schoolInfo?.Teachers || "3000",
            label: "Gurus"
        },
        {
            id: 4,
            number: schoolInfo?.Awards || "255",
            label: "Awards Received"
        },
    ];

    if (loading) {
        return (
            <section className="w-full bg-green-800 py-16 text-white text-center">
                <p className="text-xl font-medium">Loading achievements...</p>
            </section>
        );
    }

    return (
        <section className="w-full bg-green-800 py-16 text-white">
            <div className="max-w-7xl mx-auto px-6">

                <h2 className="text-4xl font-bold text-center mb-12">
                    Our Achievements
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
                    {achievements.map((item) => (
                        <div key={item.id}>
                            <h3 className="text-5xl font-bold text-amber-400">
                                {item.number}
                            </h3>
                            <p className="mt-3 text-lg font-medium">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}