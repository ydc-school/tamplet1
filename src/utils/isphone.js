"use client"; // Next.js App Router ke liye zaroori hai

import { useState, useEffect } from "react";

function useIsPhone() {
    // Shuruat me false rakhenge taaki server-side error na aaye
    const [isPhone, setIsPhone] = useState(false);

    useEffect(() => {
        // Yeh block sirf browser par chalega
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        // Pehli baar check karne ke liye
        setIsPhone(mediaQuery.matches);

        // Agar user screen choti-badi kare toh update karne ke liye
        const handler = (e) => setIsPhone(e.matches);

        // Listener add karein
        mediaQuery.addEventListener("change", handler);

        // Cleanup function (memory leak se bachne ke liye)
        return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    return isPhone;
}

export default useIsPhone;