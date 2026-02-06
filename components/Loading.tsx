"use client";

import Lottie from "lottie-react";
import logoAnimation from "@/public/loaders/logo.json";

interface LoadingProps {
    size?: number;
    text?: string | null;
    fullScreen?: boolean;
}

export function Loading({ size = 200, text = "Loading...", fullScreen = false }: LoadingProps) {
    const isSmall = size < 40;

    const content = (
        <div className={`flex flex-col items-center justify-center ${isSmall ? "gap-0" : "gap-4"} ${fullScreen ? "" : isSmall ? "py-0" : "py-12"}`}>
            <div style={{ width: size, height: size }}>
                <Lottie
                    animationData={logoAnimation}
                    loop={true}
                />
            </div>
            {!isSmall && text && <p className="text-zinc-500 font-medium animate-pulse">{text}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-black backdrop-blur-sm">
                {content}
            </div>
        );
    }

    return content;
}
