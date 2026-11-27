"use client"; // Next.js App Router ke liye zaroori hai

import { useState, useEffect } from "react";

const PHONE_QUERY = "(max-width: 768px)";

function useIsPhone() {
    // Pehle render par hi sahi value mil jaye, isse component mount hote hi
    // API call do baar (false -> true flip) nahi hoti
    const [isPhone, setIsPhone] = useState(
        () =>
            typeof window !== "undefined" &&
            window.matchMedia(PHONE_QUERY).matches
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia(PHONE_QUERY);

        const handler = (e) => setIsPhone(e.matches);

        // Listener add karein
        mediaQuery.addEventListener("change", handler);

        // Cleanup function (memory leak se bachne ke liye)
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    return isPhone;
}

export default useIsPhone;