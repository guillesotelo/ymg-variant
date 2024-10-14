"use client";

import React, { createContext, useEffect, useState } from 'react'
import { AppContextType } from '../types'
import { verifyToken } from '../../services'
import { getCountryCode, getUser } from '../../helpers'

export const AppContext = createContext<AppContextType>({
    isMobile: false,
    isLoggedIn: null,
    lang: '',
    setLang: () => { },
    setIsLoggedIn: () => { },
    darkMode: false,
    setDarkMode: () => { },
})

type Props = {
    children?: React.ReactNode
}

export const AppProvider = ({ children }: Props) => {
    const [lang, setLang] = useState<string>('')
    const [isMobile, setIsMobile] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
    const [darkMode, setDarkMode] = useState(false)
    const [windowLoading, setWindowLoading] = useState(true)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowLoading(false)
            setLang(localStorage.getItem('lang') || 'en')
        }
        setDarkMode(JSON.parse(localStorage.getItem('preferredMode') || 'false'))
        setIsMobile(isMobileDevice())

        verifyUser()
        setDefaultLanguage()
        getPreferredScheme()

        const checkWidth = () => setIsMobile(window.innerWidth <= 768)

        window.addEventListener("resize", checkWidth)
        return () => window.removeEventListener("resize", checkWidth)
    }, [])

    useEffect(() => {
        const body = document.querySelector('body')
        if (body) {
            body.classList.remove('--dark')
            if (darkMode) body.classList.add('--dark')

            document.documentElement.setAttribute(
                "data-color-scheme",
                darkMode ? "dark" : "light"
            )
        }
    }, [darkMode])

    useEffect(() => {
        if (lang) localStorage.setItem('lang', lang)
    }, [lang])

    const isMobileDevice = () => {
        if (typeof window === 'undefined') return false // Server-side check

        const width = window.innerWidth
        const userAgent = window.navigator.userAgent.toLowerCase()

        const mobileKeywords = [
            'android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'
        ]

        const isMobile = mobileKeywords.some(keyword => userAgent.includes(keyword))
        const isSmallScreen = width <= 768

        return isMobile || isSmallScreen
    }

    const getPreferredScheme = () => {
        const savedMode = localStorage.getItem('preferredMode')
        const mode = JSON.parse(localStorage.getItem('preferredMode') || 'false')
        setDarkMode(savedMode ? mode : window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches)
    }

    const setDefaultLanguage = async () => {
        try {
            const language = localStorage.getItem('lang') || await getCountryCode()
            setLang(language)
            localStorage.setItem('lang', language)
        } catch (error) {
            console.error(error)
        }
    }

    const verifyUser = async () => {
        try {
            const verified = await verifyToken(getUser().token)
            if (verified && verified.token) {
                setIsLoggedIn(true)
            } else setIsLoggedIn(false)
        } catch (error) {
            setIsLoggedIn(false)
        }
    }

    const contextValue = React.useMemo(() => ({
        isMobile,
        setIsLoggedIn,
        isLoggedIn,
        darkMode,
        setDarkMode,
        lang,
        setLang,
    }), [
        isMobile,
        setIsLoggedIn,
        isLoggedIn,
        darkMode,
        setDarkMode,
        lang,
        setLang,
    ])


    return windowLoading ? null : <AppContext.Provider value={contextValue}>
        {children}
    </AppContext.Provider>
}