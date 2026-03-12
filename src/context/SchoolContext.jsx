"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// ─── Context ───────────────────────────────────────────────────────────────────
const SchoolContext = createContext(null);

// ─── Provider ──────────────────────────────────────────────────────────────────
export function SchoolProvider({ children }) {
    const [schoolInfo, setSchoolInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSchoolInfo = async () => {
            try {
                const response = await axios.get(
                    "/api/client/school-info"
                );
                if (
                    response.data.status === "success"
                    //  &&
                    // response.data.data.data.length > 0
                ) {
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

// ─── Custom Hook ───────────────────────────────────────────────────────────────
export function useSchool() {
    const context = useContext(SchoolContext);
    if (!context) {
        throw new Error("useSchool must be used inside <SchoolProvider>");
    }
    return context;
}
