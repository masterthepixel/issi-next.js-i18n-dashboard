"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{ theme: Theme }>({ theme: "light" });

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>(() => {
        try {
            const fromStorage = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
            return (fromStorage as Theme) || "light";
        } catch {
            return "light";
        }
    });

    useEffect(() => {
        try {
            if (typeof window !== "undefined") {
                localStorage.setItem("theme", theme);
            }
        } catch { }
    }, [theme]);

    return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeContext;
