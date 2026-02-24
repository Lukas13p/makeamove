"use client";

import {useState} from "react";
import {useSelection} from "../../context/SelectionContext";
import {useRouter} from "next/navigation";

export default function FilterPage() {
    const {objects, setEnvironment, setDuration, setExercises} = useSelection();
    const router = useRouter();

    const [localEnv, setLocalEnv] = useState<"homeoffice" | "office" | undefined>(
        objects.environment
    );
    const [localDuration, setLocalDuration] = useState<number | undefined>(
        objects.duration !== undefined ? objects.duration / 60 : undefined
    );


    const canProceed = localEnv !== undefined && localDuration !== undefined;

    const handleNext = () => {
        if (!canProceed) return;
        setEnvironment(localEnv!);
        setDuration(localDuration! * 60);
        setExercises([]);
        router.push("/results");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <div className="flex flex-col flex-1 w-full max-w-4xl space-y-6">

                {/* ===== Environment Kachel ===== */}
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">
                        Choose your environment
                    </h2>

                    <div className="flex gap-6">
                        {["homeoffice", "office"].map((env) => (
                            <div
                                key={env}
                                onClick={() => setLocalEnv(env as "office" | "homeoffice")}
                                className={`cursor-pointer px-8 py-6 rounded-xl font-semibold transition text-center
                ${
                                    localEnv === env
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {env === "office" ? "Office" : "Homeoffice"}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===== Duration Kachel ===== */}
                <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800">
                        Select duration
                    </h2>

                    <div className="w-80 flex flex-col items-center px-6">
                        <label className="mb-2 text-gray-800 font-medium">
                            {localDuration ?? 0} min
                        </label>
                        <input
                            type="range"
                            min={0}
                            max={20}
                            step={1}
                            value={localDuration ?? 0}
                            onChange={(e) => setLocalDuration(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* ===== Centered Action Buttons ===== */}
                <div className="flex flex-1 items-center justify-center min-h-[120px] px-6">
                    <div className="flex gap-6">
                        <button
                            onClick={() => router.replace("/")}
                            className="px-12 py-3 rounded-lg font-bold transition bg-gray-200 text-gray-700 hover:bg-gray-300"
                        >
                            Back
                        </button>

                        <button
                            onClick={handleNext}
                            disabled={!canProceed}
                            className={`px-12 py-3 rounded-lg font-bold transition
              ${
                                canProceed
                                    ? "bg-green-600 text-white hover:bg-green-700"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                        >
                            Create
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}
