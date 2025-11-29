'use client'

import { createContext, useEffect, useState } from "react";

export const SettingsContext = createContext()

export function SettingsProvider({ children }) {
    const [workMinutes, setWorkMinutes] = useState(5)
    const [breakMinutes, setBreakMinutes] = useState(15)
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const savedWorkMinutes = localStorage.getItem("workMinutes")
        const savedBreakMinutes = localStorage.getItem("breakMinutes")
        
        if (savedWorkMinutes) setWorkMinutes(Number(savedWorkMinutes))
        if (savedBreakMinutes) setBreakMinutes(Number(savedBreakMinutes))
    }, [])

    useEffect(() => {
        localStorage.setItem("workMinutes", workMinutes)
    }, [workMinutes])

    useEffect(() => {
        localStorage.setItem("breakMinutes", breakMinutes)
    }, [breakMinutes])

    return (
        <SettingsContext.Provider value={{
            workMinutes,
            breakMinutes,
            theme,
            setWorkMinutes,
            setBreakMinutes,
            setTheme,
        }}>
            {children}
        </SettingsContext.Provider>
    )
}

