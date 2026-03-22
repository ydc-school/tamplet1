"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const SchoolContext = createContext(null);

export function SchoolProvider({ children }) {
    const [schoolInfo, setSchoolInfo] = useState(null);
    const [quickLink, setQuickLink] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // favicon change
    useEffect(() => {
        if (!schoolInfo?.Favicon_Url) return;

        let link = document.querySelector("link[rel='icon']");

        if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
        }

        const logoUrl = schoolInfo?.Favicon_Url
            ? `/uploads/${schoolInfo.Favicon_Url}`
            : "/logo/6.png";
        link.href = logoUrl;

    }, [schoolInfo]);

    

    useEffect(() => {
        const fetchSchoolInfo = async () => {
            try {
                const response = await axios.get("/api/client/school-info");

                if (response.data.status === "success") {
                    setSchoolInfo(response.data.data[0]);
                }
            } catch (err) {
                console.error("Error fetching school info:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchSchoolInfo();
    }, []);





    return (
        <SchoolContext.Provider value={{ schoolInfo, loading, error }}>
            {children}
        </SchoolContext.Provider>
    );
}

export function useSchool() {
    const context = useContext(SchoolContext);
    if (!context) {
        throw new Error("useSchool must be used inside <SchoolProvider>");
    }
    return context;
}