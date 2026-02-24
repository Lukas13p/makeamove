"use client";

import axios from "axios";
import {useState} from "react";
import {useSelection} from "../context/SelectionContext";
import {useRouter} from "next/navigation";

const AVAILABLE_OBJECTS = ["chair", "bottle", "backpack", "desk"];

export default function Home() {
    const {objects, setManualObjects, setDetectedObjects} = useSelection();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [noneSelected, setNoneSelected] = useState(false);

    function toggleObject(obj: string) {
        setManualObjects(
            objects.manual.includes(obj)
                ? objects.manual.filter((o) => o !== obj)
                : [...objects.manual, obj]
        );
    }

    async function upload(e: any) {
        const file = e.target.files[0];
        if (!file) return;

        const form = new FormData();
        form.append("file", file);

        setLoading(true);
        try {
            const res = await axios.post("/api/analyze", form);
            setDetectedObjects(res.data.objects);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            {/* Modernisierte Überschrift */}
            <div
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-lg mb-8 w-full max-w-3xl text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 drop-shadow-md">
                    Make a Move!
                </h1>
            </div>

            <div className="flex flex-col flex-1 w-full max-w-4xl space-y-6">

                {/* Objekte Auswahl Kachel */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
                        Choose available objects
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        {AVAILABLE_OBJECTS.map((obj) => (
                            <div
                                key={obj}
                                onClick={() => toggleObject(obj)}
                                className={`cursor-pointer p-6 rounded-xl text-center font-semibold transition
                ${
                                    objects.manual.includes(obj)
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            >
                                {obj}
                            </div>
                        ))}

                        {/* NONE Button */}
                        <div
                            onClick={() => setNoneSelected((prev) => !prev)}
                            className={`cursor-pointer p-6 rounded-xl text-center font-semibold transition col-span-2 mx-auto w-full max-w-xs
              ${
                                noneSelected
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                        >
                            none
                        </div>
                    </div>
                </div>

                {/* Divider AND/OR */}
                <div className="flex items-center">
                    <div className="flex-1 h-px bg-gray-300"/>
                    <span className="px-3 text-gray-500 font-semibold text-sm">AND / OR</span>
                    <div className="flex-1 h-px bg-gray-300"/>
                </div>

                {/* Upload Bereich Kachel */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8">
                    <h2 className="text-xl font-semibold mb-6 text-gray-800 text-center">
                        Scan area
                    </h2>

                    {/* Button zentrieren */}
                    <div className="flex justify-center mb-6">
                        <label
                            className="cursor-pointer bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition font-medium shadow-md inline-block"
                        >
                            {loading ? "Uploading..." : "Upload Image"}
                            <input type="file" onChange={upload} className="hidden"/>
                        </label>
                    </div>

                    <div
                        className="mt-6 w-full max-w-2xl bg-gray-50 rounded-xl p-5 shadow-sm mx-auto border border-gray-200">
                        <h3 className="text-sm font-semibold text-gray-600 mb-3 text-center uppercase tracking-wide">
                            Detected objects
                        </h3>

                        {loading ? (
                            <p className="text-center text-sm text-gray-500">
                                Scanning image…
                            </p>
                        ) : objects.detected.length > 0 ? (
                            <div className="flex flex-wrap gap-2 justify-center">
                                {objects.detected.map((o, i) => {
                                    const label = String(o ?? "Unknown");
                                    return (
                                        <span
                                            key={`${label}-${i}`}
                                            className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 shadow-sm"
                                        >
                    {label}
                  </span>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-center text-sm text-gray-400">
                                No objects detected
                            </p>
                        )}
                    </div>
                </div>

                {/* ACTION */}
                <div className="flex items-center justify-center min-h-[120px]">
                    <button
                        onClick={() => router.push("/filter")}
                        className="px-10 py-3 rounded-lg font-bold transition bg-green-600 text-white hover:bg-green-700 shadow-lg"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}