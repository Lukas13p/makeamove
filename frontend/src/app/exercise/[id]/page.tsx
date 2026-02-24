"use client";

import axios from "axios";
import {useEffect, useState, useRef} from "react";
import {useParams, useRouter} from "next/navigation";
import {useSelection} from "../../../context/SelectionContext";

export default function ExercisePage() {
    const {id} = useParams<{ id: string }>();
    const router = useRouter();
    const {exercises} = useSelection();

    const [exercise, setExercise] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Video
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Timer
    const [showTimer, setShowTimer] = useState(false);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const timerRef = useRef<number | null>(null);

    // Last Popup
    const [showFinishPopup, setShowFinishPopup] = useState(false);

    // Fetch Exercise
    useEffect(() => {
        if (!id) return;

        setLoading(true);
        setError(null);

        axios
            .get(`/api/exercise/${id}`)
            .then(res => setExercise(res.data))
            .catch(() => setError("Failed to load exercise."))
            .finally(() => setLoading(false));
    }, [id]);

    // Video End Event → Overlay wieder anzeigen
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const onEnded = () => setIsPlaying(false);
        video.addEventListener("ended", onEnded);

        return () => video.removeEventListener("ended", onEnded);
    }, []);

    // Timer Interval
    useEffect(() => {
        if (!timerRunning || timeLeft <= 0) return;

        timerRef.current = window.setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current!);
                    setTimerRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timerRef.current!);
        };
    }, [timerRunning, timeLeft]);

    const handleVideoClick = () => {
        if (!videoRef.current) return;

        if (videoRef.current.paused || videoRef.current.ended) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleStartExercise = () => {
        if (!exercise?.duration) return;
        setTimeLeft(exercise.duration); // Sekunden
        setShowTimer(true);
        setTimerRunning(true);
    };

    const handlePauseResumeTimer = () => setTimerRunning(prev => !prev);
    const handleResetTimer = () => {
        if (!exercise?.duration) return;
        setTimeLeft(exercise.duration);
        setTimerRunning(false);
    };

    const currentIndex = exercises.findIndex(e => String(e.id) === id);
    const prevExercise = currentIndex > 0 ? exercises[currentIndex - 1] : null;
    const nextExercise =
        currentIndex >= 0 && currentIndex < exercises.length - 1
            ? exercises[currentIndex + 1]
            : null;

    if (loading) return <p className="p-6 text-center">Loading...</p>;
    if (error) return <p className="p-6 text-center text-red-600">{error}</p>;
    if (!exercise) return <p className="p-6 text-center">Exercise not found</p>;

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, "0");
        const s = (seconds % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">

            {/* ===== MAIN CARD ===== */}
            <div className="bg-white rounded-2xl shadow-lg max-w-xl w-full flex flex-col">

                {/* Content */}
                <div className="p-6 flex-1">
                    <button
                        onClick={() => router.push("/results")}
                        className="text-blue-600 hover:text-blue-800 mb-4 font-medium"
                    >
                        ← Back to workout plan
                    </button>

                    <h1 className="text-3xl font-bold mb-2 text-gray-800">
                        {exercise.name}
                    </h1>

                    <span
                        className="inline-block mb-4 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                    Category: {exercise.category}
                </span>

                    <p className="text-gray-700 leading-relaxed">
                        {exercise.description}
                    </p>

                    {/* Video */}
                    {exercise.video_url && (
                        <div className="relative mt-6 w-full overflow-hidden rounded-xl bg-black aspect-video">
                            <video
                                ref={videoRef}
                                src={exercise.video_url}
                                className="w-full h-full object-cover"
                                preload="metadata"
                                onClick={handleVideoClick}
                            />
                            {!isPlaying && (
                                <button
                                    onClick={handleVideoClick}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <svg
                                        className="w-20 h-20"
                                        fill="currentColor"
                                        viewBox="0 0 84 84"
                                    >
                                        <circle cx="42" cy="42" r="42" opacity={0.4}/>
                                        <polygon points="33,28 33,56 57,42" fill="white"/>
                                    </svg>
                                </button>
                            )}
                        </div>
                    )}

                    {/* Start Exercise Button */}
                    {!showTimer && (
                        <div className="mt-6 flex flex-col items-center">
                            <p className="mb-2 text-sm text-gray-500 text-center">
                                Start the timer to know when it’s time to move on to the next exercise
                            </p>

                            <button
                                onClick={handleStartExercise}
                                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition"
                            >
                                Start Timer
                            </button>
                        </div>
                    )}

                    {/* Timer */}
                    {showTimer && (
                        <div
                            className="mt-6 flex flex-col items-center justify-center bg-gray-100 p-4 rounded-lg space-y-3">
                        <span className="text-4xl font-bold text-gray-800">
                            {formatTime(timeLeft)}
                        </span>
                            <div className="flex gap-4">
                                <button
                                    onClick={handlePauseResumeTimer}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                                >
                                    {timerRunning ? "Pause" : "Resume"}
                                </button>
                                <button
                                    onClick={handleResetTimer}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ===== FINISH WORKOUT POPUP ===== */}
            {showFinishPopup && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 px-6">
                    <div className="bg-white rounded-xl shadow-xl p-6 max-w-md w-full text-center relative">
                        <button
                            onClick={() => setShowFinishPopup(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl font-bold"
                        >
                            ×
                        </button>

                        <h2 className="text-2xl font-bold mb-4 text-gray-900">
                            Congratulations!
                        </h2>

                        <p className="text-gray-700 mb-6">
                            You finished your Workout! 💪
                        </p>

                        <button
                            onClick={() => (window.location.href = "/")}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                        >
                            Finish
                        </button>
                    </div>
                </div>
            )}

            {/* ===== NAVIGATION (OUTSIDE CARD) ===== */}
            <div className="mt-8 flex gap-6">
                <button
                    disabled={!prevExercise}
                    onClick={() =>
                        prevExercise && router.push(`/exercise/${prevExercise.id}`)
                    }
                    className={`px-8 py-3 rounded-lg font-bold transition
                    ${
                        prevExercise
                            ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                >
                    Previous
                </button>

                <button
                    onClick={() => {
                        if (nextExercise) {
                            router.push(`/exercise/${nextExercise.id}`);
                        } else {
                            setShowFinishPopup(true);
                        }
                    }}
                    className="px-8 py-3 rounded-lg font-bold transition bg-green-600 text-white hover:bg-green-700"
                >
                    {nextExercise ? "Next" : "Finish Workout"}
                </button>
            </div>
        </div>
    );
}
