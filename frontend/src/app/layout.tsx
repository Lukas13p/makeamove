"use client";

import {SelectionProvider} from "../context/SelectionContext";
import "../styles/globals.css";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState, useRef} from "react";

export default function RootLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const isWelcomePage = pathname === "/";
    const [showInactivityPopup, setShowInactivityPopup] = useState(false);

    const handledReloadRef = useRef(false);

    /**
     * ===== REDIRECT ONLY ON REAL BROWSER REFRESH (ONCE) =====
     */
    useEffect(() => {
        if (handledReloadRef.current) return;
        handledReloadRef.current = true;

        const navEntries = performance.getEntriesByType(
            "navigation"
        ) as PerformanceNavigationTiming[];

        const isReload =
            navEntries.length > 0 && navEntries[0].type === "reload";

        if (isReload && window.location.pathname !== "/") {
            router.replace("/");
        }
    }, [router]);

    /**
     * ===== INACTIVITY TIMER (WELCOME PAGE ONLY) =====
     */
    useEffect(() => {
        if (!isWelcomePage) return;

        let timer: ReturnType<typeof setTimeout>;

        const startTimer = () => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                setShowInactivityPopup(true);
            }, 0.33 * 60 * 1000); // 30 Sekunden
        };

        window.addEventListener("click", startTimer);
        startTimer();

        return () => {
            clearTimeout(timer);
            window.removeEventListener("click", startTimer);
        };
    }, [isWelcomePage]);

    return (
        <html lang="en">
        <body>
        <SelectionProvider>
            {children}

            {isWelcomePage && showInactivityPopup && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-6">
                    <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full text-center relative">
                        <button
                            onClick={() => setShowInactivityPopup(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold"
                        >
                            ×
                        </button>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900">
                            Time to move 💪
                        </h2>

                        <p className="text-gray-700 mb-6">
                            You’ve been inactive for a while. Start your next workout now.
                        </p>

                        <button
                            onClick={() => setShowInactivityPopup(false)}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                        >
                            Let’s go
                        </button>
                    </div>
                </div>
            )}
        </SelectionProvider>
        </body>
        </html>
    );
}
