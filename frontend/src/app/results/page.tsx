"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSelection } from "../../context/SelectionContext";

export default function ResultsPage() {
    const router = useRouter();

    const {
        objects,
        exercises,
        setExercises,
        showAttentionPopup,
        closeAttentionPopup,
    } = useSelection();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (exercises.length > 0) {
            setLoading(false);
            return;
        }

        async function fetchExercises() {
            setLoading(true);
            try {
                const res = await axios.post(
                    "/api/filtered_exercises",
                    {
                        objects: [...objects.manual, ...objects.detected],
                        env: objects.environment,
                        duration: objects.duration,
                    }
                );
                setExercises(res.data);
            } finally {
                setLoading(false);
            }
        }

        fetchExercises();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (
            <p className="p-6 text-center text-gray-600">
                Loading exercises...
            </p>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col">

            {/* ===== ATTENTION POPUP (ONCE PER SESSION) ===== */}
            {showAttentionPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
                    <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6">
                        <button
                            onClick={closeAttentionPopup}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold"
                        >
                            ×
                        </button>

                        <h3 className="text-xl font-semibold mb-4 text-red-600 text-center">
                            ATTENTION!
                        </h3>

                        <p className="text-gray-700 text-center">
                            Please check at your own responsibility whether your equipment
                            is safe to use for the exercises we suggest!
                        </p>
                    </div>
                </div>
            )}

            {/* ===== HERO HEADER ===== */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-lg mb-10 w-full max-w-4xl mx-auto text-center">
                <h1
                    className="text-4xl md:text-6xl font-extrabold tracking-tight
                    bg-clip-text text-transparent bg-gradient-to-r
                    from-green-500 via-blue-500 to-purple-500"
                >
                    Workout Plan
                </h1>
                <p className="mt-4 text-gray-700 text-lg">
                    Scroll down and press „Next“ to start your personalized workout 💪
                </p>
            </div>

            {/* ===== EXERCISE LIST CARD ===== */}
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl mx-auto overflow-hidden flex-1">
                <div className="p-8 overflow-y-auto">
                    <ul className="space-y-6">
                        {exercises.map((ex, index) => (
                            <li
                                key={ex.id}
                                className="bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <h2 className="text-xl font-semibold text-gray-900">
                                        {index + 1}. {ex.name}
                                    </h2>

                                    <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                                        {ex.duration / 60} min
                                    </span>
                                </div>

                                <div className="flex gap-4 text-sm text-gray-500">
                                    <span>Category: {ex.category}</span>
                                    <span>
                                        Environment: {ex.office ? "Office" : "Homeoffice"}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* ===== ACTION BUTTONS (NO CARD) ===== */}
            <div className="flex items-center justify-center gap-6 mt-10">
                <button
                    onClick={() => router.replace("/filter")}
                    className="px-12 py-3 rounded-lg bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition"
                >
                    Back
                </button>

                <button
                    disabled={exercises.length === 0}
                    onClick={() => {
                        const firstExercise = exercises[0];
                        if (!firstExercise?.id) return;
                        router.push(`/exercise/${firstExercise.id}`);
                    }}
                    className={`px-12 py-3 rounded-lg font-bold transition
                        ${
                            exercises.length > 0
                                ? "bg-green-600 text-white hover:bg-green-700 shadow-lg"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}