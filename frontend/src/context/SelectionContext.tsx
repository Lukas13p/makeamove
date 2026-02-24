"use client";

import {createContext, useContext, useState} from "react";

export type Exercise = {
    id: string | number;
    name: string;
    description: string;
    duration: number;
    category: string;
    office: boolean;
};

export type ObjectSelection = {
    manual: string[];
    detected: string[];
    environment?: "homeoffice" | "office";
    duration?: number;
};

type SelectionContextType = {
    objects: ObjectSelection;

    exercises: Exercise[];
    setExercises: (exercises: Exercise[]) => void;

    setManualObjects: (objs: string[]) => void;
    setDetectedObjects: (objs: string[]) => void;
    setEnvironment: (env: "homeoffice" | "office") => void;
    setDuration: (minutes: number) => void;

    showAttentionPopup: boolean;
    closeAttentionPopup: () => void;
};

const SelectionContext = createContext<SelectionContextType | null>(null);

export function SelectionProvider({children}: { children: React.ReactNode }) {
    const [manual, setManual] = useState<string[]>([]);
    const [detected, setDetected] = useState<string[]>([]);
    const [environment, setEnvironmentState] =
        useState<"homeoffice" | "office" | undefined>();
    const [duration, setDurationState] =
        useState<number | undefined>();
    const [exercises, setExercises] = useState<Exercise[]>([]);

    const [showAttentionPopup, setShowAttentionPopup] = useState(true);

    const closeAttentionPopup = () => {
        setShowAttentionPopup(false);
    };

    return (
        <SelectionContext.Provider
            value={{
                objects: {manual, detected, environment, duration},

                exercises,
                setExercises,

                setManualObjects: setManual,
                setDetectedObjects: setDetected,
                setEnvironment: setEnvironmentState,
                setDuration: setDurationState,

                showAttentionPopup,
                closeAttentionPopup,
            }}
        >
            {children}
        </SelectionContext.Provider>
    );
}

export function useSelection() {
    const ctx = useContext(SelectionContext);
    if (!ctx) {
        throw new Error("useSelection must be used inside SelectionProvider");
    }
    return ctx;
}